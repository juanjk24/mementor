"use client"
import { Copy, ExternalLink } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PromptItem } from "@/types/prompt"

interface PromptCardProps {
  prompt: PromptItem
  delay: number // New prop for staggered animation
}

export function PromptCard({ prompt, delay }: PromptCardProps) {
  const { toast } = useToast()
  const [isCopying, setIsCopying] = useState(false)

  const handleCopy = () => {
    setIsCopying(true)
    navigator.clipboard.writeText(prompt.prompt)
    toast({
      title: "Prompt copiado!",
      description: "El prompt ha sido copiado al portapapeles.",
    })
    setTimeout(() => setIsCopying(false), 500) // Reset animation state after a short delay
  }

  return (
    <Card
      className="flex flex-col justify-between h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-slide-in-bottom"
      style={{ animationDelay: `${delay}ms` }} // Apply staggered delay
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{prompt.prompt}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="text-sm px-3 py-1 rounded-full">
            {prompt.categoria}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          <h3 className="font-medium mb-2">Herramientas de IA sugeridas:</h3>
          <ul className="space-y-1">
            {prompt.ias.map((ia, index) => (
              <li key={index} className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-primary" />
                <a
                  href={ia.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline transition-colors duration-200"
                >
                  {ia.nombre}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleCopy}
          className={"w-full transition-all duration-200 " + (isCopying ? "animate-pulse-once" : "hover:bg-primary/90")}
        >
          <Copy className="mr-2 h-4 w-4" /> Copiar Prompt
        </Button>
      </CardFooter>
    </Card>
  )
}
