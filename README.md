# ForIT Challenge - Lista de Tareas

Aplicación fullstack de gestión de tareas desarrollada como challenge de ingreso a la Academia ForIT.

## Tecnologías

- **Backend:** Node.js + Express
- **Frontend:** React + Vite + React Router
- **Estilos:** CSS puro

## Requisitos previos

- Node.js v18 o superior
- npm

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/N1co-Dom/forit-challenge.git
cd forit-challenge
```

### 2. Backend

```bash
cd backend
npm install
```

Crear archivo `.env` en la carpeta `backend/`:

```
PORT=3000
```

```bash
npm run dev
```

Servidor corriendo en `http://localhost:3000`

### 3. Frontend

Abrir una nueva terminal:

```bash
cd frontend
npm install
```

Crear archivo `.env` en la carpeta `frontend/`:

```
VITE_API_URL=http://localhost:3000/api
```

```bash
npm run dev
```

App disponible en `http://localhost:5173`

## Funcionalidades

- Crear tareas con título y descripción
- Ver listado de todas las tareas
- Marcar tareas como completadas o pendientes
- Editar tareas existentes
- Eliminar tareas