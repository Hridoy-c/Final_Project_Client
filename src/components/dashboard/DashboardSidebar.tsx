'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  BriefcaseBusinessIcon,
  HomeIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  ShieldCheckIcon,
  UserSearchIcon,
} from 'lucide-react'

import logo from '@/assets/skillora-logo-light.png'
import { authClient } from '@/lib/auth-client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'

const mainItems = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboardIcon },
  { label: 'Job Seeker', href: '/dashboard/seeker', icon: UserSearchIcon },
  { label: 'Recruiter', href: '/dashboard/recruiter', icon: BriefcaseBusinessIcon },
  { label: 'Admin', href: '/dashboard/admin', icon: ShieldCheckIcon },
]

const itemClass =
  'h-10 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white data-active:bg-[#5b4dff] data-active:font-medium data-active:text-white data-active:hover:bg-[#4a3de0]'

const DashboardSidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { setOpenMobile } = useSidebar()
  const [loggingOut, setLoggingOut] = useState(false)

  const { data: session } = authClient.useSession()
  const user = session?.user
  const initial = user?.name?.trim().charAt(0).toUpperCase() || '?'

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === href : pathname.startsWith(href)

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
    <Sidebar collapsible="icon" className="border-white/10">
      {/* Logo */}
      <SidebarHeader className="px-3 py-4">
        <Link href="/" aria-label="Home" className="px-1 group-data-[collapsible=icon]:hidden">
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
          className="hidden h-8 w-8 items-center justify-center rounded-lg bg-[#5b4dff] text-sm font-semibold text-white group-data-[collapsible=icon]:flex"
        >
          H
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="font-mono text-[11px] uppercase tracking-widest text-gray-500">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={<Link href={item.href} onClick={() => setOpenMobile(false)} />}
                    isActive={isActive(item.href)}
                    tooltip={item.label}
                    className={itemClass}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="font-mono text-[11px] uppercase tracking-widest text-gray-500">
            General
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/" onClick={() => setOpenMobile(false)} />}
                  tooltip="Back to home"
                  className={itemClass}
                >
                  <HomeIcon />
                  <span>Back to home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User + logout */}
      <SidebarFooter className="border-t border-white/10 p-3">
        <div className="flex items-center gap-2.5 overflow-hidden group-data-[collapsible=icon]:justify-center">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#5b4dff] text-sm font-semibold text-white">
            {initial}
          </span>
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm text-white">{user?.name ?? 'Guest'}</p>
            <p className="truncate text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              disabled={loggingOut}
              tooltip="Logout"
              className="h-10 rounded-lg text-[#7c6cf0] hover:bg-[#5b4dff]/10 hover:text-[#8a7dff]"
            >
              <LogOutIcon />
              <span>{loggingOut ? 'Logging out...' : 'Logout'}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

export default DashboardSidebar