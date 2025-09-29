// components/ui/play-pause-button.tsx
'use client';

import { useEffect, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { useTimerStore } from '~/stores/timer/timer-store-provider';
import { set } from 'zod';
import { toast } from 'sonner';



export function PlayPauseButton() {
  const { pausedTime, pause, resume } = useTimerStore((state) => state)
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    setIsPaused(!!pausedTime);
  }, [pausedTime]);

  const handleClick = () => {
    if (isPaused) {
      resume();
      toast.success("Timer resumed");
    } else {
      pause();
      toast.success("Timer paused");
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={cn(
        'flex h-16 w-16 items-center justify-center rounded-full',
        'focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-slate-400',
        'transition-all duration-300 ease-in-out',
        'hover:scale-110 active:scale-100',
      )}
      variant="secondary"
      size="icon"
      aria-label={isPaused ? 'Play' : 'Pause'}
    >
      {isPaused ? (
        <Play
          className="h-8 w-8 translate-x-0.5 fill-current"
          aria-hidden="true"
        />
      ) : (
        <Pause className="h-8 w-8 fill-current" aria-hidden="true" />
      )}
    </Button>
  );
}