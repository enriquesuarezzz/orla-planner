"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, MapPin, Users, Music, Sparkles, Calendar } from "lucide-react"
import Image from "next/image"

export default function ConfigurarPage() {
  const [formData, setFormData] = useState({
    tipoLugar: "",
    numeroPersonas: "",
    cotillon: false,
    dj: "",
    fecha: "",
    hora: "",
    comentarios: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí se procesaría el formulario
    alert("¡Formulario enviado! Te contactaremos pronto para confirmar los detalles.")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Configurar tu Orla</h1>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Tipo de Lugar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Tipo de Lugar
              </CardTitle>
              <CardDescription>Selecciona el tamaño del espacio según el número de invitados</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.tipoLugar}
                onValueChange={(value) => setFormData({ ...formData, tipoLugar: value })}
              >
                <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pequeño" id="pequeño" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="pequeño" className="cursor-pointer">
                        <div className="font-medium">Lugar Pequeño</div>
                        <div className="text-sm text-muted-foreground">Ideal para 20-50 personas</div>
                      </Label>
                    </div>
                  </div>
                  <div className="ml-4">
                    <Image
                      src="/lugar-pequeno-salon-intimo.jpg"
                      alt="Salón pequeño e íntimo para orlas"
                      width={120}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="grande" id="grande" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="grande" className="cursor-pointer">
                        <div className="font-medium">Lugar Grande</div>
                        <div className="text-sm text-muted-foreground">Ideal para 50+ personas</div>
                      </Label>
                    </div>
                  </div>
                  <div className="ml-4">
                    <Image
                      src="/lugar-grande-salon-amplio.jpg"
                      alt="Salón grande y amplio para orlas"
                      width={120}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Número de Personas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Número de Invitados
              </CardTitle>
              <CardDescription>¿Cuántas personas asistirán aproximadamente?</CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                type="number"
                placeholder="Ej: 35"
                value={formData.numeroPersonas}
                onChange={(e) => setFormData({ ...formData, numeroPersonas: e.target.value })}
                className="max-w-xs"
                min="1"
                max="200"
              />
            </CardContent>
          </Card>

          {/* Fecha y Hora */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Fecha y Hora
              </CardTitle>
              <CardDescription>¿Cuándo quieres celebrar tu orla?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fecha">Fecha preferida</Label>
                  <Input
                    id="fecha"
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="hora">Hora de inicio</Label>
                  <Input
                    id="hora"
                    type="time"
                    value={formData.hora}
                    onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cotillón */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Cotillón
              </CardTitle>
              <CardDescription>Accesorios divertidos para hacer tu orla más especial</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cotillon"
                  checked={formData.cotillon}
                  onCheckedChange={(checked) => setFormData({ ...formData, cotillon: checked as boolean })}
                />
                <Label htmlFor="cotillon" className="cursor-pointer">
                  Sí, quiero cotillón incluido (sombreros, serpentinas, globos, etc.)
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* DJ */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5 text-primary" />
                Música y DJ
              </CardTitle>
              <CardDescription>¿Necesitas DJ profesional o prefieres poner tu propia música?</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={formData.dj} onValueChange={(value) => setFormData({ ...formData, dj: value })}>
                <div className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="profesional" id="profesional" />
                  <Label htmlFor="profesional" className="flex-1 cursor-pointer">
                    <div className="font-medium">DJ Profesional</div>
                    <div className="text-sm text-muted-foreground">Incluye equipo de sonido y música variada</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="propia" id="propia" />
                  <Label htmlFor="propia" className="flex-1 cursor-pointer">
                    <div className="font-medium">Música Propia</div>
                    <div className="text-sm text-muted-foreground">
                      Traemos nuestro equipo de sonido, tú pones la música
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Comentarios */}
          <Card>
            <CardHeader>
              <CardTitle>Comentarios Adicionales</CardTitle>
              <CardDescription>¿Hay algo más que quieras contarnos sobre tu orla?</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Ej: Queremos decoración temática de los años 80, necesitamos espacio para fotos, etc."
                value={formData.comentarios}
                onChange={(e) => setFormData({ ...formData, comentarios: e.target.value })}
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button type="submit" size="lg" className="px-12">
              Solicitar Presupuesto
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
