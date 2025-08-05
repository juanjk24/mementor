import { ThemeToggle } from "@/components/theme-toggle"
import { PromptCard } from "@/components/prompt-card"
import promptsData from "@/data/prompts.json"
import type { PromptItem } from "@/types/prompt"
import { Toaster } from "@/components/ui/toaster"

export default function HomePage() {
  const prompts: PromptItem[] = promptsData

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 py-4 flex justify-between items-center border-b border-border">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-primary">mementor</h1>
        </div>
        <ThemeToggle />
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-10 text-center">
          <h2 className="text-5xl font-semibold mb-4 animate-fade-in-up animation-delay-400 duration-1000">
          Tu mentor de prompts para cualquier IA
          </h2>
          <h3 className="text-2xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up animation-delay-600 duration-1000">
            Descubre prompts para potenciar tu creatividad y productividad
          </h3>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt, index) => (
            <PromptCard key={index} prompt={prompt} />
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
