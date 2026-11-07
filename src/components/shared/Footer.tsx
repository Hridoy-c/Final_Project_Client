import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/assets/skillora-logo-light.png'

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Job discovery', href: '/jobs' },
      { label: 'Worker AI', href: '/worker-ai' },
      { label: 'Companies', href: '/company' },
      { label: 'Salary data', href: '/salary' },
    ],
  },
  {
    title: 'Navigations',
    links: [
      { label: 'Help center', href: '/help' },
      { label: 'Career library', href: '/library' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Brand Guideline', href: '/brand' },
      { label: 'Newsroom', href: '/news' },
    ],
  },
]

const socials = [
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <path d="M14 8h2.5V4.5H14C11.8 4.5 10 6.3 10 8.5V10.5H7.5V14H10v6h3.5v-6h2.4l.6-3.5h-3V8.7c0-.4.3-.7.5-.7Z" />
    ),
  },
  {
    name: 'Pinterest',
    href: '#',
    icon: (
      <path d="M12 3a8.5 8.5 0 0 0-3.1 16.4c-.1-.7-.1-1.7 0-2.4l1-4.2s-.3-.5-.3-1.3c0-1.2.7-2.1 1.6-2.1.7 0 1.1.6 1.1 1.2 0 .8-.5 1.9-.7 2.9-.2.9.4 1.600 1.300 1.600 1.600 0 2.800-1.700 2.800-4.100 0-2.200-1.600-3.700-3.800-3.700-2.600 0-4.100 1.900-4.100 3.900 0 .8.300 1.600.7 2.100.1.100.1.200.1.300l-.3 1c0 .2-.1.200-.3.100-1.100-.5-1.800-2.200-1.800-3.500 0-2.800 2-5.400 5.900-5.400 3.100 0 5.500 2.200 5.500 5.200 0 3.100-1.900 5.600-4.700 5.600-.9 0-1.800-.5-2.100-1l-.6 2.200c-.2.800-.8 1.800-1.200 2.400A8.500 8.500 0 1 0 12 3Z" />
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <path d="M6.5 9.5h2.8V19H6.5V9.5ZM7.9 5a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.200ZM11 9.500h2.700v1.300c.4-.8 1.400-1.500 2.800-1.500 2.800 0 3.300 1.800 3.300 4.200V19H17v-4.900c0-1.200 0-2.600-1.600-2.600s-1.800 1.200-1.800 2.500V19H11V9.500Z" />
    ),
  },
]

const Footer = () => {
  return (
   <footer className="w-full bg-black">
  <div className="mx-auto w-[90vw] py-10 sm:py-12">
        {/* Top */}
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          {/* Brand */}
          <div className="max-w-[260px]">
            <Link href="/">
              <Image
                src={logo}
                alt="Hireloop"
                width={1116}
                height={363}
                unoptimized
                className="h-8 w-auto sm:h-9"
              />
            </Link>
            <p className="mt-5 text-xs leading-relaxed text-gray-500 sm:text-sm">
              The AI-native career platform. Built for people who take their work seriously.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12 lg:gap-16">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-medium text-[#5b4dff]">{col.title}</h4>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs text-gray-500 transition hover:text-white sm:text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-6 sm:mt-16 md:flex-row md:items-center md:justify-between">
          {/* Socials */}
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <Link
                key={s.name}
                href={s.href}
                aria-label={s.name}
                className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1a1a1a] text-gray-400 transition hover:bg-[#5b4dff] hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  {s.icon}
                </svg>
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-2 text-xs text-gray-500 sm:flex-row sm:items-center sm:gap-6">
            <p>Copyright 2024 — Programming Hero</p>
            <p className="text-gray-300">
              <Link href="/terms" className="hover:text-white">Terms &amp; Policy</Link>
              {' - '}
              <Link href="/privacy" className="hover:text-white">Privacy Guideline</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer