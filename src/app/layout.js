import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import dynamic from "next/dynamic"
import Footer from "@/components/Footer"

// 👇 Load Navbar on client only
const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false,
})

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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
