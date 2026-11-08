'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const inputClass =
  'w-full rounded-lg border border-white/10 bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder:text-gray-500 transition focus:border-[#5b4dff] focus:outline-none focus:ring-2 focus:ring-[#5b4dff]/30'

const SignInPage = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    

    if (!form.email || !form.password) {
      setError('Please enter your email and password.')
      return
    }

    // TODO: send to your API
    console.log('Sign in:', form)
  }

  return (
    <section className="flex w-full items-center justify-center bg-black px-4 py-12 sm:py-16 lg:py-20">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#161616] p-6 sm:p-8">
        {/* Heading */}
        <div className="text-center">
          <p className="mb-4 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-widest text-gray-300">
            <span className="h-1.5 w-1.5 bg-[#5b4dff]" />
            Sign in
            <span className="h-1.5 w-1.5 bg-[#5b4dff]" />
          </p>
          <h1 className="text-3xl font-medium leading-tight text-white sm:text-4xl">
            Welcome back
          </h1>
          <p className="mt-3 text-sm text-gray-400">
            Sign in to see your latest matches.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="password" className="text-sm text-gray-300">
                Password
              </label>
              <Link href="/forgot-password" className="text-xs text-[#7c6cf0] hover:opacity-80">
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type={show ? 'text' : 'password'}
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              value={form.password}
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
            Show password
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
            Sign In
          </button>
        </form>

        {/* Footer link */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-[#7c6cf0] hover:opacity-80">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  )
}

export default SignInPage