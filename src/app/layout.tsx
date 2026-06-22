import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Parchunewala – Your Neighbourhood, Connected.",
  description:
    "Order from trusted local kirana stores near you. Choose your delivery slot. Support neighbourhood businesses. Parchunewala connects communities with local commerce.",
  keywords: "local shopping, neighbourhood commerce, kirana, slot delivery, hyperlocal",
  openGraph: {
    title: "Parchunewala – Your Neighbourhood, Connected.",
    description: "Order from trusted local kirana stores. Slot-based delivery. Support local.",
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
      <body className="min-h-full flex flex-col bg-[#030308] text-white">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
