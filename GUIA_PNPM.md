# Guía de pnpm para el Portafolio

## Requisitos

- Node.js >= 20
- pnpm >= 8

```bash
# Instalar pnpm globalmente si no lo tienes
npm install -g pnpm
```

## Estructura del monorepo

```
portafolio/
├── apps/
│   ├── frontend/    # React + Vite + Tailwind
│   └── backend/     # Express + Mongoose
├── packages/
│   └── shared/      # Tipos/utiles compartidos (opcional)
├── pnpm-workspace.yaml
└── package.json     # Raiz con scripts globales
```

## Comandos básicos

```bash
# Instalar TODAS las dependencias del workspace (desde la raiz)
pnpm install

# Agregar dependencia a un proyecto especifico
pnpm add <paquete> --filter frontend
pnpm add <paquete> --filter backend

# Agregar dependencia global (root)
pnpm add -w -D <paquete>

# Ejecutar dev en todos los proyectos
pnpm dev

# Ejecutar dev solo en frontend
pnpm dev:frontend

# Ejecutar dev solo en backend
pnpm dev:backend

# Construir todos los proyectos
pnpm build
```

## Desarrollo local

### 1. Configurar variables de entorno

Copia `.env.example` a `.env` en `apps/backend/`:

```bash
cp apps/backend/.env.example apps/backend/.env
```

Edita las variables con tus credenciales reales (MongoDB Atlas, Cloudinary, etc.).

### 2. Iniciar backend

```bash
pnpm dev:backend
# Puerto 3001
```

### 3. Iniciar frontend

```bash
pnpm dev:frontend
# Puerto 5173, con proxy a backend en /api
```

### 4. Iniciar ambos a la vez

```bash
pnpm dev
```

## Agregar un paquete compartido

Si quieres crear tipos compartidos entre frontend y backend:

```bash
mkdir -p packages/shared/src
```

Luego crea un `package.json` en `packages/shared/`:

```json
{
  "name": "shared",
  "version": "1.0.0",
  "private": true,
  "main": "src/index.js",
  "type": "module"
}
```

Para usarlo en frontend o backend:

```bash
pnpm add shared --filter frontend --workspace
pnpm add shared --filter backend --workspace
```

## Notas importantes

- **pnpm workspaces** crea symlinks entre paquetes del monorepo automáticamente
- Usa `pnpm --filter <nombre>` para apuntar a un proyecto específico
- Los scripts de cada proyecto se definen en su propio `package.json`
- El archivo `pnpm-workspace.yaml` define qué carpetas son parte del workspace
