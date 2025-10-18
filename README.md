# Proyecto Final Frontend - React

Este es un proyecto frontend desarrollado en React 18 con Vite como herramienta de construcción. Está preparado para conectarse con una API backend

## Tecnologías Utilizadas

- **React 18** - Biblioteca principal para la interfaz de usuario
- **React Router DOM** - Manejo de rutas y navegación
- **Bootstrap 5** - Framework CSS para diseño responsivo
- **Vite** - Herramienta de construcción y desarrollo rápido
- **ESLint** - Linting y análisis de código
- **Fetch API** - Para conexiones con API REST


## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd Frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:3000`

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la construcción de producción
- `npm run lint` - Ejecuta el linter de código

## 🔧 Configuración de API

El proyecto incluye un servicio de API preconfigurado en `src/services/apiService.js`. Para conectarte a tu API backend:

1. Modifica la constante `API_BASE_URL` en `apiService.js`
2. Ajusta los headers según las necesidades de tu API
3. Utiliza los métodos `get`, `post`, `put`, `delete` según sea necesario

