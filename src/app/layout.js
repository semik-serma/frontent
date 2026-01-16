import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Footer from "@/components/Footer"
import ClientNavbar from "@/components/ClientNavbar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "SemikDev - Web Developer",
  description: "Modern web development services by Semik",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientNavbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
