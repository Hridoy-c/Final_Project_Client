import React from 'react'
import Link from 'next/link'

type Job = {
  id: number
  title: string
  description: string
  location: string
  type: string
  salary: string
}

const jobs: Job[] = [
  {
    id: 1,
    title: 'Frontend Developer',
    description: 'Showcase your commitment to diversity and inclusion by highlighting initiatives',
    location: 'New York, USA',
    type: 'Hybrid',
    salary: '€25–€40/hour',
  },
  {
    id: 2,
    title: 'Backend Developer',
    description: 'Build and maintain scalable APIs and services for a fast-growing product team',
    location: 'Berlin, Germany',
    type: 'Remote',
    salary: '€30–€45/hour',
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    description: 'Design clean, accessible interfaces and own the experience from idea to launch',
    location: 'London, UK',
    type: 'Hybrid',
    salary: '€28–€42/hour',
  },
  {
    id: 4,
    title: 'Full Stack Developer',
    description: 'Work across the stack to ship features quickly with a small, friendly team',
    location: 'Toronto, Canada',
    type: 'On-site',
    salary: '€35–€50/hour',
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    description: 'Automate deployments, monitor systems and keep our infrastructure reliable',
    location: 'Amsterdam, NL',
    type: 'Remote',
    salary: '€40–€55/hour',
  },
  {
    id: 6,
    title: 'Product Manager',
    description: 'Shape the roadmap, work with engineers and designers, and drive product goals',
    location: 'Dhaka, Bangladesh',
    type: 'Hybrid',
    salary: '€32–€48/hour',
  },
]

const PinIcon = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#e9b6ff]" fill="currentColor" aria-hidden="true">
    <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
  </svg>
)

const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#e9b6ff]" fill="currentColor" aria-hidden="true">
    <path d="M9 3a2 2 0 0 0-2 2v1H4a2 2 0 0 0-2 2v3h20V8a2 2 0 0 0-2-2h-3V5a2 2 0 0 0-2-2H9Zm0 2h6v1H9V5ZM2 13v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6h-8v1.5h-4V13H2Z" />
  </svg>
)

const CoinIcon = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#e9b6ff]" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15.5V19h-2v-1.5a3.5 3.5 0 0 1-2.5-2.5l1.9-.6c.2.7.8 1.1 1.6 1.1.9 0 1.5-.4 1.5-1 0-.6-.4-.9-1.7-1.3-1.6-.5-3-1.1-3-2.9 0-1.3.9-2.3 2.2-2.7V7h2v1.5c1 .3 1.8 1 2.1 2l-1.8.7c-.2-.6-.7-.9-1.4-.9-.8 0-1.3.4-1.3.9 0 .5.4.8 1.6 1.2 1.7.5 3.1 1.1 3.1 3 0 1.4-1 2.4-2.3 2.8Z" />
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Tag = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <span className="inline-flex items-center gap-2 rounded-full bg-[#242424] px-3 py-1.5 text-xs font-medium text-white">
    {icon}
    {label}
  </span>
)

export const JobsPage = () => {
  return (
    <section className="w-full bg-black py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[90vw] px-4 sm:px-6">
        {/* Heading */}
        <div className="mb-8 text-center sm:mb-12">
          <p className="mb-4 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-widest text-gray-300 sm:text-sm">
            <span className="h-1.5 w-1.5 bg-[#5b4dff]" />
            Smart job discovery
            <span className="h-1.5 w-1.5 bg-[#5b4dff]" />
          </p>
          <h2 className="mx-auto max-w-md text-3xl font-medium leading-tight text-white sm:text-4xl lg:text-5xl">
            The roles you&apos;d never find by searching
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="flex flex-col rounded-2xl bg-[#161616] p-5 transition hover:bg-[#1c1c1c] sm:p-6"
            >
              <h3 className="text-xl font-medium text-white sm:text-2xl">{job.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">{job.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                <Tag icon={<PinIcon />} label={job.location} />
                <Tag icon={<BriefcaseIcon />} label={job.type} />
                <Tag icon={<CoinIcon />} label={job.salary} />
              </div>

              <Link
                href={`/jobs/${job.id}`}
                className="mt-8 inline-flex items-center gap-2 text-sm text-white hover:text-[#7c6cf0]"
              >
                Apply Now
                <ArrowIcon />
              </Link>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/jobs"
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-gray-200"
          >
            View all job open
          </Link>
        </div>
      </div>
    </section>
  )
}