# 🍽️ Restaurant Menu - Menú Digital con Next.js & Sanity

¡Bienvenido al repositorio del **Menú Digital**! Este proyecto es una aplicación web moderna construida con **Next.js** y **Sanity CMS**, diseñada para ofrecer una experiencia de menú interactiva, fluida y fácil de gestionar para restaurantes.

---

## 🚀 Características Principales

- **⚡ Rendimiento de Próxima Generación**: Construido con Next.js para una velocidad de carga ultrarrápida.
- **🛠️ Gestión de Contenido Dinámica**: Integración total con Sanity Studio para añadir, editar o eliminar platos en tiempo real de forma sencilla.
- **📱 Totalmente Responsivo**: Diseño optimizado para móviles, tablets y escritorio.
- **🔒 Tipado Robusto**: Implementado con TypeScript para un desarrollo seguro y libre de errores.
- **🍱 Categorización Inteligente**: Organización de platos por categorías para una navegación intuitiva.

---

## 🛠️ Stack Tecnológico

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Sanity](https://img.shields.io/badge/Sanity-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## 🛠️ Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto localmente:

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/restaurant-menu.git
cd restaurant-menu
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto y añade tus credenciales de Sanity:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-16
```

### 4. Ejecutar el servidor de desarrollo
```bash
npm run dev
```
La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## 🖋️ Gestión del Menú (Sanity Studio)

El proyecto incluye un panel de administración para gestionar el menú. Puedes acceder a él y definir tus tipos de platos:

- **Plato**: Nombre, descripción, categoría, imagen y precio.

Para configurar Sanity Studio localmente:
```bash
npx sanity init
```

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes alguna idea para mejorar el proyecto, no dudes en abrir un *Issue* o enviar un *Pull Request*.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

Hecho con ❤️ por [Jorge](https://github.com/JorgeGandara)
