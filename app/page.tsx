"use client"

import { useState, useMemo } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { PromptCard } from "@/components/prompt-card"
import { FilterSection } from "@/components/filter-component"
import promptsData from "@/data/prompts.json"
import type { PromptItem } from "@/types/prompt"
import { Toaster } from "@/components/ui/toaster"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const prompts: PromptItem[] = promptsData
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedIAs, setSelectedIAs] = useState<string[]>([])

  // Filtrar prompts basándose en los filtros seleccionados
  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.some(category => prompt.categorias.includes(category))
      
      const matchesIA = selectedIAs.length === 0 || 
        selectedIAs.some(ia => prompt.ias.some(promptIA => promptIA.nombre === ia))
      
      return matchesCategory && matchesIA
    })
  }, [prompts, selectedCategories, selectedIAs])

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleIAToggle = (ia: string) => {
    setSelectedIAs(prev => 
      prev.includes(ia) 
        ? prev.filter(i => i !== ia)
        : [...prev, ia]
    )
  }

  const handleClearFilters = () => {
    setSelectedCategories([])
    setSelectedIAs([])
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 py-4 flex justify-between items-center border-b border-border">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-primary selection:bg-primary-foreground">mementor</h1>
        </div>
        <ThemeToggle />
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-10 text-center">
          <h2 className="text-5xl font-semibold mb-4 animate-fade-in-up animation-delay-400 duration-1000 selection:bg-primary">
            Tu mentor de prompts para cualquier IA
          </h2>
          <h3 className="text-2xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up animation-delay-600 duration-1000 selection:bg-primary selection:text-white">
            Descubre prompts para potenciar tu creatividad y productividad
          </h3>
        </section>

        {/* Sección de filtros */}
        <FilterSection
          prompts={prompts}
          selectedCategories={selectedCategories}
          selectedIAs={selectedIAs}
          onCategoryToggle={handleCategoryToggle}
          onIAToggle={handleIAToggle}
          onClearFilters={handleClearFilters}
        />

        {/* Contador de resultados */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Mostrando {filteredPrompts.length} de {prompts.length} prompts
            </span>
            {(selectedCategories.length > 0 || selectedIAs.length > 0) && (
              <Badge variant="outline" className="text-xs">
                Filtrado
              </Badge>
            )}
          </div>
        </div>

        {/* Grid de prompts */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.length > 0 ? (
            filteredPrompts.map((prompt, index) => (
              <PromptCard key={index} prompt={prompt} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-muted-foreground">
                <p className="text-lg mb-2">No se encontraron prompts</p>
                <p className="text-sm">
                  Intenta ajustar los filtros para ver más resultados
                </p>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="container mx-auto px-4 py-6 text-center text-muted-foreground border-t border-border mt-10">
        <p>&copy; {new Date().getFullYear()} mementor. Todos los derechos reservados.</p>
      </footer>
      
      <Toaster />
    </div>
  )
}
