import React from 'react'

import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

const DashboardPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <SidebarInset className="min-w-0 bg-black text-white">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-white/10 bg-black/80 px-4 backdrop-blur-md sm:px-6">
          <SidebarTrigger className="text-gray-300 hover:bg-white/10 hover:text-white" />
          <span className="h-5 w-px bg-white/10" aria-hidden />
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-gray-300">
            <span className="h-1.5 w-1.5 bg-[#5b4dff]" />
            Dashboard
          </p>
        </header>

        <div className="flex-1 p-4 sm:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardPageLayout