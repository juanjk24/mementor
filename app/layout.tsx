import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://mementor.vercel.app"), // Replace with your actual domain
  title: {
    default: "mementor - Tu mentor de prompts para cualquier IA",
    template: "%s | mementor",
  },
  description:
    "Descubre y organiza los mejores prompts para tus herramientas de IA favoritas. Tu mentor de prompts para cualquier IA.",
  keywords: [
    "prompts",
    "IA",
    "inteligencia artificial",
    "repositorio",
    "mementor",
    "herramientas AI",
    "generación de texto",
    "generación de imágenes",
  ],
  openGraph: {
    title: "mementor - Tu mentor de prompts para cualquier IA",
    description: "Descubre y organiza los mejores prompts para tus herramientas de IA favoritas.",
    url: "https://mementor.vercel.app",
    siteName: "mementor",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200", // Placeholder image for Open Graph
        width: 1200,
        height: 630,
        alt: "mementor logo",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "mementor - Tu mentor de prompts para cualquier IA",
    description: "Descubre y organiza los mejores prompts para tus herramientas de IA favoritas.",
    images: ["/placeholder.svg?height=675&width=1200"], // Placeholder image for Twitter Card
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Add a manifest for PWA capabilities [^1]
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
