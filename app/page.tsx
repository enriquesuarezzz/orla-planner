import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, Users, Music, Sparkles } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white/95 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.JPG-XEz8AUmiQA7QGhv1xMP1zVsO7JHj9a.jpeg"
                alt="Orlas Lanzarote Logo"
                width={200}
                height={70}
                className="h-14 w-auto"
                priority
              />
            </div>
            <div className="hidden md:flex items-center space-x-10">
              <a
                href="#inicio"
                className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-medium tracking-wide"
              >
                Inicio
              </a>
              <a
                href="#servicios"
                className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-medium tracking-wide"
              >
                Servicios
              </a>
              <a
                href="#contacto"
                className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-medium tracking-wide"
              >
                Contacto
              </a>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home-xgeoHdnsfTmNyGHRturxGPkLCCpVm7.jpg"
            alt="Orlas Lanzarote"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <Link href="/configurar">
            <Button
              size="lg"
              className="text-base px-12 py-7 bg-primary hover:bg-primary/90 text-stone-900 font-medium tracking-wide transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              Organizar mi Orla
            </Button>
          </Link>
        </div>
      </section>

      <section id="servicios" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-serif font-light text-stone-900 mb-6 text-balance tracking-tight">
              Todo lo que necesitas
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed font-light">
              Desde la elección del lugar hasta la música, nos encargamos de cada detalle
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center p-10 bg-stone-50 hover:bg-white border border-stone-200 hover:border-primary/30 transition-all duration-500 hover:shadow-xl">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-4 text-stone-900 tracking-wide">Lugares Perfectos</h3>
              <p className="text-stone-600 leading-relaxed text-sm">Espacios adaptados al número de invitados</p>
            </div>

            <div className="group text-center p-10 bg-stone-50 hover:bg-white border border-stone-200 hover:border-primary/30 transition-all duration-500 hover:shadow-xl">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
                <Music className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-4 text-stone-900 tracking-wide">DJ Profesional</h3>
              <p className="text-stone-600 leading-relaxed text-sm">Música perfecta o trae tu propia playlist</p>
            </div>

            <div className="group text-center p-10 bg-stone-50 hover:bg-white border border-stone-200 hover:border-primary/30 transition-all duration-500 hover:shadow-xl">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-4 text-stone-900 tracking-wide">Cotillón Incluido</h3>
              <p className="text-stone-600 leading-relaxed text-sm">Accesorios para hacer tu orla especial</p>
            </div>

            <div className="group text-center p-10 bg-stone-50 hover:bg-white border border-stone-200 hover:border-primary/30 transition-all duration-500 hover:shadow-xl">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-4 text-stone-900 tracking-wide">Fácil Organización</h3>
              <p className="text-stone-600 leading-relaxed text-sm">Configura todo en minutos</p>
            </div>
          </div>
        </div>
      </section>

      <footer id="contacto" className="bg-stone-900 text-stone-300 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-16">
            <div>
              <div className="mb-8">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.JPG-XEz8AUmiQA7QGhv1xMP1zVsO7JHj9a.jpeg"
                  alt="Orlas Lanzarote Logo"
                  width={180}
                  height={60}
                  className="h-12 w-auto brightness-0 invert opacity-90"
                />
              </div>
              <p className="text-stone-400 leading-relaxed text-sm">
                Hacemos que tu graduación sea inolvidable con la mejor organización de orlas en Lanzarote.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-6 text-white text-sm tracking-wider uppercase">Servicios</h4>
              <ul className="space-y-3 text-stone-400 text-sm">
                <li>
                  <Link href="/configurar" className="hover:text-primary transition-colors cursor-pointer">
                    Organización de orlas
                  </Link>
                </li>
                <li>
                  <Link href="/configurar" className="hover:text-primary transition-colors cursor-pointer">
                    Alquiler de espacios
                  </Link>
                </li>
                <li>
                  <Link href="/configurar" className="hover:text-primary transition-colors cursor-pointer">
                    DJ y música
                  </Link>
                </li>
                <li>
                  <Link href="/configurar" className="hover:text-primary transition-colors cursor-pointer">
                    Cotillón y decoración
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-6 text-white text-sm tracking-wider uppercase">Contacto</h4>
              <ul className="space-y-3 text-stone-400 text-sm">
                <li className="hover:text-primary transition-colors">
                  <a href="mailto:bermejaproducciones@gmail.com">bermejaproducciones@gmail.com</a>
                </li>
                <li>Calle Bebederos, Nº22 Arrieta</li>
                <li>35542 Haría - Las Palmas</li>
                <li className="text-xs mt-4 text-stone-500">CIF: B75522110</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-stone-800 mt-16 pt-8 text-center text-stone-500 text-sm">
            <p>&copy; 2025 Bermeja Producciones S.L. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
