"use client";

import { Button } from "~/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useConfigStore } from "~/stores/config/config-store-provider";
import ConfirmationDialog from "~/components/ui/confirmation-dialog";
import { toast } from "sonner";

export const PrizePool = () => {
    const { registerRebuy, getPrizePool } = useConfigStore((state) => state);
    const prizePool = getPrizePool();

    if (prizePool === null) return null;


    const formattedPrizePool = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(prizePool);

    return (
        <div className="flex w-full max-w-md flex-col items-center justify-between gap-4 text-neutral-200">
            <h2 className="text-2xl font-medium tracking-wider text-neutral-400">
                Prize Pool
            </h2>

            <div className="text-center">
                <p className="text-5xl font-bold tracking-tighter">
                    {formattedPrizePool}
                </p>
            </div>

            <ConfirmationDialog
                onConfirm={() => {
                    toast.success("Rebuy added to prize pool");
                    registerRebuy();
                }}
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will add one buy-in to the prize pool."
            >
                <Button
                    variant="secondary"
                    size="lg"
                    className="bg-zinc-800 text-neutral-300 hover:bg-zinc-700"
                >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Rebuy
                </Button>
            </ConfirmationDialog>
        </div>
    );
};