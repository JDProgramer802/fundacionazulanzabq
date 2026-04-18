import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  title: {
    template: "%s | Fundación Azulanza",
    default: "Fundación Azulanza | Salud Mental y Apoyo Comunitario",
  },
  description: "Fundación Azulanza brinda asistencia integral en salud mental, seguridad alimentaria y desarrollo comunitario en Colombia.",
  keywords: ["fundación", "salud mental", "asesoría psicológica", "ayuda comunitaria", "donaciones", "voluntariado", "apoyo emocional", "Colombia"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={cn(inter.variable, jakarta.variable, "font-body antialiased")}>
        {children}
      </body>
    </html>
  );
}
