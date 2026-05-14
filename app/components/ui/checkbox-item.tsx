import { cn } from '@/lib/utils';

interface CheckboxItemProps {
  label: string;
  checked: boolean;
  onClick: () => void;
}

export function CheckboxItem({ label, checked, onClick }: CheckboxItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-start gap-3 bg-white border rounded-xl px-4 py-3 text-left cursor-pointer transition-colors',
        checked ? 'border-primary' : 'border-gray-200 hover:border-gray-300',
      )}
    >
      <div
        className={cn(
          'w-4 h-4 rounded border mt-0.5 shrink-0 flex items-center justify-center',
          checked ? 'bg-primary border-primary' : 'border-gray-400 bg-white',
        )}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4l2.5 2.5L9 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span className="text-gray-700 text-sm leading-snug">{label}</span>
    </button>
  );
}
