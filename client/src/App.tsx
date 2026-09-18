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
import AiCompetitorBenchmarking from "@/pages/features/ai-competitor-benchmarking";
import PromptIntelligence from "@/pages/features/prompt-intelligence";
import AiRecommendations from "@/pages/features/ai-recommendations";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Help from "@/pages/help";
import Changelog from "@/pages/changelog";
import ChangelogEntry from "@/pages/changelog-entry";
import Alternatives from "@/pages/alternatives";
import AlternativesEntry from "@/pages/alternatives-entry";
import NotFound from "@/pages/not-found";
import Team from "@/pages/team";
import Recognition from "@/pages/recognition";
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
      <Route path="/features/ai-competitor-benchmarking" component={AiCompetitorBenchmarking} />
      <Route path="/features/prompt-intelligence" component={PromptIntelligence} />
      <Route path="/features/ai-recommendations" component={AiRecommendations} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/help" component={Help} />
      <Route path="/changelog" component={Changelog} />
      <Route path="/changelog/:slug" component={ChangelogEntry} />
      <Route path="/alternatives" component={Alternatives} />
      <Route path="/alternatives/:slug" component={AlternativesEntry} />
      <Route path="/team" component={Team} />
      <Route path="/recognition" component={Recognition} />
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
