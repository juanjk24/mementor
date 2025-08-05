import { ThemeToggle } from "@/components/theme-toggle"
import { PromptCard } from "@/components/prompt-card"
import promptsData from "@/data/prompts.json"
import type { PromptItem } from "@/types/prompt"
import { Toaster } from "@/components/ui/toaster"

export default function HomePage() {
  const prompts: PromptItem[] = promptsData

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center border-b border-border">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-primary animate-fade-in-up">mementor</h1>
          <p className="text-lg text-muted-foreground mt-1 animate-fade-in-up animation-delay-200">
            Tu mentor de prompts para cualquier IA.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-10 text-center">
          <h2 className="text-3xl font-semibold mb-4 animate-fade-in-up animation-delay-400">
            Descubre prompts para potenciar tu creatividad y productividad.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-in-up animation-delay-600">
            Explora nuestra colección curada de prompts para diversas categorías y herramientas de Inteligencia
            Artificial.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt, index) => (
            <PromptCard key={index} prompt={prompt} delay={index * 100} /> // Staggered animation
          ))}
        </section>
      </main>

      <footer className="container mx-auto px-4 py-6 text-center text-muted-foreground border-t border-border mt-10">
        <p>&copy; {new Date().getFullYear()} mementor. Todos los derechos reservados.</p>
      </footer>
      <Toaster />
    </div>
  )
}
