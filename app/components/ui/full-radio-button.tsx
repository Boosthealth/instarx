import { cn } from '@/lib/utils';

interface FullRadioButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function FullRadioButton({ label, selected, onClick }: FullRadioButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-4 w-full rounded-2xl px-5 py-4 text-left cursor-pointer transition-all border-2',
        selected
          ? 'bg-primary border-primary text-white'
          : 'bg-white border-gray-200 text-gray-900 hover:border-gray-300',
      )}
    >
      <div
        className={cn(
          'w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors',
          selected ? 'border-white bg-primary' : 'border-gray-300 bg-white',
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
      <span className="font-medium">{label}</span>
    </button>
  );
}
