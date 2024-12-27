# Task Manager API

Este es el backend para el proyecto "Task Manager", desarrollado con Express, TypeScript y Supabase. Proporciona una API REST para gestionar tareas.

--- 

## Características

- Crear, leer, actualizar y eliminar tareas.
- Gestión del estado de las tareas (pendiente, en progreso, completada).
- Validación de datos en los endpoints.
- Integración con **OpenAPI** para documentación de la API.
- Arquitectura limpia y tipada gracias a **TypeScript**.
- Uso de **Supabase** para almacenamiento de datos y autenticación de usuarios.
--- 

## Estructura del proyecto 
```plaintext
requests/           # Archivos de peticiones HTTP de la API para pruebas
src/
├── config/         # Configuración de la API
├── controllers/    # Lógica de los endpoints
├── lib/            # Funciones y variables auxiliares
├── middlewares/    # Middlewares personalizados
├── routes/         # Definición de rutas de la API
├── services/       # Lógica de negocio y comunicación con Supabase
├── types/          # Tipos de datos
├── app.ts          # Archivo de configuración de la API
└── index.ts        # Archivo principal de la aplicación
```

## Requisitos

- Node.js (versión 22 o superior).
- npm (versión 10 o superior).
- Una cuenta en [Supabase](https://supabase.com/)..

--- 

## Configuración de la aplicación

### 1. Clona este repositorio:
```bash
https://github.com/123CarlosDaniel/task-manager-api.git
cd task-manager-api
```

### 2. Configura las variables de entorno
Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:

```bash
SUPABASE_PROJECT_URL=<tu_supabase_project_url>
SUPABASE_ANON_KEY=<tu_supabase_anon_key>
PORT=3000

# URL de tu aplicacion frontend
APP_URL=<tu_app_url> 
```
#### ¿Dónde obtener estas claves de Supabase?
1. Accede al panel de Supabase
    - Ve a Supabase e inicia sesión con tu cuenta.
    - Si no tienes una cuenta, regístrate y crea un nuevo proyecto.

2. Dirígete a la configuración del proyecto
    - Selecciona tu proyecto desde el panel principal.
    - Haz clic en la pestaña Settings (Configuración) en el menú lateral.

3. Obtén las claves necesarias
    - SUPABASE_PROJECT_URL:
    En la sección API, copia la URL del proyecto, que se encuentra en el campo Project URL.
    - SUPABASE_ANON_KEY:
    En la misma sección API, encontrarás la clave anónima en el campo anon key. Esta clave se utiliza para accesos públicos.


### 3. Instala las dependencias:
```bash
npm install
```

### 4. Compila el proyecto:
```bash
npm run build
```

### 5. Inicia el servidor:
```bash
npm run start
```

### 6. Ejecuta el modo de desarrollo:
```bash
npm run dev
```

