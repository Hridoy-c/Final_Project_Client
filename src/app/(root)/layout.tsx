import Navbar from "@/components/shared/Navbar";
import React from "react";

const RootsPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0a0c]/80 backdrop-blur-xl">
        <Navbar />
      </header>

      {children}
    </div>
  );
};

export default RootsPageLayout;