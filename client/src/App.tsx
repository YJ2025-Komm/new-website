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
