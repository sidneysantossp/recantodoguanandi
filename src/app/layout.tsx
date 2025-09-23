import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recanto do Guanandi - Plataforma de Gestão Financeira",
  description: "Sistema de gestão financeira para Associação Recanto do Guanandi",
  keywords: ["Recanto do Guanandi", "Finanças", "Gestão", "Associação"],
  authors: [{ name: "Associação Recanto do Guanandi" }],
  openGraph: {
    title: "Recanto do Guanandi - Plataforma de Gestão Financeira",
    description: "Sistema de gestão financeira para Associação Recanto do Guanandi",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
