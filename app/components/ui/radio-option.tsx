import { cn } from '@/lib/utils';

interface RadioOptionProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function RadioOption({ label, selected, onClick }: RadioOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-4 bg-white border-2 rounded-2xl px-5 py-4 text-left cursor-pointer transition-colors',
        selected ? 'border-primary' : 'border-gray-200 hover:border-gray-300',
      )}
    >
      <div
        className={cn(
          'w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors',
          selected ? 'border-primary bg-primary' : 'border-gray-300',
        )}
      >
        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
      <span className="text-gray-800 font-medium">{label}</span>
    </button>
  );
}
