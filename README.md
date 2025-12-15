# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


APP CONVIVIENDO

Descripción
"APP CONVIVIENDO" es una aplicación web creada con el fin de ser utilizada en el centro ConViviendo, un lugar donde se enseñan talleres y otros temas para chicos con discapacidad y el público en general. Esta aplicación permite a los usuarios publicar diferentes tipos de contenido, como formularios de inscripción a talleres, y gestionar el acceso y administración de contenido a través de diferentes roles (director, docentes y administrativos).

Funcionalidades Principales

Publicación de contenido relacionado con los talleres y otros eventos.

Formularios para la inscripción a talleres.

Gestión de usuarios con roles como director, docente y administrativo.

Acceso a las secciones públicas de la app según los permisos de los usuarios.

Tecnologías Usadas
Backend

Node.js

Express

MongoDB

JWT (JSON Web Tokens) para la autenticación

Cloudinary para la gestión de imágenes y contenido multimedia

Bcryptjs para el hash de contraseñas

Multer para la carga de archivos

Frontend

React.js

TailwindCSS para el diseño

Axios para realizar peticiones HTTP

Cloudinary React SDK para la integración de imágenes

Framer Motion para animaciones

React Hook Form y Yup para validaciones de formularios

GrapesJS para la creación de contenido visual interactivo

Estructura del Proyecto
Backend
/Sprint6/
├── backend/
│   ├── /config              # Archivos de configuración como db.js y cloudinary.js
│   ├── /controllers         # Controladores para manejar las operaciones en el backend
│   │   ├── adminController
│   │   ├── authController
│   │   ├── inscriptosController
│   │   ├── juegosController
│   │   ├── seccionesController
│   │   ├── talleresController
│   │   └── otros...
│   ├── /middleware          # Middleware para autenticación y control de roles
│   ├── /models              # Modelos de datos (MongoDB) para las colecciones
│   ├── /routes              # Rutas del backend (API)
│   ├── /uploads             # Archivos cargados
│   ├── .env                 # Variables de entorno
│   ├── package.json         # Dependencias y scripts del backend
│   └── server.js            # Archivo principal para iniciar el servidor

Frontend
/Sprint6/
├── frontend/
│   ├── /public              # Archivos públicos como imágenes y favicon
│   ├── /src/
│   │   ├── /api             # Configuración de Axios para las peticiones
│   │   ├── /components      # Componentes reutilizables
│   │   ├── /context         # Contextos de autenticación y gestión de estado
│   │   ├── /hooks           # Custom hooks para reutilización de lógica
│   │   ├── /layout          # Layouts para páginas administradas y públicas
│   │   ├── /pages           # Páginas de la aplicación (admin, público, etc.)
│   │   ├── /router          # Configuración de rutas (React Router)
│   │   ├── /services        # Servicios para interactuar con el backend
│   │   ├── /utils           # Funciones y utilidades compartidas
│   │   ├── App.js           # Componente principal
│   │   ├── App.css          # Estilos globales
│   │   └── package.json     # Dependencias y scripts del frontend

Cómo Ejecutar el Proyecto Localmente

Clonar el Repositorio
Clona este repositorio en tu máquina local:

git clone <URL_DEL_REPOSITORIO>


Instalar Dependencias
Instala las dependencias necesarias para el frontend y backend:

npm install


Variables de Entorno
Asegúrate de configurar las variables de entorno necesarias tanto para el frontend como para el backend.

Frontend:

VITE_CLOUDINARY_CLOUD_NAME=dgcpfpvwd
VITE_CLOUDINARY_UPLOAD_PRESET=rodrigo


Backend:

PORT=4000
MONGO_URI=mongodb+srv://romanobackfull_db_user:iJUMDsNd0hAnlIXU@cluster0.bhvivtp.mongodb.net/
JWT_SECRET=supersecreto123
CLOUDINARY_CLOUD_NAME=dgcpfpvwd
CLOUDINARY_API_KEY=196596963298238
CLOUDINARY_API_SECRET=utlYytikhO8CjmokTup7jzpSnNY


Ejecutar el Proyecto
Ejecuta el siguiente comando para iniciar el proyecto:

npm run dev


Esto ejecutará tanto el backend como el frontend simultáneamente.

Comandos Principales

Desarrollo Local: Ejecuta tanto el backend como el frontend con:

npm run dev


Comando para solo Backend:

npm run dev:backend


Comando para solo Frontend:

npm run dev:frontend

Cómo Contribuir

Si deseas contribuir al proyecto, sigue estos pasos:

Haz un fork del repositorio.

Crea una rama para tu nueva funcionalidad (git checkout -b feature-nueva-funcionalidad).

Realiza tus cambios y haz commit (git commit -m 'Añadir nueva funcionalidad').

Haz push a tu rama (git push origin feature-nueva-funcionalidad).

Abre un pull request a la rama principal de este repositorio.

Enlace de Despliegue

El enlace de despliegue estará disponible una vez que el proyecto esté en producción en Render u otra plataforma.

URL del backend desplegado:
[Agregar enlace aquí]

URL del frontend desplegado:
[Agregar enlace aquí]

URL de la APP CONVIVIENDO...

https://frontend-romano.onrender.com