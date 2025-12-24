import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Rocket, TrendingUp, Star, Zap } from "lucide-react";

interface ExitIntentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onTakeQuiz: () => void;
}

export default function ExitIntentPopup({ isOpen, onClose, onTakeQuiz }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 100);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-white border-0 shadow-2xl rounded-3xl overflow-hidden p-0">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-slate-400 hover:text-slate-600 transition-colors duration-200"
          data-testid="button-close-exit-intent"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className={`relative transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Header with Gradient Background */}
          <div className="bg-gradient-to-br from-blue-700 via-violet-700 to-purple-700 px-6 py-8 text-white text-center relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-4 left-4 w-8 h-8 border border-white/30 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border border-white/30 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-white/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-center mb-3">
                <Rocket className="w-8 h-8 mr-2" />
                <span className="text-xl font-bold">Wait!</span>
              </div>
              <h2 className="text-xl font-bold mb-2 leading-tight">
                See What AI Says About Your Brand
              </h2>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-6 py-6">
            <div className="text-center mb-6">
              <p className="text-slate-700 mb-4 leading-relaxed">
                Get a <span className="font-semibold text-blue-600">free AI visibility report</span> and discover how AI models describe your company.
              </p>

              {/* Benefits */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-slate-600">
                  <Star className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
                  <span>See your AI visibility score</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>Understand which sources shape AI answers</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Zap className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                  <span>Get actionable recommendations</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <a
                href="https://dashboard.georankers.co/register"
                className="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white font-semibold py-3 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg"
                data-testid="button-try-free-exit-intent"
              >
                <Rocket className="w-4 h-4 mr-2" />
                Try for Free
              </a>
              
              <button
                onClick={onClose}
                className="w-full text-slate-500 hover:text-slate-700 py-2 text-sm transition-colors duration-200"
                data-testid="button-no-thanks-exit-intent"
              >
                No thanks, I'll continue browsing
              </button>
            </div>
          </div>

          {/* Trust Indicator */}
          <div className="px-6 pb-4">
            <div className="text-center">
              <p className="text-xs text-slate-400">
                No credit card required
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
