# Portafolio Web

Portafolio personal con estilo Firefox DevTools dark mode.

## Stack

- **Frontend**: React 19 + Vite + Tailwind CSS v4 + Framer Motion + React Router
- **Backend**: Node.js + Express + Mongoose + JWT
- **Database**: MongoDB Atlas
- **Images**: Cloudinary
- **Email**: EmailJS
- **Monorepo**: pnpm workspaces

## Estructura

```
apps/
├── frontend/     # React SPA (Vercel)
└── backend/      # API REST (Fly.io)
```

## Desarrollo local

```bash
pnpm install
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env
# Editar .env con credenciales reales
pnpm dev
```

## Deploy

- **Frontend**: `vercel` desde `apps/frontend/`
- **Backend**: `fly deploy` desde `apps/backend/`
