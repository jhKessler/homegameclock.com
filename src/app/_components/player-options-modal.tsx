"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

interface PlayerOptions {
  players: number
  buyIn: number | null
  rebuys: number
}

interface PlayerOptionsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  options: PlayerOptions
  onOptionsChange: (options: PlayerOptions) => void
}

export function PlayerOptionsModal({ open, onOpenChange, options, onOptionsChange }: PlayerOptionsModalProps) {
  const [localOptions, setLocalOptions] = useState<PlayerOptions>(options)

  useEffect(() => {
    setLocalOptions(options)
  }, [options])

  const handleSave = () => {
    if (localOptions.players) {
      onOptionsChange(localOptions)
      onOpenChange(false)
    }
  }

  const handleCancel = () => {
    setLocalOptions(options)
    onOpenChange(false)
  }

  const canSave = localOptions.players > 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tournament Details</DialogTitle>
          <DialogDescription>Set the number of players and buy-in amount</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="players">Number of Players</Label>
            <Input
              id="players"
              type="number"
              placeholder="e.g. 9"
              value={localOptions.players ?? ""}
              onChange={(e) =>
                setLocalOptions((prev) => ({
                  ...prev,
                  players: e.target.value ? Number(e.target.value) : 9,
                }))
              }
              min="2"
              max="1000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="buy-in">Buy-in Amount ($)</Label>
            <Input
              id="buy-in"
              type="number"
              placeholder="e.g. 50"
              value={localOptions.buyIn ?? ""}
              onChange={(e) =>
                setLocalOptions((prev) => ({
                  ...prev,
                  buyIn: e.target.value ? Number(e.target.value) : null,
                  rebuys: 0
                }))
              }
              min="1"
              max="10000"
            />
          </div>

          {localOptions.players && localOptions.buyIn && (
            <div className="rounded-lg bg-muted p-4 space-y-2">
              <div className="text-sm font-medium">Tournament Summary</div>
              <div className="text-sm text-muted-foreground">
                Total Prize Pool:{" "}
                <span className="font-mono">${(localOptions.players * localOptions.buyIn).toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!canSave}>
            Save Details
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
