# E-Commerce (Admin + Backend)

Monorepo containing an Admin single-page app (Frontend/admin) and a TypeScript Node backend (Backend).

## Repo layout

- `Backend/` — Express + Prisma backend (TypeScript)
- `Frontend/admin/` — Vite + React admin UI (TypeScript)

---

## Backend (Backend/)

Overview: REST API with Prisma (Postgres), authentication, image uploads, and product management.

Prerequisites
- Node.js >= 18
- npm
- A Postgres database (connection string in `DATABASE_URL`)

Important env variables (create a `.env` in `Backend/`):
- `DATABASE_URL` — Postgres connection string
- `PORT` — server port (default 3000)
- `API_VERSION` — API version prefix (default `v1`)
- `JWT_SECRET` — JWT signing secret
- `JWT_REFRESH_SECRET` — JWT refresh signing secret

Install & run

```bash
cd Backend
npm install
# Run migrations + dev server (project scripts include migrate/watch/dev)
# Create migrations and apply (if you changed schema):
npx prisma migrate dev
# Start server (the repo has scripts: build, start, dev, watch)
npm run dev
```

Notes
- Static images are served from `Backend/scripts/public/images` at `http://localhost:PORT/images`.
- Prisma schema is in `Backend/prisma/schema.prisma`. Seed script at `Backend/prisma/seed.ts`.

---

## Frontend (Admin) (Frontend/admin)

Overview: Admin panel built with React + Vite. Uses `API_BASE_URL` constructed from `VITE_API_URL` and `API_VERSION`.

Prerequisites
- Node.js >= 18
- npm

Environment
- Create a `.env` or set environment variables for Vite:
  - `VITE_API_URL` — e.g. `http://localhost:3000` (points to backend host)

Install & run

```bash
cd Frontend/admin
npm install
npm run dev   # starts Vite dev server
# build for production
npm run build
# preview production build
npm run preview
```

Defaults
- Frontend expects backend at `http://localhost:3000` by default if `VITE_API_URL` is not set.
- API endpoints are composed as `${VITE_API_URL}/api/v1` by default.

---

## Useful commands (repo root)

# Backend
cd Backend && npm install
cd Backend && npm run dev

# Frontend (admin)
cd Frontend/admin && npm install
cd Frontend/admin && npm run dev

---

## Contributing
- Follow existing code style and folder conventions.
- Run Prisma migrations when changing `prisma/schema.prisma` and update seeds if needed.

---

## License
This repository has no license set. Add a `LICENSE` file if you want to open-source it.
