import './globals.css'

export const metadata = {
  title: 'ERP Grupo Aralo',
  description: 'Sistema de Gestión Empresarial',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  )
}
