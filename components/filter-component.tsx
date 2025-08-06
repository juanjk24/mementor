"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, X } from 'lucide-react'
import type { PromptItem } from "@/types/prompt"

interface FilterSectionProps {
  prompts: PromptItem[]
  selectedCategories: string[]
  selectedIAs: string[]
  onCategoryToggle: (category: string) => void
  onIAToggle: (ia: string) => void
  onClearFilters: () => void
}

export function FilterSection({
  prompts,
  selectedCategories,
  selectedIAs,
  onCategoryToggle,
  onIAToggle,
  onClearFilters
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Extraer categorías únicas
  const allCategories = Array.from(
    new Set(prompts.flatMap(prompt => prompt.categorias))
  ).sort()

  // Extraer IAs únicas
  const allIAs = Array.from(
    new Set(prompts.flatMap(prompt => prompt.ias.map(ia => ia.nombre)))
  ).sort()

  const hasActiveFilters = selectedCategories.length > 0 || selectedIAs.length > 0

  return (
    <Card className="mb-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors p-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Filtros
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedCategories.length + selectedIAs.length}
                  </Badge>
                )}
              </CardTitle>
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Filtros activos */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium">Filtros activos:</span>
                {selectedCategories.map(category => (
                  <Badge key={category} variant="default" className="gap-1">
                    {category}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:bg-destructive/20 rounded-full" 
                      onClick={() => onCategoryToggle(category)}
                    />
                  </Badge>
                ))}
                {selectedIAs.map(ia => (
                  <Badge key={ia} variant="outline" className="gap-1">
                    {ia}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:bg-destructive/20 rounded-full" 
                      onClick={() => onIAToggle(ia)}
                    />
                  </Badge>
                ))}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onClearFilters}
                  className="h-6 px-2 text-xs"
                >
                  Limpiar todo
                </Button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              {/* Filtro por categorías */}
              <div>
                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                  Categorías
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategories.includes(category) ? "default" : "outline"}
                      size="sm"
                      onClick={() => onCategoryToggle(category)}
                      className="text-xs"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Filtro por IAs */}
              <div>
                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                  Inteligencias Artificiales
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allIAs.map(ia => (
                    <Button
                      key={ia}
                      variant={selectedIAs.includes(ia) ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => onIAToggle(ia)}
                      className="text-xs"
                    >
                      {ia}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
