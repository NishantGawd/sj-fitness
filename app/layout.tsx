import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { ChatbotWidget } from "@/components/ai/chatbot-widget"
import Header from "@/components/Header"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "SJ Fitness | Your Fitness Journey Starts Here",
  description: "State-of-the-art gym with modern equipment and expert trainers.",
  icons: {
    icon: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body className="font-sans bg-background">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="pt-16">{children}</main>
          <Toaster />
          <ChatbotWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}