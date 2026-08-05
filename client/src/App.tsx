import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import GeoGuide from "@/pages/geo-guide";
import AiContentGuide from "@/pages/ai-content-guide";
import GeoGlossary from "@/pages/geo-glossary";
import Pricing from "@/pages/pricing";
import Features from "@/pages/features";
import AiModelsTracked from "@/pages/features/ai-models-tracked";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Help from "@/pages/help";
import NotFound from "@/pages/not-found";
import Team from "@/pages/team";
import ScrollManager from "@/components/ScrollManager";
import BrandVisibilityPage from "@/pages/free-geo-tools/brand-visibility";
import GeoAuditPage from "@/pages/free-geo-tools/geo-audit";
import QueryOpportunityPage from "@/pages/free-geo-tools/visibility-score";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/geo-guide" component={GeoGuide} />
      <Route path="/ai-content-guide" component={AiContentGuide} />
      <Route path="/geo-glossary" component={GeoGlossary} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/features" component={Features} />
      <Route path="/features/ai-models-tracked" component={AiModelsTracked} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/help" component={Help} />
      <Route path="/team" component={Team} />
      <Route path="/free-geo-tools/brand-visibility" component={BrandVisibilityPage} />
      <Route path="/free-geo-tools/geo-audit" component={GeoAuditPage} />
      <Route path="/free-geo-tools/visibility-score" component={QueryOpportunityPage} />
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
