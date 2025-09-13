import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StarButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

const StarButton = ({ 
  children, 
  className, 
  onClick, 
  variant = "primary" 
}: StarButtonProps) => {
  return (
    <button 
      className={cn("star-button", className)}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default StarButton;