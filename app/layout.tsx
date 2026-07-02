import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const chronicaPro = localFont({
  variable: "--chronica-pro",
  display: "swap",
  src: [
    {
      path: "../public/fonts/Chronica Pro Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/Chronica Pro Thin Italic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/fonts/Chronica Pro Ultra Light.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/Chronica Pro Ultra Light Italic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/fonts/Chronica Pro Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Chronica Pro Light Italic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/Chronica Pro Book.ttf",
      weight: "350",
      style: "normal",
    },
    {
      path: "../public/fonts/Chronica Pro Book Italic.ttf",
      weight: "350",
      style: "italic",
    },
    {
      path: "../public/fonts/Chronica Pro Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Chronica Pro Regular Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Chronica Pro Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Chronica Pro Medium Italic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/Chronica Pro Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Chronica Pro Bold Italic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/Chronica Pro Black.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/Chronica Pro Black Italic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../public/fonts/Chronica Pro Heavy.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/Chronica Pro Heavy Italic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
});

const owlCute = localFont({
  variable: "--owl-cute",
  display: "swap",
  src: [
    {
      path: "../public/fonts/Owl Cute Regular 400.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

const gothamFallback = Montserrat({
  variable: "--gotham",
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
      className={`${chronicaPro.variable} ${owlCute.variable} ${gothamFallback.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-gotham">{children}</body>
    </html>
  );
}

