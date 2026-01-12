"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ targetDate, className }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {timeBlocks.map((block, index) => (
        <div key={block.label} className="flex items-center gap-2">
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">
              {block.label}
            </div>
            <div className="bg-foreground text-white font-fredoka text-xl font-bold px-3 py-2 rounded-md min-w-[50px]">
              {String(block.value).padStart(2, "0")}
            </div>
          </div>
          {index < timeBlocks.length - 1 && (
            <span className="text-foreground font-bold text-xl mt-4">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
