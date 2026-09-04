import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Menu from "./part/menu/Menu";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
export const metadata: Metadata = {
  title: "BEN FRK",
  description: "Personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        <Menu/>
        <main>{children}</main>
      </body>
    </html>
  );
}
