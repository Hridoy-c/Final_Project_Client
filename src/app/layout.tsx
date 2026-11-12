import type { Metadata } from "next";
import { Geist_Mono, Josefin_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
      suppressHydrationWarning
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        josefinSans.variable,
        geistMono.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        
        <main className="flex-1">{children}</main>
       
        <Toaster
          position="top-center"
          theme="dark"
          toastOptions={{
            classNames: {
              toast:
                "bg-[#161616]! text-white! border! border-white/10! rounded-xl!",
              description: "text-gray-400!",
              success: "border-[#5b4dff]/60!",
              error: "border-red-500/60!",
              icon: "text-[#7c6cf0]!",
            },
          }}
        />
      </body>
    </html>
  );
}
