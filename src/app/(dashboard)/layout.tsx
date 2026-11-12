import React from 'react'
import Link from 'next/link'

import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

const DashboardPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider defaultOpen={false} className="dark">
      <DashboardSidebar />

      <SidebarInset className="min-w-0 overflow-x-hidden bg-[#08080a] text-white">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-white/[0.06] bg-[#08080a]/85 px-4 backdrop-blur-xl sm:h-16 sm:px-6 lg:px-8">
          <SidebarTrigger className="shrink-0 text-[#a1a1aa] hover:bg-[#5b4dff]/10 hover:text-white" />

          <span className="h-5 w-px shrink-0 bg-white/10" aria-hidden />

          <p className="flex min-w-0 items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#a1a1aa]">
            <span className="h-1.5 w-1.5 shrink-0 bg-[#5b4dff]" aria-hidden />
            <span className="truncate">Dashboard</span>
          </p>

          <span className="hidden text-xs text-[#6b6b73] sm:inline">Hireloop workspace</span>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/"
              className="hidden rounded-lg border border-white/[0.06] px-3 py-1.5 text-xs text-[#a1a1aa] transition-colors hover:border-white/15 hover:text-white sm:inline-flex"
            >
              Back to site
            </Link>
          </div>
        </header>

        <div className="mx-auto w-full max-w-[1400px] flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardPageLayout
