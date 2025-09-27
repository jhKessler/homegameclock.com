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
import { Switch } from "~/components/ui/switch"

interface BreakConfig {
  enabled: boolean
  everyXLevels: number
  duration: number
}

interface BreakModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  config: BreakConfig
  onConfigChange: (config: BreakConfig) => void
}

export function BreakModal({ open, onOpenChange, config, onConfigChange }: BreakModalProps) {
  const [localConfig, setLocalConfig] = useState<BreakConfig>(config)

  useEffect(() => {
    setLocalConfig(config)
  }, [config])

  const handleSave = () => {
    onConfigChange(localConfig)
    onOpenChange(false)
  }

  const handleCancel = () => {
    setLocalConfig(config)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Break Configuration</DialogTitle>
          <DialogDescription>Set up automatic breaks during your tournament</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enable-breaks">Enable Breaks</Label>
              <div className="text-sm text-muted-foreground">Add scheduled breaks to your tournament</div>
            </div>
            <Switch
              id="enable-breaks"
              checked={localConfig.enabled}
              onCheckedChange={(enabled) => setLocalConfig((prev) => ({ ...prev, enabled }))}
            />
          </div>

          {localConfig.enabled && (
            <>
              <div className="space-y-2">
                <Label htmlFor="break-frequency">Add break every X levels</Label>
                <Input
                  id="break-frequency"
                  type="number"
                  value={localConfig.everyXLevels}
                  onChange={(e) =>
                    setLocalConfig((prev) => ({
                      ...prev,
                      everyXLevels: Math.max(1, Number(e.target.value)),
                    }))
                  }
                  min="1"
                  max="10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="break-duration">Break duration (minutes)</Label>
                <Input
                  id="break-duration"
                  type="number"
                  value={localConfig.duration}
                  onChange={(e) =>
                    setLocalConfig((prev) => ({
                      ...prev,
                      duration: Math.max(1, Number(e.target.value)),
                    }))
                  }
                  min="1"
                  max="60"
                />
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
