# Fundación Azulanza - Plataforma Web Administrativa

Esta es una aplicación web completa para la **Fundación Azulanza**, construida como una SPA (Single Page Application) utilizando las tecnologías más modernas para garantizar rendimiento, SEO y facilidad de administración.

## 🚀 Tecnologías Utilizadas

- **Framework:** Next.js 14 (App Router) con TypeScript.
- **Estilos:** Tailwind CSS + Framer Motion para animaciones.
- **Base de Datos:** PostgreSQL (Neon.tech).
- **ORM:** Prisma.
- **Backend:** Next.js API Routes.
- **Autenticación:** JWT con Cookies HttpOnly.
- **Almacenamiento:** Vercel Blob para imágenes y comprobantes.
- **Correos:** Resend.

## 🛠️ Ejecución Unificada

El proyecto está configurado para ejecutarse con un solo comando:

### Desarrollo
```bash
npm install
npm run dev
```
Levanta el servidor en [https://fundacionazulanzabq.vercel.app](https://fundacionazulanzabq.vercel.app) (en producción) o http://localhost:3000 (local).

### Producción
```bash
npm run build
npm run start
```

### Base de Datos
```bash
# Sincronizar esquema
npx prisma db push

# Poblar con datos iniciales (Admin y Configuración)
npx prisma db seed
```

## 📂 Estructura del Proyecto

- `/app`: Rutas de la aplicación (Públicas, Admin y API).
- `/components`: Componentes reutilizables (UI, SEO, Admin).
- `/lib`: Utilidades, configuración de Prisma, Auth y SEO.
- `/prisma`: Esquema de base de datos y scripts de seed.
- `/public`: Archivos estáticos y fuentes personalizadas.

## 🔐 Panel de Administración

Acceso en `/admin/login`. Permite gestionar:
- Contenido de páginas (Misión, Visión, Historia).
- Noticias (CRUD completo con imágenes).
- Citas (Gestión de estados).
- Donaciones (Verificación de comprobantes).
- Configuración General (Logo, SEO, Contacto, Redes).

---
Desarrollado para Fundación Azulanza.
