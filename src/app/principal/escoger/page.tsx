"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Ambulance } from "lucide-react"

export default function Component() {
  const menuItems = [
    "Historias Clinicas",
    "Gestor de pagos",
    "Gestor reclamos",
    "Citas",
    "Gestor de reportes",
    "Gestor de empleados"
  ]

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex justify-center mb-6">
            <Ambulance className="w-16 h-16 text-primary" />
          </div>
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                className="w-full justify-start text-left h-12 bg-primary hover:bg-primary/90"
                variant="default"
              >
                {item}
              </Button>
            ))}
          </nav>
        </CardContent>
      </Card>
    </div>
  )
}