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
import { ArrowLeft, MapPin, Users, Sparkles, Calendar, GraduationCap, Utensils, Wine, Music } from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { sendOrlaRequest } from "./actions"

export default function ConfigurarPage() {
  const { toast } = useToast()
  const [showUserDataDialog, setShowUserDataDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userData, setUserData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    calle: "",
    codigoPostal: "",
    nombreCentro: "",
    email: "",
    telefono: "",
  })

  const [formData, setFormData] = useState({
    tipoLugar: "",
    numeroPersonas: "",
    curso: "",
    cotillon: false,
    dj: "",
    catering: "",
    barraLibre: false,
    fecha: "",
    hora: "",
    comentarios: "",
  })

  const today = new Date().toISOString().split("T")[0]

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

    if (formData.tipoLugar === "pequeño" && Number.parseInt(formData.numeroPersonas) > 120) {
      errors.push(
        "La Sala Pequeña tiene capacidad máxima de 120 personas. Por favor, selecciona la Sala Grande o reduce el número de invitados.",
      )
    }

    if (!formData.fecha) {
      errors.push("Debes seleccionar una fecha")
    }

    if (!formData.hora) {
      errors.push("Debes seleccionar una hora")
    }

    if (!formData.catering) {
      errors.push("Debes seleccionar un servicio de catering")
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

    setShowUserDataDialog(true)
  }

  const triggerCapCelebration = () => {
    console.log("[v0] Triggering graduation cap celebration!")
    const numberOfCaps = 30
    const container = document.body

    for (let i = 0; i < numberOfCaps; i++) {
      setTimeout(() => {
        const cap = document.createElement("img")
        cap.src = "/sombrero.png"
        cap.style.position = "fixed"
        cap.style.width = "100px"
        cap.style.height = "100px"
        cap.style.left = `${Math.random() * 100}vw`
        cap.style.bottom = "-120px"
        cap.style.zIndex = "9999"
        cap.style.pointerEvents = "none"
        cap.style.objectFit = "contain"

        const duration = 3 + Math.random() * 2
        const drift = (Math.random() - 0.5) * 300

        cap.style.animation = `flyUpCap ${duration}s ease-out forwards`
        cap.style.setProperty("--drift", `${drift}px`)

        container.appendChild(cap)
        console.log("[v0] Cap added to DOM", { duration, drift })

        setTimeout(() => {
          cap.remove()
          console.log("[v0] Cap removed from DOM")
        }, duration * 1000)
      }, i * 80)
    }
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const errors: string[] = []

    if (!userData.nombre.trim()) errors.push("Nombre es obligatorio")
    if (!userData.apellido.trim()) errors.push("Apellido es obligatorio")
    if (!userData.dni.trim()) errors.push("DNI es obligatorio")
    if (!userData.calle.trim()) errors.push("Calle es obligatoria")
    if (!userData.codigoPostal.trim()) errors.push("Código postal es obligatorio")
    if (!userData.nombreCentro.trim()) errors.push("Nombre del centro es obligatorio")
    if (!userData.email.trim()) errors.push("Email es obligatorio")
    if (!userData.telefono.trim()) errors.push("Teléfono es obligatorio")

    if (errors.length > 0) {
      toast({
        variant: "destructive",
        title: "Faltan datos personales",
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

    setIsSubmitting(true)
    try {
      const result = await sendOrlaRequest({ ...formData, ...userData })

      if (result.success) {
        triggerCapCelebration()

        toast({
          title: "¡Solicitud enviada con éxito!",
          description: "Hemos recibido tu solicitud. Te contactaremos pronto para confirmar los detalles de tu orla.",
          variant: "default",
        })

        setShowUserDataDialog(false)

        // Reset forms
        setFormData({
          tipoLugar: "",
          numeroPersonas: "",
          curso: "",
          cotillon: false,
          dj: "",
          catering: "",
          barraLibre: false,
          fecha: "",
          hora: "",
          comentarios: "",
        })
        setUserData({
          nombre: "",
          apellido: "",
          dni: "",
          calle: "",
          codigoPostal: "",
          nombreCentro: "",
          email: "",
          telefono: "",
        })
      } else {
        toast({
          variant: "destructive",
          title: "Error al enviar",
          description: result.error || "Hubo un problema al enviar tu solicitud. Por favor, inténtalo de nuevo.",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al enviar",
        description: "Hubo un problema al enviar tu solicitud. Por favor, inténtalo de nuevo.",
      })
    } finally {
      setIsSubmitting(false)
    }
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
                <div className="flex items-center space-x-3 p-4 sm:p-6 border border-stone-200 hover:border-primary/30 hover:bg-stone-50 transition-all duration-300 group">
                  <RadioGroupItem value="otros" id="otros" />
                  <Label htmlFor="otros" className="flex-1 cursor-pointer">
                    <div className="font-medium text-sm sm:text-base text-stone-900 group-hover:text-primary transition-colors">
                      Otros
                    </div>
                    <div className="text-xs sm:text-sm text-stone-600 mt-0.5 sm:mt-1 leading-relaxed">
                      Otras celebraciones o eventos
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
                          Sala Pequeña
                        </div>
                        <div className="text-xs sm:text-sm text-stone-600 mt-0.5 sm:mt-1 leading-relaxed">
                          Hasta 120 personas
                        </div>
                      </Label>
                    </div>
                  </div>
                  <div className="sm:ml-6 self-center">
                    <Image
                      src="/sala-pequena.jpeg"
                      alt="Sala pequeña con iluminación azul"
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
                          Sala Grande
                        </div>
                        <div className="text-xs sm:text-sm text-stone-600 mt-0.5 sm:mt-1 leading-relaxed">
                          + de 250 personas
                        </div>
                      </Label>
                    </div>
                  </div>
                  <div className="sm:ml-6 self-center">
                    <Image
                      src="/sala-grande.jpeg"
                      alt="Sala grande con iluminación morada"
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
                max="500"
              />
              {formData.tipoLugar === "pequeño" && Number.parseInt(formData.numeroPersonas) > 120 && (
                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md">
                  <p className="text-sm text-amber-800">
                    ⚠️ La Sala Pequeña tiene capacidad máxima de 120 personas. Por favor, selecciona la Sala Grande.
                  </p>
                </div>
              )}
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
                    min={today}
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
                Selecciona el servicio de comida y bebida que deseas
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <RadioGroup
                value={formData.catering}
                onValueChange={(value) => setFormData({ ...formData, catering: value })}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-4 sm:p-6 border border-stone-200 hover:border-primary/30 hover:bg-stone-50 transition-all duration-300 group">
                  <RadioGroupItem value="coctel-bienvenida" id="coctel-bienvenida" />
                  <Label htmlFor="coctel-bienvenida" className="flex-1 cursor-pointer">
                    <div className="font-medium text-sm sm:text-base text-stone-900 group-hover:text-primary transition-colors">
                      Cóctel de Bienvenida
                    </div>
                    <div className="text-xs sm:text-sm text-stone-600 mt-0.5 sm:mt-1 leading-relaxed">
                      Bebidas y aperitivos al inicio del evento
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-4 sm:p-6 border border-stone-200 hover:border-primary/30 hover:bg-stone-50 transition-all duration-300 group">
                  <RadioGroupItem value="coctel-bienvenida-picoteo-gala" id="coctel-bienvenida-picoteo-gala" />
                  <Label htmlFor="coctel-bienvenida-picoteo-gala" className="flex-1 cursor-pointer">
                    <div className="font-medium text-sm sm:text-base text-stone-900 group-hover:text-primary transition-colors">
                      Cóctel de Bienvenida + Picoteo de Gala
                    </div>
                    <div className="text-xs sm:text-sm text-stone-600 mt-0.5 sm:mt-1 leading-relaxed">
                      Bebidas de bienvenida y canapés premium durante el evento
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-4 sm:p-6 border border-stone-200 hover:border-primary/30 hover:bg-stone-50 transition-all duration-300 group">
                  <RadioGroupItem value="picoteo-gala" id="picoteo-gala" />
                  <Label htmlFor="picoteo-gala" className="flex-1 cursor-pointer">
                    <div className="font-medium text-sm sm:text-base text-stone-900 group-hover:text-primary transition-colors">
                      Picoteo de Gala
                    </div>
                    <div className="text-xs sm:text-sm text-stone-600 mt-0.5 sm:mt-1 leading-relaxed">
                      Canapés y aperitivos premium durante el evento
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-4 sm:p-6 border border-stone-200 hover:border-primary/30 hover:bg-stone-50 transition-all duration-300 group">
                  <RadioGroupItem value="picoteo-final" id="picoteo-final" />
                  <Label htmlFor="picoteo-final" className="flex-1 cursor-pointer">
                    <div className="font-medium text-sm sm:text-base text-stone-900 group-hover:text-primary transition-colors">
                      Picoteo al Finalizar
                    </div>
                    <div className="text-xs sm:text-sm text-stone-600 mt-0.5 sm:mt-1 leading-relaxed">
                      Snacks y bebidas para el cierre del evento
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-4 sm:p-6 border border-stone-200 hover:border-primary/30 hover:bg-stone-50 transition-all duration-300 group">
                  <RadioGroupItem
                    value="coctel-bienvenida-picoteo-gala-final"
                    id="coctel-bienvenida-picoteo-gala-final"
                  />
                  <Label htmlFor="coctel-bienvenida-picoteo-gala-final" className="flex-1 cursor-pointer">
                    <div className="font-medium text-sm sm:text-base text-stone-900 group-hover:text-primary transition-colors">
                      Cóctel de Bienvenida + Picoteo de Gala + Picoteo Final
                    </div>
                    <div className="text-xs sm:text-sm text-stone-600 mt-0.5 sm:mt-1 leading-relaxed">
                      Servicio completo de catering durante todo el evento
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {(formData.curso === "2bach" || formData.curso === "otros") && (
            <Card className="border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
              <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6 pt-4 sm:pt-6">
                <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-medium text-stone-900">
                  <div className="p-1.5 sm:p-2 bg-primary/10">
                    <Wine className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  Barra Libre de Alcohol
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-stone-600 leading-relaxed">
                  Bebidas alcohólicas disponibles durante el evento
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
                  <RadioGroupItem value="profesional" id="dj-profesional" />
                  <Label htmlFor="dj-profesional" className="flex-1 cursor-pointer">
                    <div className="font-medium text-sm sm:text-base text-stone-900 group-hover:text-primary transition-colors">
                      DJ Profesional
                    </div>
                    <div className="text-xs sm:text-sm text-stone-600 mt-0.5 sm:mt-1 leading-relaxed">
                      Incluye equipo de sonido y música variada
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-4 sm:p-6 border border-stone-200 hover:border-primary/30 hover:bg-stone-50 transition-all duration-300 group">
                  <RadioGroupItem value="propia" id="musica-propia" />
                  <Label htmlFor="musica-propia" className="flex-1 cursor-pointer">
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

      <Dialog open={showUserDataDialog} onOpenChange={setShowUserDataDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif text-stone-900">Datos de Contacto</DialogTitle>
            <DialogDescription className="text-stone-600">
              Por favor, completa tus datos para que podamos enviarte el presupuesto
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFinalSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre" className="text-stone-700 mb-2 block">
                  Nombre *
                </Label>
                <Input
                  id="nombre"
                  value={userData.nombre}
                  onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
                  className="border-stone-300 focus:border-primary"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div>
                <Label htmlFor="apellido" className="text-stone-700 mb-2 block">
                  Apellido *
                </Label>
                <Input
                  id="apellido"
                  value={userData.apellido}
                  onChange={(e) => setUserData({ ...userData, apellido: e.target.value })}
                  className="border-stone-300 focus:border-primary"
                  placeholder="Tu apellido"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="dni" className="text-stone-700 mb-2 block">
                DNI *
              </Label>
              <Input
                id="dni"
                value={userData.dni}
                onChange={(e) => setUserData({ ...userData, dni: e.target.value })}
                className="border-stone-300 focus:border-primary"
                placeholder="12345678A"
                required
              />
            </div>

            <div>
              <Label htmlFor="calle" className="text-stone-700 mb-2 block">
                Calle *
              </Label>
              <Input
                id="calle"
                value={userData.calle}
                onChange={(e) => setUserData({ ...userData, calle: e.target.value })}
                className="border-stone-300 focus:border-primary"
                placeholder="Calle Principal, 123"
                required
              />
            </div>

            <div>
              <Label htmlFor="codigoPostal" className="text-stone-700 mb-2 block">
                Código Postal *
              </Label>
              <Input
                id="codigoPostal"
                value={userData.codigoPostal}
                onChange={(e) => setUserData({ ...userData, codigoPostal: e.target.value })}
                className="border-stone-300 focus:border-primary"
                placeholder="35500"
                required
              />
            </div>

            <div>
              <Label htmlFor="nombreCentro" className="text-stone-700 mb-2 block">
                Nombre del Centro *
              </Label>
              <Input
                id="nombreCentro"
                value={userData.nombreCentro}
                onChange={(e) => setUserData({ ...userData, nombreCentro: e.target.value })}
                className="border-stone-300 focus:border-primary"
                placeholder="IES Lanzarote"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-stone-700 mb-2 block">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                className="border-stone-300 focus:border-primary"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="telefono" className="text-stone-700 mb-2 block">
                Teléfono *
              </Label>
              <Input
                id="telefono"
                type="tel"
                value={userData.telefono}
                onChange={(e) => setUserData({ ...userData, telefono: e.target.value })}
                className="border-stone-300 focus:border-primary"
                placeholder="600 123 456"
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowUserDataDialog(false)}
                className="border-stone-300"
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-stone-900 font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
