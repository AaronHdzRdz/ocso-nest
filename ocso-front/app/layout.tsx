import type { Metadata } from "next";
import "./globals.css";
import Providers from "../providers";


export const metadata: Metadata = {
  title: "Ocso",
  description: "Pagina web de administracion de Ocsos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

