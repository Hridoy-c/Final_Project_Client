"use client";

import { Download } from "lucide-react";

export default function ExportPdfButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-black transition-colors hover:bg-gray-200 print:hidden"
    >
      <Download className="h-4 w-4" />
      Export PDF
    </button>
  );
}