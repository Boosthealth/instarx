import { cn } from '@/lib/utils';
import { forwardRef, ReactNode, SelectHTMLAttributes } from 'react';

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: ReactNode;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ className, label, error, children, id, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-2 flex-1">
        {label && (
          <label htmlFor={selectId} className="text-gray-700 font-medium">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full bg-white border-2 rounded-2xl px-4 py-4 text-gray-900 text-lg outline-none focus:border-primary transition-colors appearance-none cursor-pointer',
              error ? 'border-red-400' : 'border-gray-200',
              className,
            )}
            {...props}
          >
            {children}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm select-none">
            ▾
          </span>
        </div>
        {error && <p className="text-error text-sm">{error}</p>}
      </div>
    );
  },
);
FormSelect.displayName = 'FormSelect';
