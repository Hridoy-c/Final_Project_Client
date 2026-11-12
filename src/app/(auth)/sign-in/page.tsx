'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

/* ---------- Validation ---------- */
const validateEmail = (value: string) => {
  const v = value.trim()
  if (!v) return 'Email is required.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Enter a valid email address.'
  return ''
}

const validateRequired = (value: string, label = 'This field') =>
  value ? '' : `${label} is required.`

/* ---------- Styles ---------- */
const baseInput =
  'w-full rounded-lg border bg-[#1a1a1a] px-3.5 py-2.5 text-sm text-white placeholder:text-gray-500 transition focus:outline-none focus:ring-2'

const inputClass = (hasError: boolean) =>
  `${baseInput} ${
    hasError
      ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30'
      : 'border-white/10 focus:border-[#5b4dff] focus:ring-[#5b4dff]/30'
  }`

/* ---------- Small components ---------- */
const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p role="alert" className="mt-1 text-xs text-red-400">
      {message}
    </p>
  ) : null

const PasswordInput = ({
  className = '',
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  const [show, setShow] = useState(false)

  return (
    <div className="relative">
      <input {...props} type={show ? 'text' : 'password'} className={`${className} pr-12`} />
      <button
        type="button"
        onClick={() => setShow(!show)}
        aria-label={show ? 'Hide password' : 'Show password'}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-white"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {show ? (
            <>
              <path d="M3 3l18 18" />
              <path d="M10.6 6.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7a9.7 9.7 0 0 0 4.1-.9" />
              <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
            </>
          ) : (
            <>
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
              <circle cx="12" cy="12" r="3" />
            </>
          )}
        </svg>
      </button>
    </div>
  )
}

/* ---------- Page ---------- */
const SignInPage = () => {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newErrors = {
      email: validateEmail(form.email),
      password: validateRequired(form.password, 'Password'),
    }
    setErrors(newErrors)

    if (Object.values(newErrors).some(Boolean)) return

    setLoading(true)

    const { error } = await authClient.signIn.email({
      email: form.email.trim(),
      password: form.password,
    })

    setLoading(false)

    if (error) {
      setErrors({ password: 'Invalid email or password.' })
      toast.error('Invalid email or password.')
      return
    }

    toast.success('Signed in successfully!', { description: 'Welcome back.' })
    router.push('/')
    router.refresh()
  }

  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-black px-4 py-6 sm:py-8">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#161616] p-5 sm:p-6">
        {/* Heading */}
        <div className="text-center">
          <p className="mb-2 flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-widest text-gray-300">
            <span className="h-1.5 w-1.5 bg-[#5b4dff]" />
            Sign in
            <span className="h-1.5 w-1.5 bg-[#5b4dff]" />
          </p>
          <h1 className="text-2xl font-medium leading-tight text-white sm:text-3xl">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-gray-400">Sign in to see your latest matches.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-3">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm text-gray-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              className={inputClass(!!errors.email)}
            />
            <FieldError message={errors.email} />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="password" className="text-sm text-gray-300">
                Password
              </label>
              <Link href="/forgot-password" className="text-xs text-[#7c6cf0] hover:opacity-80">
                Forgot password?
              </Link>
            </div>
            <PasswordInput
              id="password"
              name="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              aria-invalid={!!errors.password}
              className={inputClass(!!errors.password)}
            />
            <FieldError message={errors.password} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#5b4dff] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#4a3de0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a7dff] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Footer link */}
        <p className="mt-4 text-center text-sm text-gray-400">
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