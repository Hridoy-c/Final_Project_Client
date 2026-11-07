import type { Metadata } from "next";
import { Geist_Mono, Josefin_Sans } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import "./globals.css";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "hireloop — Where Skills Meet Opportunities",
  description:
    "hireloop connects skilled people with the companies that need them. Browse jobs, explore companies, and start your next opportunity.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${josefinSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
