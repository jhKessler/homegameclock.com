// components/ui/reset-button.tsx
'use client';

import { LogOut } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { useTimerStore } from '~/stores/timer/timer-store-provider';
import { toast } from 'sonner';
import ConfirmationDialog from '~/components/ui/confirmation-dialog';

export function ResetButton({
    onReset
}: {
    onReset: () => void
}) {

  const handleReset = () => {
    onReset();
    toast.success('Timer has been reset.');
  };

  return (
    <ConfirmationDialog
      onConfirm={handleReset}
      title="Are you absolutely sure?"
      description="This action cannot be undone. This will permanently exit and reset the timer."
    >
      <Button
        className={cn(
          'flex h-16 w-16 items-center justify-center rounded-full',
          // Added a bright ring for focus visibility
          'transition-all duration-300 ease-in-out border-white border-2',
          'hover:scale-110 ',
        )}
        variant={"outline"}
        size="icon"
        aria-label="Exit and reset the timer"
      >
        {/* Adjusted icon size for consistency with PlayPauseButton */}
        <LogOut className="h-8 w-8" aria-hidden="true" />
      </Button>
    </ConfirmationDialog>
  );
}