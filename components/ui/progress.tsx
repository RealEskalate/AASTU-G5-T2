"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & { isTeam?: boolean }) {
  const isTeam = props.isTeam
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        " relative  w-full overflow-hidden rounded-full", `${isTeam ? "h-2" : "h-7"}`, `${(value ?? 0) > 90 ? "bg-green-400/20" : (value ?? 0) > 50 ? "bg-yellow-400/20" : "bg-red-400/20"}`,
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={`h-full w-full flex-1 transition-all rounded-lg ${(value ?? 0) > 90 ? "bg-green-400" : (value ?? 0) > 50 ? "bg-yellow-400" : "bg-red-400"}`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
