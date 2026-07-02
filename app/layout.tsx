import type { Metadata } from "next";
import { Poppins, Caveat, Montserrat } from "next/font/google";
import "./globals.css";

const chronicaProFallback = Poppins({
  variable: "--font-chronica",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const owlCuteFallback = Caveat({
  variable: "--font-owl-cute",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const gothamFallback = Montserrat({
  variable: "--font-gotham",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Panadería y Pastelería Lilian",
  description: "Hecho con amor y horneado para ti.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${chronicaProFallback.variable} ${owlCuteFallback.variable} ${gothamFallback.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-gotham">{children}</body>
    </html>
  );
}

