import type { Metadata } from "next";
import { Geist_Mono, Josefin_Sans, Geist } from "next/font/google";
import { Navbar } from "@/components/shared/navbar";
import "./globals.css";
import Footer from "@/components/shared/Footer";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
      className={cn("h-full", "antialiased", josefinSans.variable, geistMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer/>  
      </body>
    </html>
  );
}
