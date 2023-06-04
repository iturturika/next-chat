import './globals.css'
import { Oswald } from 'next/font/google'

const oswald = Oswald({ subsets: ['latin'], weight: ['300','400','700'] })

export const metadata = {
  title: 'Next Chat',
  description: 'First app on Next js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={oswald.className}>{children}</body>
    </html>
  )
}
