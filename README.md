This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

# Capstone Frontend

Proyecto Frontend de Capstone e-commerce usando Next.js, Tailwind CSS y Node.js.

## Estructura
- `pages/` → Páginas (Inicio, Catálogo, Carrito, Checkout, Orders, Profile, Admin)
- `components/` → Componentes reutilizables (Navbar, Footer, ProductCard)
- `public/` → Imágenes y assets
- `styles/` → Estilos globales o módulos CSS
- `package.json` → Dependencias y scripts
- crear un archivo .env 

## Cómo levantar
```bash
npm install
npm install axios
npx prisma generate
npm install bcryptjs
npm install jsonwebtoken
npm run dev