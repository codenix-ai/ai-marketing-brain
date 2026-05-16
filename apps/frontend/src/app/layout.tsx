import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Marketing Brain",
  description: "Motor de contenido de marketing potenciado por Claude API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gray-50 font-sans">
        <nav className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="font-bold text-xl text-indigo-600">
              🧠 AI Marketing Brain
            </Link>
            <div className="flex gap-6 text-sm font-medium text-gray-600">
              <Link href="/" className="hover:text-indigo-600 transition-colors">
                Dashboard
              </Link>
              <Link href="/brain" className="hover:text-indigo-600 transition-colors">
                Cerebros
              </Link>
              <Link href="/generate" className="hover:text-indigo-600 transition-colors">
                Generar
              </Link>
              <Link href="/history" className="hover:text-indigo-600 transition-colors">
                Historial
              </Link>
            </div>
          </div>
        </nav>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
