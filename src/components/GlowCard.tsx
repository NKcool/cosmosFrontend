import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

const GlowCard = ({ children, className }: GlowCardProps) => {
  return (
    <div className={cn("glow-card rounded-xl p-6", className)}>
      {children}
    </div>
  );
};

export default GlowCard;
export { GlowCard };