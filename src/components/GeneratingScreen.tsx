"use client";

import { useEffect, useState } from "react";
import { Card, ProgressBar } from "@heroui/react";

interface Props {
  onComplete: () => void;
}

const STATUS_STEPS = [
  { at: 0,  text: "Analyzing your workflow..." },
  { at: 18, text: "Selecting the best template..." },
  { at: 40, text: "Customizing for your team..." },
  { at: 65, text: "Adding your labels and data..." },
  { at: 88, text: "Almost ready..." },
];

const TOTAL_MS = 6000;
const TICK_MS  = 80;

export default function GeneratingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const increment = (TICK_MS / TOTAL_MS) * 100;
    const interval  = setInterval(() => {
      setProgress((prev) => Math.min(prev + increment, 100));
    }, TICK_MS);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) onComplete();
  }, [progress, onComplete]);

  const statusText =
    [...STATUS_STEPS].reverse().find((s) => progress >= s.at)?.text ??
    STATUS_STEPS[0].text;

  return (
    <Card variant="default" className="w-full max-w-sm text-center p-8">
      <Card.Content className="p-0 flex flex-col items-center gap-6">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-blue-600 text-3xl shadow-lg shadow-blue-200">
          ⚡
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">Building your app...</h2>
          <p className="text-sm text-slate-500 h-5">{statusText}</p>
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <ProgressBar
            value={progress}
            minValue={0}
            maxValue={100}
            aria-label="Build progress"
            color="default"
            size="sm"
            className="w-full"
          >
            <ProgressBar.Track>
              <ProgressBar.Fill />
            </ProgressBar.Track>
          </ProgressBar>
          <p className="text-xs text-slate-400 font-medium mt-2 text-right">
            {Math.round(progress)}%
          </p>
        </div>
      </Card.Content>
    </Card>
  );
}
