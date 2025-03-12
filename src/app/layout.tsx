import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Специализированные дисциплины',
  description: 'Программа обучения специализированным дисциплинам',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ru'>
      <head>
        <link rel='preload' href='/fonts/StyreneAWeb-Bold.woff2' as='font' type='font/woff2' crossOrigin='anonymous' />
        <link
          rel='preload'
          href='/fonts/StyreneAWeb-Regular.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
