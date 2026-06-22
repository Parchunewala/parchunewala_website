import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Parchunewala – Your Area. Your Stores. Your App.",
  description:
    "Neighborhood commerce platform connecting customers with trusted local shops. Order groceries, essentials, cosmetics, stationery & more from stores near you.",
  keywords: "local shopping, quick commerce, kirana, neighborhood stores, delivery",
  openGraph: {
    title: "Parchunewala",
    description: "Your Area. Your Stores. Your App.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">{children}</body>
    </html>
  );
}
