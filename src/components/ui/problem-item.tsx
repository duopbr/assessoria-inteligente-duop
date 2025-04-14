
import { cn } from "@/lib/utils";

interface ProblemItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ProblemItem({ icon, children, className }: ProblemItemProps) {
  return (
    <div className={cn("problem-item", className)}>
      <span className="problem-icon">{icon}</span>
      <p className="text-lg">{children}</p>
    </div>
  );
}
