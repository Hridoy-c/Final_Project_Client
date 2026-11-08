'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

/* ---------- Types ---------- */
type Role = 'seeker' | 'recruiter'

const roles: { value: Role; title: string; description: string }[] = [
  { value: 'seeker', title: 'Job Seeker', description: 'I am looking for a job' },
  { value: 'recruiter', title: 'Recruiter', description: 'I want to hire talent' },
]

/* ---------- Validation ---------- */
const validateName = (value: string) => {
  const v = value.trim()
  if (!v) return 'Name is required.'
  if (v.length < 2) return 'Name must be at least 2 characters.'
  if (!/^[\p{L}\s.'-]+$/u.test(v)) return 'Name contains invalid characters.'
  return ''
}

const validateEmail = (value: string) => {
  const v = value.trim()
  if (!v) return 'Email is required.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Enter a valid email address.'
  return ''
}

const validateNewPassword = (value: string) => {
  if (!value) return 'Password is required.'
  if (value.length < 8) return 'Password must be at least 8 characters.'
  if (!/[a-z]/.test(value)) return 'Add at least one lowercase letter.'
  if (!/[A-Z]/.test(value)) return 'Add at least one uppercase letter.'
  if (!/\d/.test(value)) return 'Add at least one number.'
  return ''
}

const validateConfirm = (password: string, confirm: string) => {
  if (!confirm) return 'Please confirm your password.'
  if (password !== confirm) return 'Passwords do not match.'
  return ''
}

const validateRole = (value: string) =>
  value === 'seeker' || value === 'recruiter' ? '' : 'Please choose an account type.'

/* ---------- Styles ---------- */
const baseInput =
  'w-full rounded-lg border bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder:text-gray-500 transition focus:outline-none focus:ring-2'

const inputClass = (hasError: boolean) =>
  `${baseInput} ${
    hasError
      ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30'
      : 'border-white/10 focus:border-[#5b4dff] focus:ring-[#5b4dff]/30'
  }`

/* ---------- Small components ---------- */
const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p role="alert" className="mt-1.5 text-xs text-red-400">
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
const SignUpPage = () => {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'seeker' as Role,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }

  const handleRoleChange = (role: Role) => {
    setForm({ ...form, role })
    setErrors({ ...errors, role: '' })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newErrors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      password: validateNewPassword(form.password),
      confirmPassword: validateConfirm(form.password, form.confirmPassword),
      role: validateRole(form.role),
    }
    setErrors(newErrors)

    if (Object.values(newErrors).some(Boolean)) return

    setLoading(true)

    const { data: resData, error } = await authClient.signUp.email({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      role: form.role,
    })

   setLoading(false)

if (error) {
  setErrors({ email: error.message ?? 'Sign up failed. Please try again.' })
  toast.error(error.message ?? 'Sign up failed. Please try again.')
  return
}

if (resData?.token) {
  toast.success('Account created!', { description: 'Welcome to Hireloop.' })
  router.push('/')
}
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
        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
          {/* Role */}
          <fieldset>
            <legend className="mb-2 block text-sm text-gray-300">I am a</legend>
            <div className="grid grid-cols-2 gap-3">
              {roles.map((r) => {
                const active = form.role === r.value
                return (
                  <label
                    key={r.value}
                    className={`cursor-pointer rounded-lg border p-3 transition ${
                      active
                        ? 'border-[#5b4dff] bg-[#5b4dff]/10'
                        : 'border-white/10 bg-[#1a1a1a] hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={r.value}
                      checked={active}
                      onChange={() => handleRoleChange(r.value)}
                      className="sr-only"
                    />
                    <span className="block text-sm font-medium text-white">{r.title}</span>
                    <span className="mt-0.5 block text-xs text-gray-400">{r.description}</span>
                  </label>
                )
              })}
            </div>
            <FieldError message={errors.role} />
          </fieldset>

          <div>
            <label htmlFor="name" className="mb-2 block text-sm text-gray-300">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              className={inputClass(!!errors.name)}
            />
            <FieldError message={errors.name} />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-gray-300">
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
            <label htmlFor="password" className="mb-2 block text-sm text-gray-300">
              Password
            </label>
            <PasswordInput
              id="password"
              name="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={handleChange}
              aria-invalid={!!errors.password}
              className={inputClass(!!errors.password)}
            />
            <FieldError message={errors.password} />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm text-gray-300">
              Confirm password
            </label>
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="new-password"
              placeholder="Repeat your password"
              value={form.confirmPassword}
              onChange={handleChange}
              aria-invalid={!!errors.confirmPassword}
              className={inputClass(!!errors.confirmPassword)}
            />
            <FieldError message={errors.confirmPassword} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#5b4dff] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#4a3de0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a7dff] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Create account'}
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