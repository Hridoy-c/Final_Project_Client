'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const inputClass =
  'w-full rounded-lg border border-white/10 bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder:text-gray-500 transition focus:border-[#5b4dff] focus:outline-none focus:ring-2 focus:ring-[#5b4dff]/30'

const SignUpPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [show, setShow] = useState(false)
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    // TODO: send to your API
    console.log('Sign up:', { name: form.name, email: form.email, password: form.password })
  }

  return (
    <section className="flex w-full items-center justify-center bg-black px-4 py-12 sm:py-16 lg:py-20">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#161616] p-6 sm:p-8">
        {/* Heading */}
        <div className="text-center">
          <p className="mb-4 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-widest text-gray-300">
            <span className="h-1.5 w-1.5 bg-[#5b4dff]" />
            Sign up
            <span className="h-1.5 w-1.5 bg-[#5b4dff]" />
          </p>
          <h1 className="text-3xl font-medium leading-tight text-white sm:text-4xl">
            Create your account
          </h1>
          <p className="mt-3 text-sm text-gray-400">
            Build a profile in three minutes. The matches start arriving tomorrow.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm text-gray-300">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-gray-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={show ? 'text' : 'password'}
              required
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm text-gray-300">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={show ? 'text' : 'password'}
              required
              autoComplete="new-password"
              placeholder="Repeat your password"
              value={form.confirmPassword}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-400">
            <input
              type="checkbox"
              checked={show}
              onChange={() => setShow(!show)}
              className="h-4 w-4 accent-[#5b4dff]"
            />
            Show passwords
          </label>

          {error && (
            <p role="alert" className="rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-[#5b4dff] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#4a3de0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a7dff]"
          >
            Create account
          </button>
        </form>

        {/* Footer link */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-[#7c6cf0] hover:opacity-80">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  )
}

export default SignUpPage