import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AvisoLegal() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-8 text-foreground">Aviso Legal</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Titular de la web</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio,
              de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se informa que la
              presente página web es propiedad de:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <strong className="text-foreground">Razón social / Nombre comercial:</strong> Bermeja Producciones
              </li>
              <li>
                <strong className="text-foreground">CIF:</strong> B75522110
              </li>
              <li>
                <strong className="text-foreground">Domicilio social:</strong> Calle Bebederos, Nº22, Arrieta, 35542
                Haría - Las Palmas
              </li>
              <li>
                <strong className="text-foreground">Correo electrónico de contacto:</strong>{" "}
                <a href="mailto:infobermejaproducciones@gmail.com" className="text-primary hover:underline">
                  infobermejaproducciones@gmail.com
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Condiciones de uso</h2>
            <p className="text-muted-foreground leading-relaxed">
              El acceso y uso de esta página web atribuye la condición de usuario e implica la aceptación plena de las
              presentes condiciones. El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que
              se ofrecen, no empleándolos para actividades ilícitas, ilegales o contrarias a la buena fe y al orden
              público.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Responsabilidad</h2>
            <p className="text-muted-foreground leading-relaxed">
              El titular no se hace responsable de los daños que pudieran derivarse del uso indebido de esta página web
              ni de la información contenida en ella.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Propiedad intelectual e industrial</h2>
            <p className="text-muted-foreground leading-relaxed">
              Los contenidos de esta web (textos, imágenes, logotipos, etc.) son propiedad de Bermeja Producciones o
              de sus legítimos titulares, quedando prohibida su reproducción, distribución o modificación sin
              autorización expresa.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
