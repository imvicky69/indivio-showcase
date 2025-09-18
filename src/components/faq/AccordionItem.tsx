// src/components/AccordionItem.tsx
import { ChevronDown } from 'lucide-react';

type AccordionItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

export function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-slate-200">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-4 text-left gap-4"
      >
        <span className="text-lg font-medium text-dark">{question}</span>
        <ChevronDown
          className={`w-6 h-6 text-primary flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="prose pb-4 text-dark/70">{answer}</div>
        </div>
      </div>
    </div>
  );
}