'use client'

import React, { useState } from 'react'

type Plan = {
  name: string
  price: number
  intro: string
  features: string[]
  icon: React.ReactNode
  highlight?: boolean
}

const iconProps = {
  viewBox: '0 0 24 24',
  className: 'h-4 w-4 text-[#e9b6ff]',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

const plans: Plan[] = [
  {
    name: 'Starter',
    price: 0,
    intro: 'Start building your insights hub:',
    features: [
      'Daily AI match brief (top 5)',
      'Verified salary bands',
      'Company insight dashboards',
      '1-click apply, unlimited',
    ],
    icon: (
      <svg {...iconProps}>
        <path d="m3 8 4 4 5-7 5 7 4-4-2 11H5L3 8Z" />
      </svg>
    ),
  },
  {
    name: 'Growth',
    price: 17,
    intro: 'Start building your insights hub:',
    features: [
      'Daily AI match brief (top 5)',
      'Verified salary bands',
      'Company insight dashboards',
      '1-click apply, unlimited',
    ],
    highlight: true,
    icon: (
      <svg {...iconProps}>
        <path d="M5 20v-5M10 20v-8M15 20v-6M20 20V6" />
        <path d="m4 10 5-4 4 2 6-4" />
      </svg>
    ),
  },
  {
    name: 'Premium',
    price: 99,
    intro: 'Start building your insights hub:',
    features: [
      'Everything in Pro',
      'Multi-profile career portfolios',
      'Shared talent rooms',
      'Recruiter view (read-only)',
    ],
    icon: (
      <svg {...iconProps}>
        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
      </svg>
    ),
  },
]

const PlusIcon = () => (
  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[#2a2a2a]">
    <svg viewBox="0 0 24 24" className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  </span>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const YEARLY_DISCOUNT = 0.25

export const Pricing = () => {
  const [yearly, setYearly] = useState(false)

  const getPrice = (price: number) =>
    yearly ? Math.round(price * (1 - YEARLY_DISCOUNT)) : price

  return (
    <section className="w-full bg-black px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center">
          <p className="mb-4 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-widest text-gray-300 sm:text-sm">
            <span className="h-1.5 w-1.5 bg-[#5b4dff]" />
            Pricing
            <span className="h-1.5 w-1.5 bg-[#5b4dff]" />
          </p>
          <h2 className="mx-auto max-w-md text-3xl font-medium leading-tight text-white sm:text-4xl lg:text-5xl">
            Pay for the leverage, not the listings
          </h2>
        </div>

        {/* Toggle */}
        <div className="mt-8 flex justify-center sm:mt-10">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-[#1a1a1a] p-1.5">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                !yearly ? 'bg-white text-black' : 'text-gray-300'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition ${
                yearly ? 'bg-white text-black' : 'text-gray-300'
              }`}
            >
              Yearly
              <span className="rounded-full bg-[#d61fd6] px-2 py-0.5 text-[10px] font-semibold text-white">
                25%
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="mx-auto mt-10 grid max-w-md grid-cols-1 gap-4 lg:max-w-none lg:grid-cols-3 lg:gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-2xl border p-5 sm:p-6 ${
                plan.highlight
                  ? 'border-white/20 bg-gradient-to-b from-[#2a2a2a] to-[#141414]'
                  : 'border-white/10 bg-black'
              }`}
            >
              {/* Top */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2b1a33]">
                    {plan.icon}
                  </span>
                  <span className="text-lg text-white">{plan.name}</span>
                </div>
                <div className="text-white">
                  <span className="text-3xl font-semibold sm:text-4xl">${getPrice(plan.price)}</span>
                  <span className="ml-1 text-xs text-gray-400">/month</span>
                </div>
              </div>

              {/* Features */}
              <p className="mt-8 text-sm font-medium text-white">{plan.intro}</p>
              <ul className="mt-4 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-400">
                    <PlusIcon />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                className={`mt-10 flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition ${
                  plan.highlight
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-[#2a2a2a] text-white hover:bg-[#333]'
                }`}
              >
                Choose This Plan
                <ArrowIcon />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}