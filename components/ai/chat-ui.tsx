"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Mail } from "lucide-react"

// Define the structure of a chat message
export type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
}

// The ChatUI component is responsible for rendering the conversation
export function ChatUI(props: {
  className?: string
  disabled?: boolean
  messages: ChatMessage[]
  onSend: (message: string) => void | Promise<void>
  placeholder?: string
  inputAdornment?: React.ReactNode
  sessionEnded?: boolean
  onRestart?: () => void
  onEmailTranscriptClick: () => void;
}) {
  const { className, messages, onSend, disabled, placeholder, inputAdornment, sessionEnded, onRestart, onEmailTranscriptClick } = props
  const [value, setValue] = React.useState("")
  const listRef = React.useRef<HTMLDivElement | null>(null)

  // Automatically scroll to the latest message
  React.useEffect(() => {
    if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages])

  // Handle the form submission when a user sends a message
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (sessionEnded) return
    const text = value.trim()
    if (!text) return
    setValue("")
    await onSend(text)
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* This is the main chat area where messages are displayed */}
      <div
        ref={listRef}
        className="flex-1 space-y-3 overflow-y-auto rounded-lg bg-muted/50 p-3 backdrop-blur-sm scroll-smooth"
        style={{ scrollbarWidth: "thin" }}
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex animate-in fade-in slide-in-from-bottom-2 duration-300",
              m.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            <div
              className={cn(
                // Using prose for Tailwind's typography styles
                "prose prose-sm max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed shadow-sm transition-all duration-200 hover:shadow-md",
                m.role === "user"
                  ? "rounded-br-lg bg-yellow-400 font-medium text-gray-900 not-prose" // user messages don't need prose
                  : "prose-invert rounded-bl-lg border border-border bg-card text-foreground",
              )}
            >
              {/* This safely renders HTML content from the AI for better formatting */}
              <div dangerouslySetInnerHTML={{ __html: m.content }} />
            </div>
          </div>
        ))}

        {/* Show a "Typing..." indicator while waiting for the AI response */}
        {disabled && !sessionEnded && (
          <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex max-w-[85%] items-center gap-2 rounded-2xl rounded-bl-sm border border-border bg-card px-4 py-2.5 text-sm">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span className="text-muted-foreground">Typing...</span>
            </div>
          </div>
        )}

        {/* Display this block when the chat session has ended */}
        {sessionEnded && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 pt-2">
            <div className="mx-auto my-3 w-full rounded-lg border border-dashed bg-card p-4 text-center">
              <p className="mt-2 text-sm">
                Your chat session has ended. To start a new chat,{" "}
                <button
                  type="button"
                  onClick={onRestart}
                  className="font-medium text-yellow-500 underline transition-colors hover:text-yellow-400"
                >
                  click here
                </button>
                .
              </p>
              <p className="mt-3">
                 <button
                  type="button"
                  onClick={onEmailTranscriptClick}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground underline hover:text-foreground"
                >
                  <Mail className="h-4 w-4" />
                  Email this transcript
                </button>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* The message input form at the bottom */}
      {!sessionEnded && (
        <div className="flex-shrink-0 border-t p-3 pt-2">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
                aria-label="Type your message"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={disabled}
                placeholder={placeholder || "Ask a question..."}
                className="transition-all duration-200 focus:scale-[1.01]"
            />
            <Button
                type="submit"
                disabled={disabled || !value.trim()}
                size="icon"
                className="bg-yellow-400 text-gray-900 transition-all duration-200 hover:scale-110 hover:bg-yellow-500"
            >
                {inputAdornment || "Send"}
            </Button>
            </form>
        </div>
      )}
    </div>
  )
}

