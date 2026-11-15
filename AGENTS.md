# AGENTS.md

## What this project is

**HireLoop** — a job-portal frontend built as a course final project. This repo is the **client only**; the API lives in the sibling folder `../final_project_server`.

What it is used for:

- **Seekers** — browse jobs, save jobs, apply, track applications, manage billing/settings.
- **Recruiters** — post a job, update/delete their own posts, review applications, settings.
- **Admins** — manage users, companies, jobs, payments (dashboard pages not built yet).

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 (Turbopack loader) · shadcn/ui (`base-nova`, neutral) · Lucide icons · Better Auth 1.7 + MongoDB adapter · Sonner toasts · React Compiler enabled.

## Commands

```bash
npm run dev     # http://localhost:3000
npm run build
npm run start
npm run lint    # eslint
```

No tests are configured. API server (separate repo) runs on `http://localhost:8000`.

## Environment

Copy values into `.env` (never commit it):

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | Mongo connection for Better Auth (db: `Final_Project`) |
| `BETTER_AUTH_SECRET` | Better Auth signing secret |
| `BETTER_AUTH_URL` | Auth base URL, e.g. `http://localhost:3000` |
| `NEXT_PUBLIC_API_BASE_URL` | Express API base, e.g. `http://localhost:8000/api` |

## Structure

```
src/app/(root)        home, browse-jobs
src/app/(auth)        sign-in, sign-up
src/app/(dashboard)   role dashboards + shared sidebar layout
src/app/api/auth      Better Auth catch-all route
src/components/home   marketing sections
src/components/dashboard  sidebar + recruiter job forms
src/components/shared Navbar, Footer, PasswordInput
src/components/ui     shadcn primitives (generated — don't hand-edit)
src/lib/api           read calls (GET)
src/lib/actions       write calls (POST/PATCH/DELETE)
src/lib/auth.ts       Better Auth server config
src/lib/auth-client.ts Better Auth React client
src/types             shared types
```

## Data flow

- Page/component → `src/lib/api/*` or `src/lib/actions/*` → Express `NEXT_PUBLIC_API_BASE_URL` (`/jobs`, `/jobs/:id`).
- Auth → Better Auth at `/api/auth/*`, users stored in Mongo `Final_Project.user` with `role` field.
- Server is Express 5 + MongoDB, no validation/auth on its endpoints.

## Roles

`seeker | recruiter | admin` declared in `src/lib/auth.ts` as an additional field (default `seeker`). UI reads it via `authClient.useSession()` in `DashboardSidebar`.

## Conventions

- Import alias `@/*` → `src/*`.
- Add `"use client"` only for hooks/state/browser APIs.
- New UI primitives: use shadcn CLI into `src/components/ui`; keep the existing dark theme (`#08080a` bg, `#111113` panels, `#5b4dff` accent).
- Toasts via `sonner`; icons via `lucide-react`.
- Keep read/write API calls separated (`lib/api` vs `lib/actions`) as already done.

## Known issues (don't "fix" blindly)

- No `middleware.ts` — dashboards are not protected by session or role (only `manage-jobs` and `/dashboard` check the session server-side).
- Sidebar links for seeker/admin subpages (`/dashboard/seeker/jobs`, `/dashboard/admin/users`, etc.) do not exist yet.
- `add-job` imports a `Euro` icon although salaries use a generic `frequency` string.
- `BrowseControls.tsx` / `BrowseFilters.tsx` have placeholder props/handlers that lint flags as unused (warnings only).

## Rules for agents

- Never edit `.env`, `node_modules`, `.next`, or `package-lock.json` by hand.
- Don't modify `src/components/ui/*` manually; regenerate via shadcn.
- Run `npm run lint` after changes; run `npm run build` for structural changes.
- Match existing dark styling and file/naming patterns.
