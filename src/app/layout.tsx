import './globals.css'
import { Providers } from '@/store'
export const metadata = { title: 'Interactive Dashboard', description: 'Next 14 + Redux + Charts' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
