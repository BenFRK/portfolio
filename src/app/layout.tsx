import type { Metadata } from "next";
import "./globals.css";
import Menu from "./part/menu/Menu";
export const metadata: Metadata = {
  title: "BEN FRK",
  description: "Personnal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Menu/>
        <main>{children}</main>
      </body>
    </html>
  );
}
