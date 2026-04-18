# 💙 Fundación Azulanza - Plataforma Web

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

Plataforma integral diseñada para la **Fundación Azulanza**, enfocada en la gestión administrativa y la interacción comunitaria.

---

## 📌 Tabla de Contenidos
- [✨ Características](#-características)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [🏗️ Arquitectura y SOLID](#️-arquitectura-y-solid)
- [🚀 Inicio Rápido](#-inicio-rápido)
- [⚙️ Configuración (.env)](#️-configuración-env)
- [🧪 Calidad y Testing](#-calidad-y-testing)
- [📂 Estructura](#-estructura)

---

## ✨ Características

<details>
<summary><b>🌍 Portal Público (Click para expandir)</b></summary>

- **Diseño Moderno:** Interfaz fluida con animaciones de Framer Motion.
- **Gestión de Citas:** [Agenda tu asesoría](https://fundacionazulanzabq.vercel.app/asesoria).
- **Voluntariado:** Sistema de postulación dinámica.
- **Donaciones:** Registro seguro con carga de comprobantes.
- **Blog:** Noticias optimizadas para SEO.
</details>

<details>
<summary><b>🔐 Panel Administrativo (Click para expandir)</b></summary>

- **Dashboard:** Control centralizado de métricas y solicitudes.
- **Gestión de Contenido:** CRUD completo de noticias, testimonios y eventos.
- **Moderación:** Aprobación de voluntarios y verificación de donaciones.
- **Configuración:** Personalización de SEO, redes sociales y contacto.
</details>

---

## 🛠️ Stack Tecnológico

| Tecnología | Propósito |
| :--- | :--- |
| **Next.js 14** | Framework Fullstack (App Router) |
| **PostgreSQL** | Base de datos relacional (Neon) |
| **Resend** | Motor de emails transaccionales |
| **Vercel Blob** | Almacenamiento de archivos en la nube |
| **Framer Motion** | Animaciones de alta calidad |

---

## 🏗️ Arquitectura y SOLID

El proyecto implementa patrones de diseño para máxima escalabilidad:

- **[api-client.ts](./lib/api-client.ts)**: Cliente centralizado para peticiones HTTP.
- **[use-form-handler.ts](./hooks/use-form-handler.ts)**: Abstracción de lógica de formularios.
- **[mail-service.ts](./lib/mail-service.ts)**: Lógica de correos con reintentos automáticos.

---

## 🚀 Inicio Rápido

1. **Clonar y Preparar:**
   ```bash
   git clone https://github.com/JDProgramer802/fundacionazulanzabq.git
   cd fundacionazulanzabq
   npm install
   ```

2. **Base de Datos:**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

3. **Ejecutar:**
   ```bash
   npm run dev
   ```

---

## ⚙️ Configuración (.env)

<details>
<summary><b>Ver variables requeridas</b></summary>

```env
# Base de Datos
DATABASE_URL="tu_url_de_neon"

# Autenticación
JWT_SECRET="secreto_largo_y_seguro"

# Resend
RESEND_API_KEY="re_clave"
RESEND_FROM_EMAIL="onboarding@resend.dev"
ADMIN_EMAIL="tu@email.com"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```
</details>

---

## 🧪 Calidad y Testing

Aseguramos la integridad del código con pruebas automatizadas:

```bash
# Ejecutar tests unitarios
npm test

# Reporte de cobertura
npm run test:coverage
```

> **Nota:** El proyecto utiliza **Husky** para validar el código antes de cada commit.

---

## 📂 Estructura

```text
├── app/              # Rutas y lógica de servidor
├── components/       # Componentes React reutilizables
├── hooks/            # Hooks de lógica de negocio
├── lib/              # Servicios y utilidades core
├── prisma/           # Modelado de datos
└── __tests__/        # Suite de pruebas
```

---
Desarrollado con 💙 para **Fundación Azulanza**.
