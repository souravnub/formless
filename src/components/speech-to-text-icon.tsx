'use client'

import { Mic } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SpeechToTextIconProps {
  onClick?: () => void
  isRecording?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function SpeechToTextIconComponent({ onClick, isRecording = false, size = 'md' }: SpeechToTextIconProps) {
  const sizeClasses = {
    sm: {
      button: "w-6 h-6",
      icon: "h-3 w-3"
    },
    md: {
      button: "w-8 h-8",
      icon: "h-4 w-4"
    },
    lg: {
      button: "w-10 h-10",
      icon: "h-5 w-5"
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "rounded-full",
        sizeClasses[size].button,
        "bg-secondary text-secondary-foreground",
        "hover:bg-secondary-foreground hover:text-secondary",
        "transition-colors duration-200",
        {
          "bg-destructive text-destructive-foreground hover:bg-destructive hover:text-destructive-foreground": isRecording,
        }
      )}
      onClick={onClick}
      aria-label={isRecording ? "Stop speech to text recording" : "Start speech to text recording"}
    >
      <Mic className={cn(sizeClasses[size].icon, { "animate-pulse": isRecording })} />
    </Button>
  )
}