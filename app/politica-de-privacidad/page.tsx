export default function PoliticaPrivacidad() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-8">
          <a
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Volver al inicio
          </a>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-balance">Política de Privacidad</h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <p className="text-muted-foreground leading-relaxed">
              De conformidad con lo dispuesto en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo (RGPD)
              y la Ley Orgánica 3/2018 (LOPDGDD), se informa a los usuarios sobre el tratamiento de sus datos
              personales:
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Responsable del tratamiento</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>
                <strong className="text-foreground">Titular:</strong> Infobermeja Producciones
              </p>
              <p>
                <strong className="text-foreground">CIF:</strong> B75522110
              </p>
              <p>
                <strong className="text-foreground">Domicilio:</strong> Calle Bebederos, Nº22, Arrieta, 35542 Haría -
                Las Palmas
              </p>
              <p>
                <strong className="text-foreground">Correo electrónico:</strong>{" "}
                <a href="mailto:infobermejaproducciones@gmail.com" className="text-primary hover:underline">
                  infobermejaproducciones@gmail.com
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Finalidad del tratamiento</h2>
            <p className="text-muted-foreground leading-relaxed">
              Los datos personales recogidos a través del formulario de contacto se utilizan exclusivamente para
              gestionar las solicitudes de información y los encargos relacionados con la organización de orlas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Legitimación</h2>
            <p className="text-muted-foreground leading-relaxed">
              La base legal para el tratamiento de datos es el consentimiento otorgado por el usuario al marcar la
              casilla de aceptación antes de enviar el formulario.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Conservación de datos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Los datos se conservarán mientras se mantenga la relación comercial y, posteriormente, durante los plazos
              exigidos por la legislación vigente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Destinatarios</h2>
            <p className="text-muted-foreground leading-relaxed">
              No se cederán datos a terceros salvo obligación legal o cuando sea necesario para la prestación del
              servicio (por ejemplo, proveedores tecnológicos de hosting o correo).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Derechos de los usuarios</h2>
            <p className="text-muted-foreground leading-relaxed">
              El usuario puede ejercer en cualquier momento sus derechos de acceso, rectificación, supresión, oposición,
              limitación y portabilidad mediante escrito a{" "}
              <a href="mailto:infobermejaproducciones@gmail.com" className="text-primary hover:underline">
                infobermejaproducciones@gmail.com
              </a>
              , adjuntando copia de un documento acreditativo de identidad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Medidas de seguridad</h2>
            <p className="text-muted-foreground leading-relaxed">
              Infobermeja Producciones ha adoptado las medidas técnicas y organizativas necesarias para garantizar la
              seguridad y confidencialidad de los datos personales tratados.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
