import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import GeoGuide from "@/pages/geo-guide";
import WebsiteAnalysis from "@/pages/website-analysis";
import Pricing from "@/pages/pricing";
import Features from "@/pages/features";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Help from "@/pages/help";
import NotFound from "@/pages/not-found";
import ScrollManager from "@/components/ScrollManager";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/geo-guide" component={GeoGuide} />
      <Route path="/website-analysis" component={WebsiteAnalysis} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/features" component={Features} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/help" component={Help} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <ScrollManager />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
