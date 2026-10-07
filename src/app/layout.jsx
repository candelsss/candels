import Script from 'next/script'
import PageTransition from '@/components/page-transition/PageTransition'
import { ThemeProvider } from '@/components/theme-provider/ThemeProvider'
import './globals.css'

// Aplica el tema guardado (o el del sistema) antes de que React hidrate, para evitar parpadeos.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`

export const metadata = {
  title: 'candels - Diseño UX/UI | Desarrollo web Freelance',
  description: 'Diseñadora UX/UI y desarrolladora web freelance. Te ayudo a crear una web atractiva, funcional y pensada para convertir.',
  icons: {
    icon: [
      { url: '/img/ICONO.svg', type: 'image/svg+xml' },
      { url: '/img/ICONO.png', sizes: '32x32', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'candels - Diseño UX/UI | Diseño web',
    description: 'Webs bonitas y rápidas, totalmente personalizadas.',
    url: 'https://www.candddela.es',
    type: 'website',
    images: [{ url: 'https://www.candddela.es/img/LOGO-CANDELS-SHARE.png', width: 1200, height: 630 }],
  },
  other: {
    google: 'notranslate',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider>
          <div translate="no">
            <PageTransition>{children}</PageTransition>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
