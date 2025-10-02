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
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, MapPin, Users, Music, Sparkles, Calendar, GraduationCap, Utensils, Wine } from "lucide-react"
import Image from "next/image"

export default function ConfigurarPage() {
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    tipoLugar: "",
    numeroPersonas: "",
    curso: "",
    cotillon: false,
    dj: "",
    coctelBienvenida: false,
    picoteoFinal: false,
    picoteoGala: false,
    barraLibre: false,
    fecha: "",
    hora: "",
    comentarios: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const errors: string[] = []

    if (!formData.curso) {
      errors.push("Debes seleccionar un curso")
    }

    if (!formData.tipoLugar) {
      errors.push("Debes seleccionar el tipo de lugar")
    }

    if (!formData.numeroPersonas || Number.parseInt(formData.numeroPersonas) < 1) {
      errors.push("Debes indicar el número de invitados")
    }

    if (!formData.fecha) {
      errors.push("Debes seleccionar una fecha")
    }

    if (!formData.hora) {
      errors.push("Debes seleccionar una hora")
    }

    if (!formData.coctelBienvenida && !formData.picoteoGala && !formData.picoteoFinal) {
      errors.push("Debes seleccionar al menos un servicio de catering")
    }

    if (!formData.dj) {
      errors.push("Debes seleccionar una opción de música")
    }

    if (errors.length > 0) {
      toast({
        variant: "destructive",
        title: "Faltan campos obligatorios",
        description: (
          <ul className="list-disc pl-4 space-y-1 mt-2">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        ),
      })
      return
    }

    toast({
      title: "¡Solicitud enviada con éxito!",
      description: "Hemos recibido tu solicitud. Te contactaremos pronto para confirmar los detalles de tu orla.",
      variant: "default",
    })

    // Opcional: Resetear el formulario después de enviar
    // setFormData({ ... valores iniciales ... })
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="flex items-center gap-3 sm:gap-6">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-stone-100 text-stone-600 hover:text-stone-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Volver</span>
              </Button>
            </Link>
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-serif font-light text-stone-900 tracking-tight">
              Configurar tu Orla
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <Card className="border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
            <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6 pt-4 sm:pt-6">
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-medium text-stone-900">
                <div className="p-1.5 sm:p-2 bg-primary/10">
                  <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                Curso
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Selecciona tu curso académico
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <RadioGroup
                value={formData.curso}
                onValueChange={(value) => setFormData({ ...formData, curso: value })}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-4 sm:p-6 border border-stone-200 hover:border-primary/30 hover:bg-stone-50 transition-all duration-300 group">
                  <RadioGroupItem value="4eso" id="4eso" />
                  <Label htmlFor="4eso" className="flex-1 cursor-pointer">
                    <div className="font-medium text-sm sm:text-base text-stone-900 group-hover:text-primary transition-colors">
                      4º de ESO
                    </div>
                    <div className="text-xs sm:text-sm text-stone-600 mt-0.5 sm:mt-1 leading-relaxed">
                      Graduación de Educación Secundaria
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 sm:p-6 border border-stone-200 hover:border-primary/30 hover:bg-stone-50 transition-all duration-300 group">
                  <RadioGroupItem value="2bach" id="2bach" />
                  <Label htmlFor="2bach" className="flex-1 cursor-pointer">
                    <div className="font-medium text-sm sm:text-base text-stone-900 group-hover:text-primary transition-colors">
                      2º de Bachillerato
                    </div>
                    <div className="text-xs sm:text-sm text-stone-600 mt-0.5 sm:mt-1 leading-relaxed">
                      Graduación de Bachillerato
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card className="border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
            <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6 pt-4 sm:pt-6">
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-medium text-stone-900">
                <div className="p-1.5 sm:p-2 bg-primary/10">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                Tipo de Lugar
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Selecciona el tamaño del espacio según el número de invitados
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <RadioGroup
                value={formData.tipoLugar}
                onValueChange={(value) => setFormData({ ...formData, tipoLugar: value })}
                className="space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 border border-stone-200 hover:border-primary/30 hover:bg-stone-50 transition-all duration-300 group space-y-3 sm:space-y-0">
                  <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                    <div className="flex items-center space-x-2 pt-1">
                      <RadioGroupItem value="pequeño" id="pequeño" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="pequeño" className="cursor-pointer">
                        <div className="font-medium text-sm sm:text-base text-stone-900 group-hover:text-primary transition-colors">
                          Lugar Pequeño
                        </div>
                        <div className="text-xs sm:text-sm text-stone-600 mt-0.5 sm:mt-1 leading-relaxed">
                          Ideal para 20-50 personas
                        </div>
                      </Label>
                    </div>
                  </div>
                  <div className="sm:ml-6 self-center">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sala_pequen%CC%83a.JPG-CBt6jSxzleCQAmph6PFFWuvMAnKYlk.jpeg"
                      alt="Salón pequeño e íntimo"
                      width={120}
                      height={80}
                      className="object-cover shadow-sm group-hover:shadow-md transition-shadow duration-300 rounded"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 border border-stone-200 hover:border-primary/30 hover:bg-stone-50 transition-all duration-300 group space-y-3 sm:space-y-0">
                  <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                    <div className="flex items-center space-x-2 pt-1">
                      <RadioGroupItem value="grande" id="grande" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="grande" className="cursor-pointer">
                        <div className="font-medium text-sm sm:text-base text-stone-900 group-hover:text-primary transition-colors">
                          Lugar Grande
                        </div>
                        <div className="text-xs sm:text-sm text-stone-600 mt-0.5 sm:mt-1 leading-relaxed">
                          Ideal para 50+ personas
                        </div>
                      </Label>
                    </div>
                  </div>
                  <div className="sm:ml-6 self-center">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sala_grande.JPG-B3uNcFvKfQGYkjARGrfIVs5wkfmtA7.jpeg"
                      alt="Salón grande y amplio"
                      width={120}
                      height={80}
                      className="object-cover shadow-sm group-hover:shadow-md transition-shadow duration-300 rounded"
                    />
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card className="border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
            <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6 pt-4 sm:pt-6">
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-medium text-stone-900">
                <div className="p-1.5 sm:p-2 bg-primary/10">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                Número de Invitados
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-stone-600 leading-relaxed">
                ¿Cuántas personas asistirán aproximadamente?
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <Input
                type="number"
                placeholder="Ej: 35"
                value={formData.numeroPersonas}
                onChange={(e) => setFormData({ ...formData, numeroPersonas: e.target.value })}
                className="max-w-xs text-base sm:text-lg py-5 sm:py-6 border-stone-300 focus:border-primary"
                min="1"
                max="200"
              />
            </CardContent>
          </Card>

          <Card className="border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
            <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6 pt-4 sm:pt-6">
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-medium text-stone-900">
                <div className="p-1.5 sm:p-2 bg-primary/10">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                Fecha y Hora
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-stone-600 leading-relaxed">
                ¿Cuándo quieres celebrar tu orla?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fecha" className="text-sm sm:text-base text-stone-700 mb-2 block">
                    Fecha preferida
                  </Label>
                  <Input
                    id="fecha"
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    className="border-stone-300 focus:border-primary text-sm sm:text-base"
                  />
                </div>
                <div>
                  <Label htmlFor="hora" className="text-sm sm:text-base text-stone-700 mb-2 block">
                    Hora de inicio
                  </Label>
                  <Input
                    id="hora"
                    type="time"
                    value={formData.hora}
                    onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                    className="border-stone-300 focus:border-primary text-sm sm:text-base"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
            <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6 pt-4 sm:pt-6">
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-medium text-stone-900">
                <div className="p-1.5 sm:p-2 bg-primary/10">
                  <Utensils className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                Servicios de Catering
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Selecciona los servicios de comida y bebida que deseas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="flex items-start space-x-3 p-3 sm:p-4 border border-stone-200 hover:bg-stone-50 transition-colors">
                <Checkbox
                  id="coctelBienvenida"
                  checked={formData.coctelBienvenida}
                  onCheckedChange={(checked) => setFormData({ ...formData, coctelBienvenida: checked as boolean })}
                  className="mt-1"
                />
                <Label htmlFor="coctelBienvenida" className="cursor-pointer flex-1">
                  <div className="font-medium text-sm sm:text-base text-stone-900">Cóctel de Bienvenida</div>
                  <div className="text-xs sm:text-sm text-stone-600 mt-0.5 sm:mt-1 leading-relaxed">
                    Bebidas y aperitivos al inicio del evento
                  </div>
                </Label>
              </div>

              <div className="flex items-start space-x-3 p-3 sm:p-4 border border-stone-200 hover:bg-stone-50 transition-colors">
                <Checkbox
                  id="picoteoGala"
                  checked={formData.picoteoGala}
                  onCheckedChange={(checked) => setFormData({ ...formData, picoteoGala: checked as boolean })}
                  className="mt-1"
                />
                <Label htmlFor="picoteoGala" className="cursor-pointer flex-1">
                  <div className="font-medium text-sm sm:text-base text-stone-900">Picoteo de Gala</div>
                  <div className="text-xs sm:text-sm text-stone-600 mt-0.5 sm:mt-1 leading-relaxed">
                    Canapés y aperitivos premium durante el evento
                  </div>
                </Label>
              </div>

              <div className="flex items-start space-x-3 p-3 sm:p-4 border border-stone-200 hover:bg-stone-50 transition-colors">
                <Checkbox
                  id="picoteoFinal"
                  checked={formData.picoteoFinal}
                  onCheckedChange={(checked) => setFormData({ ...formData, picoteoFinal: checked as boolean })}
                  className="mt-1"
                />
                <Label htmlFor="picoteoFinal" className="cursor-pointer flex-1">
                  <div className="font-medium text-sm sm:text-base text-stone-900">Picoteo al Finalizar</div>
                  <div className="text-xs sm:text-sm text-stone-600 mt-0.5 sm:mt-1 leading-relaxed">
                    Snacks y bebidas para el cierre del evento
                  </div>
                </Label>
              </div>
            </CardContent>
          </Card>

          {formData.curso === "2bach" && (
            <Card className="border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
              <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6 pt-4 sm:pt-6">
                <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-medium text-stone-900">
                  <div className="p-1.5 sm:p-2 bg-primary/10">
                    <Wine className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  Barra Libre de Alcohol
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-stone-600 leading-relaxed">
                  Disponible solo para estudiantes de 2º de Bachillerato (mayores de edad)
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                <div className="flex items-start space-x-3 p-3 sm:p-4 border border-stone-200 hover:bg-stone-50 transition-colors">
                  <Checkbox
                    id="barraLibre"
                    checked={formData.barraLibre}
                    onCheckedChange={(checked) => setFormData({ ...formData, barraLibre: checked as boolean })}
                    className="mt-1"
                  />
                  <Label htmlFor="barraLibre" className="cursor-pointer flex-1">
                    <div className="font-medium text-sm sm:text-base text-stone-900">
                      Sí, quiero barra libre de alcohol
                    </div>
                    <div className="text-xs sm:text-sm text-stone-600 mt-0.5 sm:mt-1 leading-relaxed">
                      Incluye bebidas alcohólicas variadas durante el evento
                    </div>
                  </Label>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
            <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6 pt-4 sm:pt-6">
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-medium text-stone-900">
                <div className="p-1.5 sm:p-2 bg-primary/10">
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                Cotillón
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Accesorios divertidos para hacer tu orla más especial
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="flex items-start space-x-3 p-3 sm:p-4 border border-stone-200 hover:bg-stone-50 transition-colors">
                <Checkbox
                  id="cotillon"
                  checked={formData.cotillon}
                  onCheckedChange={(checked) => setFormData({ ...formData, cotillon: checked as boolean })}
                  className="mt-1"
                />
                <Label htmlFor="cotillon" className="cursor-pointer flex-1">
                  <div className="font-medium text-sm sm:text-base text-stone-900">Sí, quiero cotillón incluido</div>
                  <div className="text-xs sm:text-sm text-stone-600 mt-0.5 sm:mt-1 leading-relaxed">
                    Sombreros, serpentinas, globos, etc.
                  </div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
            <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6 pt-4 sm:pt-6">
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-medium text-stone-900">
                <div className="p-1.5 sm:p-2 bg-primary/10">
                  <Music className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                Música y DJ
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-stone-600 leading-relaxed">
                ¿Necesitas DJ profesional o prefieres poner tu propia música?
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <RadioGroup
                value={formData.dj}
                onValueChange={(value) => setFormData({ ...formData, dj: value })}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-4 sm:p-6 border border-stone-200 hover:border-primary/30 hover:bg-stone-50 transition-all duration-300 group">
                  <RadioGroupItem value="profesional" id="profesional" />
                  <Label htmlFor="profesional" className="flex-1 cursor-pointer">
                    <div className="font-medium text-sm sm:text-base text-stone-900 group-hover:text-primary transition-colors">
                      DJ Profesional
                    </div>
                    <div className="text-xs sm:text-sm text-stone-600 mt-0.5 sm:mt-1 leading-relaxed">
                      Incluye equipo de sonido y música variada
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 sm:p-6 border border-stone-200 hover:border-primary/30 hover:bg-stone-50 transition-all duration-300 group">
                  <RadioGroupItem value="propia" id="propia" />
                  <Label htmlFor="propia" className="flex-1 cursor-pointer">
                    <div className="font-medium text-sm sm:text-base text-stone-900 group-hover:text-primary transition-colors">
                      Música Propia
                    </div>
                    <div className="text-xs sm:text-sm text-stone-600 mt-0.5 sm:mt-1 leading-relaxed">
                      Traemos nuestro equipo de sonido, tú pones la música
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card className="border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
            <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6 pt-4 sm:pt-6">
              <CardTitle className="text-lg sm:text-xl font-medium text-stone-900">Comentarios Adicionales</CardTitle>
              <CardDescription className="text-sm sm:text-base text-stone-600 leading-relaxed">
                ¿Hay algo más que quieras contarnos sobre tu orla?
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <Textarea
                placeholder="Ej: Queremos decoración temática de los años 80, necesitamos espacio para fotos, etc."
                value={formData.comentarios}
                onChange={(e) => setFormData({ ...formData, comentarios: e.target.value })}
                rows={4}
                className="border-stone-300 focus:border-primary text-sm sm:text-base"
              />
            </CardContent>
          </Card>

          <div className="flex justify-center pt-6 sm:pt-8">
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto px-12 sm:px-16 py-6 sm:py-7 text-sm sm:text-base bg-primary hover:bg-primary/90 text-stone-900 font-medium tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Solicitar Presupuesto
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
