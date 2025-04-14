
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  className?: string;
}

export function FAQItem({ question, answer, className }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("border-b border-gray-200 py-4", className)}>
      <button 
        className="flex justify-between items-center w-full text-left font-medium text-lg text-duop-blue"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <span className="ml-2 flex-shrink-0 text-duop-purple">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      {isOpen && (
        <div className="mt-2 text-duop-gray-dark">
          {answer}
        </div>
      )}
    </div>
  );
}
