import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, Users, Music, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-foreground">OrlasFest</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#inicio" className="text-muted-foreground hover:text-foreground transition-colors">
                Inicio
              </a>
              <a href="#servicios" className="text-muted-foreground hover:text-foreground transition-colors">
                Servicios
              </a>
              <a href="#contacto" className="text-muted-foreground hover:text-foreground transition-colors">
                Contacto
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Video */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop className="w-full h-full object-cover" poster="/graduation-party-celebration-students-dancing.jpg">
            <source src="/graduation-party-celebration-students-dancing.jpg" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">¡Celebra tu Graduación!</h1>
          <p className="text-xl md:text-2xl mb-8 text-balance opacity-90">
            Organiza la orla perfecta para tu instituto. Fácil, rápido y memorable.
          </p>
          <Link href="/configurar">
            <Button size="lg" className="text-lg px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground">
              Organizar mi Orla
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Todo lo que necesitas para tu orla</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Desde la elección del lugar hasta la música, nos encargamos de todos los detalles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-card rounded-lg border border-border">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lugares Perfectos</h3>
              <p className="text-muted-foreground">Espacios grandes y pequeños adaptados al número de invitados</p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg border border-border">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">DJ Profesional</h3>
              <p className="text-muted-foreground">Música perfecta para tu celebración o trae tu propia playlist</p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg border border-border">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cotillón Incluido</h3>
              <p className="text-muted-foreground">Accesorios divertidos para hacer tu orla más especial</p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg border border-border">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fácil Organización</h3>
              <p className="text-muted-foreground">Configura todo en minutos con nuestro sistema intuitivo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">OrlasFest</span>
              </div>
              <p className="text-muted-foreground">
                Hacemos que tu graduación sea inolvidable con la mejor organización de orlas.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Organización de orlas</li>
                <li>Alquiler de espacios</li>
                <li>DJ y música</li>
                <li>Cotillón y decoración</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>📧 orlas@orlas.com</li>
                <li>📱 +34 600 123 456</li>
                <li>📍 Lanzarote</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 OrlasFest. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
