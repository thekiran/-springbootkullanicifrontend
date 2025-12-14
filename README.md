# Student Management Dashboard (Next.js + Spring Boot)

## Overview
- Next.js 16 + React 19 frontend for a Spring Boot student management API
- Provides dashboard metrics, recent students, and full CRUD screens for student records
- Uses SWR for data fetching, Radix UI + Tailwind CSS for UI, and Next rewrites to proxy API calls during local dev

## Features
- Dashboard: stats for total students, phone/TC coverage, and unique emails (`DashboardStats`)
- Recent activity: last-added students with quick links to edit (`RecentStudents`)
- Student list: searchable table, edit/delete actions with confirm dialog (`StudentsTable`)
- Create/edit forms: validated inputs for name, email, phone, TC Kimlik No (`StudentForm`)
- API proxy: `/api/*` forwarded to `http://localhost:1010/*` (see `next.config.mjs`)

## Tech Stack
- Next.js 16 (App Router), TypeScript
- Tailwind CSS v4 config + Radix UI primitives + lucide-react icons
- SWR for fetching/caching; Vercel analytics enabled

## Running Locally
1) Install Node.js 18+ and npm
2) Install deps: `npm install`
3) Run Spring Boot API on `http://localhost:1010`
   - Adjust `next.config.mjs` rewrite if your backend URL/port differs
4) Start dev server: `npm run dev` (default: http://localhost:3000)
5) Build & serve: `npm run build` then `npm start`

## API Expectations
- Base path: `/api/students` (proxied to your Spring Boot service)
- Endpoints
  - `GET /students` → `Student[]`
  - `GET /students/{id}` → `Student`
  - `POST /students` with body `{ firstName, lastName, email, telephone, tcNo }`
  - `PUT /students/{id}` with body `{ firstName, lastName, email, telephone, tcNo }`
  - `DELETE /students/{id}` → 200/204 on success
- `Student` shape (frontend expects): `{ id, firstName, lastName, email, maskedPhoneNumber, maskedtcNo }`

## Project Structure (key parts)
- `app/` — Next.js routes (dashboard, students, create/edit pages)
- `components/` — layout, dashboard widgets, forms, table, and UI primitives
- `lib/api.ts` — fetch helpers hitting the proxied API
- `lib/types.ts` — Student and request DTO types
- `public/`, `styles/` — assets and global styles

## Notes
- `node_modules` is already in `.gitignore`; keep dependencies out of git to avoid large-file push errors
- To change the API target, edit the rewrite in `next.config.mjs` or swap `API_BASE_URL` in `lib/api.ts`
