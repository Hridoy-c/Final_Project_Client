import React from 'react'

const iconProps = {
  viewBox: '0 0 24 24',
  className: 'h-5 w-5 text-[#e9b6ff]',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

const features = [
  {
    title: 'Smart Search',
    description: 'Find your ideal job with advanced filters.',
    icon: (
      <svg {...iconProps}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    ),
  },
  {
    title: 'Salary Insights',
    description: 'Get real salary data to negotiate confidently.',
    icon: (
      <svg {...iconProps}>
        <path d="M3 3v18h18" />
        <path d="m7 15 4-5 3 3 5-7" />
      </svg>
    ),
  },
  {
    title: 'Top Companies',
    description: 'Apply to vetted companies that are hiring.',
    icon: (
      <svg {...iconProps}>
        <rect x="4" y="10" width="5" height="10" />
        <rect x="9" y="4" width="6" height="16" />
        <rect x="15" y="12" width="5" height="8" />
      </svg>
    ),
  },
  {
    title: 'Saved Jobs',
    description: 'Manage apps & favorites on your dashboard.',
    icon: (
      <svg {...iconProps}>
        <path d="M6 3h12v18l-6-4-6 4V3Z" />
      </svg>
    ),
  },
  {
    title: 'One-Click Apply',
    description: 'Simplify your job applications for an easier process!',
    icon: (
      <svg {...iconProps}>
        <path d="m10 10 3 10 2.5-4.5L20 13 10 10Z" />
        <path d="M10 3v2M4.5 5.5 6 7M3 11h2M15.5 5.5 14 7" />
      </svg>
    ),
  },
  {
    title: 'Resume Builder',
    description: 'Create professional resumes with modern templates.',
    icon: (
      <svg {...iconProps}>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <circle cx="12" cy="9" r="2" />
        <path d="M8.5 16h7" />
      </svg>
    ),
  },
  {
    title: 'Skill-Based Matching',
    description: 'Discover jobs that match your skills and experience.',
    icon: (
      <svg {...iconProps}>
        <path d="m12 3 7 4v10l-7 4-7-4V7l7-4Z" />
      </svg>
    ),
  },
  {
    title: 'Career Growth Resources',
    description: 'Boost your career with quick interview tips.',
    icon: (
      <svg {...iconProps}>
        <path d="m3 17 6-6 4 4 8-8" />
        <path d="M15 7h6v6" />
      </svg>
    ),
  },
]

export const Featuresjob = () => {
  return (
<section className="w-full bg-[#1a1a1a]">
  <div className="mx-auto w-[90vw] py-12 sm:py-16 lg:py-20">
        {/* Heading */}
        <div className="mb-10 text-center sm:mb-14">
          <p className="mb-4 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-widest text-gray-300 sm:text-sm">
            <span className="h-1.5 w-1.5 bg-[#5b4dff]" />
            Features job
            <span className="h-1.5 w-1.5 bg-[#5b4dff]" />
          </p>
          <h2 className="mx-auto max-w-md text-3xl font-medium leading-tight text-white sm:text-4xl lg:text-5xl">
            Everything you need to succeed
          </h2>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-10">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-gradient-to-b from-[#0a0a0a] to-black">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-sm font-medium text-white sm:text-base">{feature.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-400 sm:text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}