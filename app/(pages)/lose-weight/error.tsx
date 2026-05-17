"use client";

export default function LoseWeightError({ reset }: { reset: () => void }) {
  return (
    <div
      role="alert"
      className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center"
    >
      <p className="text-lg text-gray-700">Something went wrong. Please refresh and try again.</p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-black text-white text-sm font-semibold rounded-full hover:bg-blue-500 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Try again
      </button>
    </div>
  );
}
