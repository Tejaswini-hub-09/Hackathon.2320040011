import Link from "next/link"
import type React from "react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-indigo-600 p-4 text-white">
        <nav className="container mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="text-2xl font-bold">
            MoodMentor
          </Link>
          <Link href="/" className="text-sm">
            Logout
          </Link>
        </nav>
      </header>
      <main className="flex-1 bg-gray-100">{children}</main>
    </div>
  )
}

