import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Copy, Users, Calendar, Clock, Mail, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface WaitlistEntry {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
}

export default function AdminPage() {
  const { toast } = useToast();
  
  const { data: entries = [], isLoading, error } = useQuery<WaitlistEntry[]>({
    queryKey: ['/api/admin/waitlist'],
  });

  const { data: mailchimpInfo } = useQuery({
    queryKey: ['/api/admin/mailchimp-info'],
  });

  const syncMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/admin/sync-mailchimp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Sync failed');
      return response.json();
    },
    onSuccess: (data: any) => {
      toast({
        title: "Mailchimp Sync Complete",
        description: `${data.success} subscribers synced, ${data.errors} errors`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/mailchimp-info'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Sync Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const exportCSV = () => {
    if (!entries.length) return;
    
    const csv = 'Date,Full Name,Email,ID\n' + 
      entries.map(e => `"${new Date(e.createdAt).toLocaleString()}","${e.fullName}","${e.email}","${e.id}"`).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'georankers-waitlist.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Export Complete",
      description: "Waitlist data exported to CSV file",
    });
  };

  const copyAllEmails = () => {
    if (!entries.length) return;
    
    const emails = entries.map(e => e.email).join(', ');
    navigator.clipboard.writeText(emails).then(() => {
      toast({
        title: "Emails Copied",
        description: `${entries.length} email addresses copied to clipboard`,
      });
    });
  };

  const getStats = () => {
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    const week = 7 * day;
    
    return {
      total: entries.length,
      lastDay: entries.filter(e => new Date(e.createdAt).getTime() > now - day).length,
      lastWeek: entries.filter(e => new Date(e.createdAt).getTime() > now - week).length
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Loading...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-red-600 mb-8">Error loading data</h1>
        </div>
      </div>
    );
  }

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">GeoRankers Waitlist Dashboard</h1>
          <p className="text-slate-600">Manage and export your waitlist data</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="glass">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-500 mr-4" />
                <div>
                  <div className="text-3xl font-bold text-slate-900">{stats.total}</div>
                  <div className="text-slate-600">Total Signups</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-green-500 mr-4" />
                <div>
                  <div className="text-3xl font-bold text-slate-900">{stats.lastDay}</div>
                  <div className="text-slate-600">Last 24 Hours</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-purple-500 mr-4" />
                <div>
                  <div className="text-3xl font-bold text-slate-900">{stats.lastWeek}</div>
                  <div className="text-slate-600">Last 7 Days</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Mail className="w-8 h-8 text-orange-500 mr-4" />
                <div>
                  <div className="text-3xl font-bold text-slate-900">
                    {(mailchimpInfo as any)?.member_count || '---'}
                  </div>
                  <div className="text-slate-600">Mailchimp Subscribers</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Button onClick={exportCSV} className="bg-blue-500 hover:bg-blue-600">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={copyAllEmails} variant="outline">
            <Copy className="w-4 h-4 mr-2" />
            Copy All Emails
          </Button>
          <Button 
            onClick={() => syncMutation.mutate()} 
            disabled={syncMutation.isPending}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            {syncMutation.isPending ? 'Syncing...' : 'Sync to Mailchimp'}
          </Button>
        </div>

        {/* Data Table */}
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Date Joined</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Full Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">ID</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, index) => (
                    <tr key={entry.id} className={index % 2 === 0 ? "bg-slate-50/50" : ""}>
                      <td className="py-3 px-4 text-slate-700">
                        {new Date(entry.createdAt).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-slate-900 font-medium">
                        {entry.fullName}
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        {entry.email}
                      </td>
                      <td className="py-3 px-4 text-slate-500 font-mono text-sm">
                        {entry.id.substring(0, 8)}...
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {entries.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  No waitlist entries yet. Start promoting your landing page!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}