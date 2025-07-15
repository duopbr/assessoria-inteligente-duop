
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  note?: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, note, className }: FeatureCardProps) {
  return (
    <div className={cn("feature-card", className)}>
      <div className="text-duop-purple text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-duop-blue">{title}</h3>
      <p className="text-duop-gray-dark">{description}</p>
      {note && (
        <div className="mt-3 p-2 bg-duop-blue/10 rounded-md border-l-4 border-duop-blue">
          <p className="text-sm text-duop-blue font-medium">{note}</p>
        </div>
      )}
    </div>
  );
}
