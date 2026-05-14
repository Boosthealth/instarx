import { cn } from '@/lib/utils';
import Image from 'next/image';

interface SelectionCardProps {
  icon: string;
  label: string;
  selected: boolean;
  onClick: () => void;
  multi?: boolean;
}

export function SelectionCard({ icon, label, selected, onClick, multi = false }: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'relative bg-white rounded-2xl border-2 px-4 py-6 flex flex-col items-center gap-4 cursor-pointer transition-colors',
        selected ? 'border-primary' : 'border-gray-200 hover:border-gray-300',
      )}
    >
      <div
        className={cn(
          'absolute top-2 right-2 w-6 h-6 flex items-center justify-center transition-colors',
          multi ? 'rounded' : 'rounded-full',
          selected ? 'bg-primary' : 'border-2 border-gray-300 bg-white rounded-full',
        )}
      >
        {selected && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path
              d="M1 5l3.5 3.5L11 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <Image src={`/icons/${icon}`} alt={label} width={64} height={64} />
      <span className="text-lg text-center font-medium text-gray-800 leading-tight">{label}</span>
    </button>
  );
}
