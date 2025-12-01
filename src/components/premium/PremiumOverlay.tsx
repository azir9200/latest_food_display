"use client";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface PremiumLockOverlayProps {
  onUpgrade?: () => void;
}

const PremiumLockOverlay = ({ onUpgrade }: PremiumLockOverlayProps) => {

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-md bg-background/60">
      <div className="bg-card/95 backdrop-blur-sm border-2 border-primary/20 rounded-3xl p-8 shadow-glow max-w-sm mx-4 animate-scale-in">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl rounded-full animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-primary to-accent p-6 rounded-full shadow-strong">
              <Lock className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-display font-bold text-foreground">
              Premium Content
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              This exclusive food discovery is available only for premium
              members. Upgrade now to unlock premium content and features!
            </p>
          </div>

          <Button
            onClick={onUpgrade}
            className="w-full cursor-pointer bg-primary hover:shadow-glow transition-all duration-300 font-bold text-lg py-6 rounded-full hover-lift"
          >
            Upgrade to Premium
          </Button>

          <p className="text-xs text-muted-foreground">
            Get unlimited access to premium food spots and exclusive reviews
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumLockOverlay;
