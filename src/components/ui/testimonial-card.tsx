import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  photo?: string;
}

export function TestimonialCard({ quote, name, role, company, photo }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-duop-purple/10">
      <Quote className="text-duop-purple mb-4" size={32} />
      <p className="text-duop-gray-dark text-lg italic mb-6">"{quote}"</p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-duop-purple to-duop-blue flex items-center justify-center text-white font-bold text-lg">
          {photo ? (
            <img src={photo} alt={name} className="w-full h-full rounded-full object-cover" />
          ) : (
            name.charAt(0)
          )}
        </div>
        <div>
          <p className="font-bold text-duop-blue">{name}</p>
          <p className="text-sm text-duop-gray">{role}</p>
          <p className="text-xs text-duop-purple font-medium">{company}</p>
        </div>
      </div>
    </div>
  );
}
