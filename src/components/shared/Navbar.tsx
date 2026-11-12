'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import logo from '@/assets/skillora-logo-light.png'
import { authClient } from '@/lib/auth-client'

const navItems = [
  { label: 'Browse Jobs', href: '/jobs' },
  { label: 'Company', href: '/company' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Dashboard', href: '/dashboard' },
]

const authRoutes = {
  signIn: '/sign-in',
  signUp: '/sign-up',
}

const Navbar = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const { data: session, isPending } = authClient.useSession()
  const user = session?.user
  const initial = user?.name?.trim().charAt(0).toUpperCase() || '?'

  // Close mobile menu with Escape
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const handleLogout = async () => {
    setLoggingOut(true)
    const { error } = await authClient.signOut()
    setLoggingOut(false)

    if (error) {
      toast.error(error.message ?? 'Logout failed. Please try again.')
      return
    }

    setOpen(false)
    toast.success('Logged out successfully.')
    router.push('/')
    router.refresh()
  }

  return (
    <header className="w-full bg-black px-3 py-2 sm:px-6 sm:py-3 2xl:px-8 2xl:py-4">
      <nav className="relative mx-auto flex max-w-[90vw] items-center justify-between rounded-xl bg-[#222] px-4 py-2 sm:px-6 sm:py-2.5 2xl:max-w-[1650px] 2xl:px-9 2xl:py-3.5">
        {/* Logo */}
        <Link href="/" aria-label="Home">
          <Image
            src={logo}
            alt="Hireloop"
            width={1116}
            height={363}
            unoptimized
            className="h-7 w-auto sm:h-8 lg:h-9 2xl:h-12"
            preload
          />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-7 text-sm text-white lg:flex 2xl:gap-10 2xl:text-base">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-gray-300">
              {item.label}
            </Link>
          ))}

          <span className="h-6 w-px bg-gray-600 2xl:h-8" />

          {isPending ? (
            <span className="h-9 w-44 animate-pulse rounded-lg bg-white/5" />
          ) : user ? (
            <>
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5b4dff] text-sm font-semibold">
                  {initial}
                </span>
                <span className="max-w-[140px] truncate">{user.name}</span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="rounded-lg bg-[#5b4dff] px-5 py-2 font-medium hover:bg-[#4a3de0] disabled:cursor-not-allowed disabled:opacity-60 2xl:px-7 2xl:py-2.5"
              >
                {loggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </>
          ) : (
            <>
              <Link href={authRoutes.signIn} className="text-[#7c6cf0] hover:opacity-80">
                Sign In
              </Link>
              <Link
                href={authRoutes.signUp}
                className="rounded-lg bg-[#5b4dff] px-5 py-2 font-medium hover:bg-[#4a3de0] 2xl:px-7 2xl:py-2.5"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span className={`h-0.5 w-6 bg-white transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-white transition ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-white transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>

        {/* Mobile menu */}
        {open && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 flex flex-col gap-3 rounded-xl bg-[#222] p-5 text-sm text-white shadow-xl lg:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="hover:text-gray-300"
              >
                {item.label}
              </Link>
            ))}

            <hr className="border-gray-600" />

            {isPending ? (
              <span className="h-10 w-full animate-pulse rounded-lg bg-white/5" />
            ) : user ? (
              <>
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5b4dff] text-sm font-semibold">
                    {initial}
                  </span>
                  <span className="truncate">{user.name}</span>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="rounded-xl bg-[#5b4dff] px-6 py-3 font-medium hover:bg-[#4a3de0] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </>
            ) : (
              <>
                <Link
                  href={authRoutes.signIn}
                  onClick={() => setOpen(false)}
                  className="text-[#7c6cf0]"
                >
                  Sign In
                </Link>
                <Link
                  href={authRoutes.signUp}
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-[#5b4dff] px-6 py-3 text-center font-medium hover:bg-[#4a3de0]"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar