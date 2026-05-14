import { cn } from '@/lib/utils';
import { forwardRef, InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-2 flex-1">
        {label && (
          <label htmlFor={inputId} className="text-gray-700 font-medium">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full bg-white border-2 rounded-2xl px-4 py-4 text-gray-900 text-lg outline-none focus:border-primary transition-colors',
            error ? 'border-red-400' : 'border-gray-200',
            className,
          )}
          {...props}
        />
        {error && <p className="text-error text-sm">{error}</p>}
      </div>
    );
  },
);
FormInput.displayName = 'FormInput';
