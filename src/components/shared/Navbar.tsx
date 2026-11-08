'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/assets/skillora-logo-light.png'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="w-full px-3 py-2 sm:px-6 sm:py-3 2xl:px-8 2xl:py-4 min-[2560px]:px-12 min-[2560px]:py-5">
      <nav className="relative mx-auto flex max-w-[90vw] items-center justify-between rounded-xl bg-[#222] px-4 py-2 sm:px-6 sm:py-2.5 2xl:max-w-[1650px] 2xl:px-9 2xl:py-3.5 min-[2560px]:max-w-[2000px] min-[2560px]:px-11 min-[2560px]:py-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src={logo}
            alt="Hireloop"
            width={1116}
            height={363}
            unoptimized
            className="h-7 w-auto sm:h-8 lg:h-9 2xl:h-12 min-[2560px]:h-14 min-[3840px]:h-16"
            preload
          />
        </Link>

        {/* Desktop links + actions */}
        <div className="hidden items-center gap-7 text-sm text-white lg:flex 2xl:gap-10 2xl:text-base min-[2560px]:gap-12 min-[2560px]:text-lg">
          <Link href="/jobs" className="hover:text-gray-300">Browse Jobs</Link>
          <Link href="/company" className="hover:text-gray-300">Company</Link>
          <Link href="/pricing" className="hover:text-gray-300">Pricing</Link>

          <span className="h-6 w-px bg-gray-600 2xl:h-8" />

          <Link href="/sign-in" className="text-[#7c6cf0] hover:opacity-80">Sign In</Link>

          <Link
            href="/sign-up"
            className="rounded-lg bg-[#5b4dff] px-5 py-2 font-medium text-white hover:bg-[#4a3de0] 2xl:px-7 2xl:py-2.5 min-[2560px]:px-8 min-[2560px]:py-3"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
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
            <Link href="/jobs" onClick={() => setOpen(false)}>Browse Jobs</Link>
            <Link href="/company" onClick={() => setOpen(false)}>Company</Link>
            <Link href="/pricing" onClick={() => setOpen(false)}>Pricing</Link>

            <hr className="border-gray-600" />

            <Link href="/sign-in" onClick={() => setOpen(false)} className="text-[#7c6cf0]">
              Sign In
            </Link>
            <Link
              href="/sign-up"
              onClick={() => setOpen(false)}
              className="rounded-xl bg-[#5b4dff] px-6 py-3 text-center font-medium"
            >
              Get Started
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar