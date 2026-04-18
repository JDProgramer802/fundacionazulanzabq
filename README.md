# 💙 Fundación Azulanza - Plataforma Web

Plataforma integral diseñada para la **Fundación Azulanza**, enfocada en la gestión administrativa y la interacción con la comunidad. Construida con tecnologías de vanguardia para garantizar un alto rendimiento, SEO optimizado y una experiencia de usuario fluida.

---

## 🚀 Tecnologías Principales

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router) con **TypeScript**.
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/) para animaciones.
- **Base de Datos:** PostgreSQL alojado en [Neon.tech](https://neon.tech/).
- **ORM:** [Prisma](https://www.prisma.io/).
- **Emails:** [Resend](https://resend.com/) con plantillas responsivas.
- **Autenticación:** JWT personalizado con **Cookies HttpOnly** para máxima seguridad.
- **Almacenamiento:** [Vercel Blob](https://vercel.com/storage/blob) para archivos y comprobantes.
- **Testing:** [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
- **Calidad de Código:** ESLint + Prettier + Husky (pre-commit hooks).

---

## ✨ Características y Funcionalidades

### 🌍 Portal Público
- **Diseño Moderno:** Interfaz intuitiva con componentes animados y visualmente atractivos.
- **Gestión de Citas:** Sistema para agendar asesorías profesionales gratuitas.
- **Voluntariado:** Formulario dinámico para la captación de nuevos colaboradores.
- **Donaciones:** Registro de aportes con carga de comprobantes vía Vercel Blob.
- **Blog de Noticias:** Sección de actualidad con slugs amigables para SEO.
- **Preguntas Frecuentes (FAQ):** Acordeones interactivos para resolver dudas comunes.

### � Panel Administrativo
- **Dashboard Privado:** Gestión centralizada de todas las operaciones de la fundación.
- **CRUD de Contenido:** Control total sobre noticias, testimonios y eventos.
- **Gestión de Solicitudes:** Seguimiento y cambio de estados para citas y voluntarios.
- **Configuración Global:** Edición dinámica de redes sociales, SEO, logos e información de contacto.

---

## 🛠️ Arquitectura y Refactorización (SOLID)

El código ha sido refactorizado siguiendo los principios **SOLID** para asegurar su mantenibilidad:

- **Centralized API Client:** Localizado en [`lib/api-client.ts`](./lib/api-client.ts). Maneja todas las peticiones, errores de red y validación de tipos.
- **Custom Hooks:** Implementación de [`use-form-handler.ts`](./hooks/use-form-handler.ts) para abstraer la lógica de formularios, estados de carga y validaciones.
- **Mail Service:** Servicio robusto en [`lib/mail-service.ts`](./lib/mail-service.ts) con lógica de reintentos automáticos (exponential backoff) y manejo de errores.
- **UI Components:** Componentes reutilizables como [`AnimatedBackground.tsx`](./components/ui/AnimatedBackground.tsx) para evitar duplicación de código visual.

---

## 📋 Configuración del Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Base de Datos
DATABASE_URL="tu_url_de_neon_o_postgres"

# Autenticación
JWT_SECRET="cadena_aleatoria_muy_larga"

# Resend (Servicio de Email)
RESEND_API_KEY="re_tu_api_key"
RESEND_FROM_EMAIL="onboarding@resend.dev" # Cambiar por tu dominio verificado
ADMIN_EMAIL="tu@email.com"

# Aplicación
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 🏃 Lanzamiento del Proyecto

### 1. Instalación de Dependencias
```bash
npm install
```

### 2. Configuración de Base de Datos
```bash
npx prisma generate
npx prisma db push
npx prisma db seed # Poblar con datos iniciales (Admin predeterminado)
```

### 3. Ejecución en Desarrollo
```bash
npm run dev
```

---

## 🧪 Pruebas y Calidad

### Ejecutar Tests
```bash
npm test              # Ejecutar todos los tests unitarios
npm run test:coverage # Ver reporte de cobertura (Objetivo: 80%+)
```

### Linting y Formateo
El proyecto utiliza **Husky** para asegurar que el código pase las revisiones de ESLint y Prettier automáticamente antes de cada commit.
```bash
npm run lint # Ejecutar linter manualmente
```

---

## 📂 Estructura del Proyecto

```text
├── app/              # Rutas (Public, Admin, API)
├── components/       # Componentes React (UI, Emails, Public, Admin)
├── hooks/            # Hooks personalizados reutilizables
├── lib/              # Servicios, utilidades y configuración (Prisma, Auth)
├── prisma/           # Esquema de DB y scripts de seed
├── public/           # Archivos estáticos
└── __tests__/        # Pruebas unitarias e integración
```

---
Desarrollado para **Fundación Azulanza**. Comprometidos con el bienestar emocional. 💙
