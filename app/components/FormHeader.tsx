import { cn } from '@/lib/utils';
import Image from 'next/image';

interface FormHeaderProps {
  showBack: boolean;
  onBack: () => void;
  progress: number;
  progressVariant?: 'solid' | 'gradient';
}

export function FormHeader({
  showBack,
  onBack,
  progress,
  progressVariant = 'solid',
}: FormHeaderProps) {
  return (
    <>
      <header className="bg-white w-full flex items-center justify-center h-16 relative px-4 shrink-0">
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            className="absolute left-4 p-2 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
            aria-label="Go back"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <Image src="/logos/instarx-logo.png" alt="InstaRx" width={110} height={33} priority />
      </header>
      <div className="w-full bg-gray-200 h-1 shrink-0">
        <div
          className={cn(
            'h-1 transition-all duration-500 ease-out',
            progressVariant === 'gradient'
              ? 'bg-linear-to-r from-[#9B59B6] via-[#E85FA0] to-primary'
              : 'bg-primary',
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </>
  );
}
