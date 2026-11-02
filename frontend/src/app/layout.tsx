import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Makeup, Skincare, Fragrance, Hair & Beauty Products | Sephora",
  description:
    "Discover beauty that fits you. Explore makeup, skincare, fragrance, hair care, and beauty products from top brands like Fenty Beauty, Rare Beauty, Charlotte Tilbury, and Sephora Collection.",
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
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-white text-black font-sans">
        {children}
      </body>
    </html>
  );
}
