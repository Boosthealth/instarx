import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  fullWidth?: boolean;
}

export function Button({
  className,
  variant = 'primary',
  fullWidth = true,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'py-4 rounded-full text-lg font-semibold transition-colors cursor-pointer',
        fullWidth && 'w-full',
        variant === 'primary' && 'bg-primary hover:bg-primary-dark text-white',
        variant === 'ghost' && 'text-gray-600 hover:text-gray-900',
        className,
      )}
      {...props}
    />
  );
}
