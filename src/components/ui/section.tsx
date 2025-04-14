
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

export function Section({ 
  id, 
  className, 
  children, 
  as: Component = "section" 
}: SectionProps) {
  return (
    <Component
      id={id}
      className={cn("section-container", className)}
    >
      {children}
    </Component>
  );
}

export function SectionTitle({ 
  children, 
  className, 
  emoji 
}: { 
  children: React.ReactNode; 
  className?: string; 
  emoji?: string;
}) {
  return (
    <h2 className={cn("section-title", className)}>
      {emoji && <span className="heading-emoji">{emoji}</span>}
      {children}
    </h2>
  );
}
