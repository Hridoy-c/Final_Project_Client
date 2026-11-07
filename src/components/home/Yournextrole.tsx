import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ctaBg from '@/assets/cta-bg.png'

export const Yournextrole = () => {
  return (
    <section className="w-full bg-black py-6 sm:py-10">
      <div className="relative isolate mx-auto flex min-h-[420px] w-[90vw] items-center justify-center overflow-hidden rounded-2xl bg-black px-5 py-16 sm:min-h-[480px] sm:px-10 lg:min-h-[560px] lg:py-24">
        {/* Background image */}
        <Image
          src={ctaBg}
          alt=""
          fill
          sizes="90vw"
          className="-z-10 object-cover object-top"
        />

        {/* Fade the bottom edge into the page */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-black to-transparent"
        />

        {/* Content */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-medium leading-tight text-white sm:text-4xl lg:text-5xl">
            Your next role is already looking for you
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm text-gray-400 sm:text-base">
            Build a profile in three minutes. The matches start arriving tomorrow morning.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="w-full rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-gray-200 sm:w-auto"
            >
              Create a free account
            </Link>
            <Link
              href="/pricing"
              className="w-full rounded-lg border border-white/15 bg-black/40 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10 sm:w-auto"
            >
              View pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}