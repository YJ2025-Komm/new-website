import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import GeoGuide from "@/pages/geo-guide";
import Pricing from "@/pages/pricing";
import Features from "@/pages/features";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Help from "@/pages/help";
import Team from "@/pages/team";
import NotFound from "@/pages/not-found";
import ScrollManager from "@/components/ScrollManager";
// TODO: re-add free-geo-tools imports after running git pull in Shell
// import BrandVisibilityPage from "@/pages/free-geo-tools/brand-visibility";
// import GeoAuditPage from "@/pages/free-geo-tools/geo-audit";
// import QueryOpportunityPage from "@/pages/free-geo-tools/visibility-score";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/geo-guide" component={GeoGuide} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/features" component={Features} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/help" component={Help} />
      <Route path="/team" component={Team} />
      {/* TODO: re-add after git pull brings the files in */}
      {/* <Route path="/free-geo-tools/brand-visibility" component={BrandVisibilityPage} /> */}
      {/* <Route path="/free-geo-tools/geo-audit" component={GeoAuditPage} /> */}
      {/* <Route path="/free-geo-tools/visibility-score" component={QueryOpportunityPage} /> */}
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
