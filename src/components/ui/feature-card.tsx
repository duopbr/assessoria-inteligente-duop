
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <div className={cn("feature-card", className)}>
      <div className="text-duop-purple text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-duop-blue">{title}</h3>
      <p className="text-duop-gray-dark">{description}</p>
    </div>
  );
}
