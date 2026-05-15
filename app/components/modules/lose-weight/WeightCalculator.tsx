"use client";

import { useState } from "react";

export function WeightCalculator() {
  const [weight, setWeight] = useState(220);
  const loss = Math.round(weight * 0.2);
  const pct = ((weight - 150) / (400 - 150)) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 h-full flex flex-col justify-center">
      <div className="text-center md:text-left px-6">
        <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-4 xl:text-3xl">
          Let&apos;s See How much weight can you shed by next spring?
        </h3>
        <div className="border-t border-gray-100 my-4 xl:my-6" />
        <p className="text-gray-600 text-center mb-4">Your current weight:</p>
        <div className="flex justify-center mb-6">
          <input
            type="number"
            min={150}
            max={400}
            value={weight}
            onChange={(e) => setWeight(Math.min(400, Math.max(150, Number(e.target.value) || 150)))}
            className="w-36 text-center text-3xl font-semibold text-gray-900 border border-gray-200 rounded-full py-3 px-6 focus:outline-none focus:border-blue-400"
          />
        </div>

        <div className="mb-8 px-4">
          <input
            type="range"
            min={150}
            max={400}
            value={weight}
            onChange={(e) => setWeight(Math.min(400, Math.max(150, Number(e.target.value))))}
            className="calc-slider w-full appearance-none cursor-pointer h-1 rounded-full"
            style={{
              background: `linear-gradient(to right, #38bdf8 0%, #38bdf8 ${pct}%, #e5e7eb ${pct}%, #e5e7eb 100%)`,
            }}
          />
        </div>

        <div
          className="bg-gradient mx-auto flex w-[90%] items-center justify-between rounded-full px-6 py-4 text-gray-900 xl:w-[80%] xl:py-6 xl:px-8"
        >
          <span className="text-lg font-bold leading-tight">
            You could<br />easily lose:
          </span>
          <span className="text-3xl font-extrabold">
            {loss} lbs
          </span>
        </div>
      </div>
    </div>
  );
}
