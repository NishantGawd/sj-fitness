"use client"

import { useToast } from "@/hooks/use-toast"
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"
import type { CSSProperties } from "react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant, duration, ...props }) => {
        const isDestructive = variant === "destructive"
        const ms = typeof duration === "number" ? duration : 5000
        const style = { ["--toast-duration" as any]: `${ms}ms` } as CSSProperties

        return (
          <Toast
            key={id}
            {...props}
            variant={variant}
            style={style}
            className={[
              // card
              "toast-card relative overflow-hidden rounded-lg border bg-background/80 backdrop-blur-md",
              "shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)]",
              // accent border left
              isDestructive ? "border-red-500" : "border-brand-yellow",
              // animate open/close via data-state
              "data-[state=open]:animate-toast-in data-[state=closed]:animate-toast-out",
            ].join(" ")}
          >
            <div className="flex items-start gap-3 pr-6">
              {/* Icon with subtle pulse ring */}
              <div className="relative mt-0.5">
                <span
                  className={[
                    "absolute inset-0 -z-10 rounded-md",
                    isDestructive ? "bg-red-500/20" : "bg-brand-yellow/20",
                    "animate-icon-pulse",
                  ].join(" ")}
                />
                <div
                  className={[
                    "inline-flex h-7 w-7 items-center justify-center rounded-md",
                    isDestructive ? "bg-red-500 text-white" : "bg-brand-yellow text-black",
                    "shadow",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  {isDestructive ? (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <path className="icon-cross-line animate-cross-draw" d="M6 6l12 12" />
                      <path className="icon-cross-line animate-cross-draw" d="M18 6l-12 12" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <path className="icon-check animate-check-draw" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>

              <div className="grid gap-1">
                {title && <ToastTitle className="text-base font-semibold">{title}</ToastTitle>}
                {description && <ToastDescription className="text-sm opacity-90">{description}</ToastDescription>}
                {action}
              </div>
            </div>

            {/* Progress bar */}
            <div className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden">
              <div
                className={["toast-progress h-0.5 origin-left", isDestructive ? "bg-red-500" : "bg-brand-yellow"].join(
                  " ",
                )}
              />
            </div>

            <ToastClose className="absolute right-2 top-2 rounded-md bg-foreground/5 px-2 py-1 text-xs hover:bg-foreground/10" />
          </Toast>
        )
      })}
      <ToastViewport className="fixed bottom-0 right-0 z-[100] m-4 flex w-[360px] max-w-[calc(100vw-32px)] flex-col gap-3 p-0" />
    </ToastProvider>
  )
}
