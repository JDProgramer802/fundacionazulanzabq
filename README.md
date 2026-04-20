# 💙 Fundación Azulanza - Ultra Premium Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

> **Elevando la salud mental con un diseño de vanguardia.** Una plataforma integral diseñada para la **Fundación Azulanza**, fusionando una estética ultra-premium con una arquitectura robusta para la gestión comunitaria e institucional.

---

## ✨ Experiencia Premium (Vibe & Design)

Esta versión de la plataforma introduce una identidad visual **Premium Glassmorphism**, diseñada para inspirar confianza, modernidad y cercanía.

- **🎨 Paleta de Colores Dinámica:** Uso estratégico de Rosa (`#EE84B5`) y Azul (`#0356CB`) en gradientes radiales y mallas orgánicas.
- **🪄 Micro-interacciones:** Animaciones fluidas impulsadas por Framer Motion que reaccionan al scroll y al cursor (Efectos 3D, Spring Physics).
- **🪟 Estética de Cristal:** Paneles translúcidos con desenfoque de fondo avanzado (`backdrop-blur-xl`) que proporcionan profundidad y claridad.
- **🪄 Tipografía Exclusiva:** Implementación de _Champagne & Limousines_ para una lectura elegante y distintiva.

---

## 🚀 Características Principales

### 🌍 Portal Público

- **Hero Dinámico:** Encabezado asimétrico con elementos flotantes interactivos.
- **Gestión de Asesorías:** Sistema intuitivo para agendar citas psicológicas.
- **Voluntariado:** Proceso de postulación simplificado y moderno.
- **Donaciones:** Pasarela de reporte con carga de comprobantes y validación visual.
- **Blog de Actualidad:** Noticias optimizadas para SEO con carga progresiva.

### 🔐 Panel Administrativo (Elite Dashboard)

- **Métricas Tiempo Real:** Control centralizado de impacto y solicitudes.
- **CMS Integrado:** Gestión completa de eventos, testimonios y noticias.
- **Auditoría:** Sistema de verificación para donaciones y voluntarios.
- **Customización Total:** Configuración de SEO, contactos y redes sociales desde el panel.

---

## 🛠️ Stack Tecnológico

| Tecnología       | Propósito                                              |
| :--------------- | :----------------------------------------------------- |
| **Next.js 14**   | App Router para máxima velocidad y SEO.                |
| **Prisma ORM**   | Modelado de datos seguro y eficiente.                  |
| **PostgreSQL**   | Almacenamiento persistente y escalable.                |
| **Resend**       | Notificaciones por correo electrónico transaccionales. |
| **Vercel Blob**  | Gestión de assets y archivos en la nube.               |
| **Lucide Icons** | Set de iconos minimalistas y elegantes.                |

---

## 🏗️ Arquitectura y Principios SOLID

El proyecto sigue estándares de clean code para asegurar su mantenimiento a largo plazo:

- **Lógica desacoplada:** Servicios reutilizables en [/lib](./lib).
- **Hooks Personalizados:** Gestión de estados complejos como formularios en [/hooks](./hooks).
- **Validación Estricta:** Uso integral de **Zod** para esquemas de datos.

---

## 💻 Inicio Rápido

### Requisitos Previos

- Node.js 18+
- PostgreSQL (Local o Remoto como Neon)

### Instalación

1.  **Clonar:**

    ```bash
    git clone https://github.com/JDProgramer802/fundacionazulanzabq.git
    cd fundacionazulanzabq
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Crea un archivo `.env` basado en `.env.example` (ver sección abajo).

4.  **Sincronizar DB:**

    ```bash
    npx prisma generate
    npx prisma db push
    npx prisma db seed
    ```

5.  **Desarrollar:**
    ```bash
    npm run dev
    ```

---

## ⚙️ Configuración (.env)

```env
# Database
DATABASE_URL="tu_url_postgresql"

# Authentication
JWT_SECRET="secreto_seguro"

# Email (Resend)
RESEND_API_KEY="re_clave"
RESEND_FROM_EMAIL="onboarding@resend.dev"
ADMIN_EMAIL="admin@fundacion.org"

# Storage (Vercel Blob)
BLOB_READ_WRITE_TOKEN="tu_token"
```

---

## 📂 Estructura del Proyecto

```text
├── app/              # Rutas (Public & Admin)
├── components/       # Componentes UI (React)
├── hooks/            # Logica reutilizable
├── lib/              # Servicios (Prisma, Resend, etc)
├── prisma/           # Esquemas de DB
└── public/           # Assets estáticos (Logo, Fuentes)
```

---

Desarrollado con 💙 para la **Fundación Azulanza**. Transformando vidas, un píxel a la vez.
