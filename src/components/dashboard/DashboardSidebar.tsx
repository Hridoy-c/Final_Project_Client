'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import type { LucideIcon } from 'lucide-react'
import {
  BadgePlusIcon,
  BookmarkIcon,
  BriefcaseIcon,
  Building2Icon,
  FileTextIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  SettingsIcon,
  UsersIcon,
  WalletIcon,
} from 'lucide-react'

import logo from '@/assets/skillora-logo-light.png'
import { authClient } from '@/lib/auth-client'
import { cn } from '@/lib/utils'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'

type Role = 'seeker' | 'recruiter' | 'admin'

type MenuItem = {
  label: string
  href: string
  icon: LucideIcon
  exact?: boolean
}

const menuItemsByRole: Record<Role, MenuItem[]> = {
  seeker: [
    { label: 'Dashboard', href: '/dashboard/seeker', icon: LayoutDashboardIcon, exact: true },
    { label: 'Jobs', href: '/dashboard/seeker/jobs', icon: BriefcaseIcon },
    { label: 'Saved Jobs', href: '/dashboard/seeker/saved-jobs', icon: BookmarkIcon },
    { label: 'Applications', href: '/dashboard/seeker/applications', icon: FileTextIcon },
    { label: 'Billing', href: '/dashboard/seeker/billing', icon: WalletIcon },
    { label: 'Settings', href: '/dashboard/seeker/settings', icon: SettingsIcon },
  ],
  recruiter: [
    { label: 'Dashboard', href: '/dashboard/recruiter', icon: LayoutDashboardIcon, exact: true },
    { label: 'Add Job', href: '/dashboard/recruiter/add-job', icon: BadgePlusIcon },
    { label: 'Manage Jobs', href: '/dashboard/recruiter/jobs', icon: BriefcaseIcon },
    { label: 'Applications', href: '/dashboard/recruiter/applications', icon: FileTextIcon },
    { label: 'Settings', href: '/dashboard/recruiter/settings', icon: SettingsIcon },
  ],
  admin: [
    { label: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboardIcon, exact: true },
    { label: 'Users', href: '/dashboard/admin/users', icon: UsersIcon },
    { label: 'Companies', href: '/dashboard/admin/companies', icon: Building2Icon },
    { label: 'Jobs', href: '/dashboard/admin/jobs', icon: BriefcaseIcon },
    { label: 'Payments', href: '/dashboard/admin/payments', icon: WalletIcon },
    { label: 'Settings', href: '/dashboard/admin/settings', icon: SettingsIcon },
  ],
}

const itemClass =
  'relative h-10 rounded-lg pl-3 pr-2 text-[#8e8e96] hover:bg-white/[0.04] hover:text-white'

const activeItemClass =
  'bg-white/[0.06] text-white before:absolute before:left-0 before:top-1/2 before:h-5 before:w-[3px] before:-translate-y-1/2 before:rounded-full before:bg-[#7c6cf0] group-data-[collapsible=icon]:before:hidden'

const DashboardSidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { setOpenMobile } = useSidebar()
  const [loggingOut, setLoggingOut] = useState(false)

  const { data: session } = authClient.useSession()
  const user = session?.user
  const initial = user?.name?.trim().charAt(0).toUpperCase() || '?'

  const role = (user?.role as Role) ?? 'seeker'
  const items = menuItemsByRole[role] ?? menuItemsByRole.seeker

  const isActive = (item: MenuItem) =>
    item.exact
      ? pathname === item.href
      : pathname === item.href || pathname.startsWith(`${item.href}/`)

  const handleLogout = async () => {
    setLoggingOut(true)
    const { error } = await authClient.signOut()
    setLoggingOut(false)

    if (error) {
      toast.error(error.message ?? 'Logout failed. Please try again.')
      return
    }

    toast.success('Logged out successfully.')
    router.push('/')
    router.refresh()
  }

  return (
    <Sidebar collapsible="icon" className="border-white/[0.06]">
      {/* Wrapper gives the mobile sheet the same dark panel as desktop */}
      <div className="flex h-full min-h-0 w-full flex-col bg-[#0b0b0e]">
        {/* Logo */}
        <SidebarHeader className="gap-0 px-2 py-3">
          <Link
            href="/"
            aria-label="Home"
            className="px-1 group-data-[collapsible=icon]:hidden"
          >
            <Image
              src={logo}
              alt="Hireloop"
              width={1116}
              height={363}
              unoptimized
              className="h-8 w-auto"
            />
          </Link>
          <Link
            href="/"
            aria-label="Home"
            className="mx-auto hidden h-8 w-8 items-center justify-center rounded-lg bg-[#5b4dff] text-sm font-semibold text-white group-data-[collapsible=icon]:flex"
          >
            H
          </Link>
          <div className="mt-3 h-px bg-white/[0.06] group-data-[collapsible=icon]:hidden" aria-hidden />
        </SidebarHeader>

        <SidebarContent className="px-2 group-data-[collapsible=icon]:px-0">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {items.map((item) => {
                  const active = isActive(item)

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        render={
                          <Link
                            href={item.href}
                            onClick={() => setOpenMobile(false)}
                            aria-current={active ? 'page' : undefined}
                          />
                        }
                        tooltip={item.label}
                        className={cn(itemClass, active && activeItemClass)}
                      >
                        <item.icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* User + logout */}
        <SidebarFooter className="gap-2 border-t border-white/[0.06] p-2 group-data-[collapsible=icon]:p-1">
          <div className="flex items-center gap-2.5 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] p-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:border-0 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-0">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#5b4dff] text-sm font-semibold text-white ring-2 ring-[#5b4dff]/25 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8">
              {initial}
            </span>
            <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
              <p className="truncate text-sm text-white">{user?.name ?? 'Guest'}</p>
              <p className="truncate text-xs capitalize text-[#6b6b73]">
                {user ? role : 'Not signed in'}
              </p>
            </div>
          </div>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                disabled={loggingOut}
                tooltip="Logout"
                className="h-10 rounded-xl text-[#8a7dff] hover:bg-[#5b4dff]/10 hover:text-[#a99fff]"
              >
                <LogOutIcon />
                <span>{loggingOut ? 'Logging out...' : 'Logout'}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </div>

      <SidebarRail />
    </Sidebar>
  )
}

export default DashboardSidebar
