import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const founders = [
  {
    initials: "AB",
    name: "Name Placeholder",
    role: "Co-founder & CEO",
    bio: "A short bio about this team member will go here. Their background, expertise, and what they bring to GeoRankers.",
    gradient: "from-blue-500 to-violet-600",
  },
];

const teamMembers = [
  {
    initials: "CD",
    name: "Name Placeholder",
    role: "Head of Product",
    bio: "A short bio about this team member will go here. Their background, expertise, and what they bring to GeoRankers.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    initials: "EF",
    name: "Name Placeholder",
    role: "Head of Engineering",
    bio: "A short bio about this team member will go here. Their background, expertise, and what they bring to GeoRankers.",
    gradient: "from-violet-500 to-pink-500",
  },
  {
    initials: "GH",
    name: "Name Placeholder",
    role: "Head of Growth",
    bio: "A short bio about this team member will go here. Their background, expertise, and what they bring to GeoRankers.",
    gradient: "from-emerald-500 to-cyan-500",
  },
];

function MemberCard({ m }: { m: typeof founders[0] }) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${m.gradient} flex items-center justify-center mb-5 shadow-lg`}>
        <span className="text-white text-2xl font-black">{m.initials}</span>
      </div>
      <h3 className="text-lg font-bold text-slate-900 leading-tight">{m.name}</h3>
      <p className="text-sm font-semibold text-blue-500 mt-1 mb-4">{m.role}</p>
      <p className="text-sm text-slate-500 leading-relaxed flex-1">{m.bio}</p>
    </div>
  );
}

export default function Team() {
  useSEO({
    title: "Team — GeoRankers",
    description: "Meet the team behind GeoRankers, the AI Search Visibility Intelligence Platform for B2B SaaS teams.",
  });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-black uppercase tracking-widest text-blue-500 mb-4">The People</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900 mb-5">
          Meet the Team
        </h1>
        <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
          We're a small, focused team obsessed with helping B2B SaaS brands win in the age of AI search.
        </p>
      </section>

      {/* Team grid */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Row 1: Founders */}
          <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {founders.map((m) => (
              <MemberCard key={m.initials} m={m} />
            ))}
          </div>

          {/* Row 2: Team */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((m) => (
              <MemberCard key={m.initials} m={m} />
            ))}
          </div>
        </div>
      </section>

      {/* About section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-black uppercase tracking-widest text-blue-500 mb-4">Our Story</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-6">
            Built by founders who felt the gap
          </h2>
          <p className="text-slate-500 leading-relaxed text-lg mb-4">
            Placeholder text about the company's founding story, the problem the team experienced first-hand, and why they decided to build GeoRankers. This section will be updated with the real story soon.
          </p>
          <p className="text-slate-500 leading-relaxed text-lg">
            We're backed by a belief that AI search is reshaping how buyers discover software — and that every B2B SaaS team deserves clarity on where they stand and what to do about it.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
