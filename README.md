This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

# Capstone Frontend

Proyecto Frontend de Capstone e-commerce usando Next.js, Tailwind CSS y Node.js.

## Estructura
- `pages/` → Páginas (Inicio, Catálogo, Carrito, Checkout, Orders, Profile, Admin)
- `components/` → Componentes reutilizables (Navbar, Footer, ProductCard)
- `public/` → Imágenes y assets
- `styles/` → Estilos globales o módulos CSS
- `package.json` → Dependencias y scripts
- crear un archivo .env en la carpeta del proyecto 
- el archivo .env debe contener lo siguiente
### conexion a la base de datos `

## DATABASE_URL="postgresql://postgres.dnlzxjlhyllwfzbybrfy:m435faA23kfa2af9k@aws-1-us-east-2.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1"
## DIRECT_URL="postgresql://postgres.dnlzxjlhyllwfzbybrfy:m435faA23kfa2af9k@aws-1-us-east-2.pooler.supabase.com:5432/postgres"


## NEXT_PUBLIC_BASE_URL=http://localhost:3000

## autenticacion de correo
## EMAIL_SERVER=smtp://tu-correo@gmail.com:app-password@smtp.gmail.com:587
## EMAIL_FROM=tu-correo@gmail.com`
## mercado pago
## MP_ACCESS_TOKEN=APP_USR-4556044148129708-100115-adc2caa51d1194dffa129a2ebf51f1e0-2900000140

## chat bot 
## OPENAI_API_KEY=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

## Cómo levantar
```bash
npm install
npm install axios
npx npm i --save-dev prisma@latest
npm install bcryptjs
npm install jsonwebtoken
npm install nodemailer
npm install transbank-sdk
npm install mercadopago
npm list mercadopago
npm install react-leaflet leaflet
npm install openai   
npm install pdfkit
npm audit fix --force
npm run dev