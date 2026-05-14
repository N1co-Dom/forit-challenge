// Importamos las librerías que instalamos
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Cargamos las variables del archivo .env
dotenv.config()

// Creamos la app de Express
const app = express()

// Puerto donde va a escuchar el servidor (lo lee del .env, o usa 3000 por defecto)
const PORT = process.env.PORT || 3000

// Middlewares: funciones que corren antes de llegar a los endpoints
app.use(cors())               // Permite peticiones desde el frontend (otro puerto)
app.use(express.json())       // Permite leer el body de las peticiones en formato JSON

// Array en memoria: acá se guardan las tareas mientras el servidor está corriendo
let tasks = [
  // Tarea de ejemplo para que no empiece vacío
  { id: 1, titulo: 'Tarea de ejemplo', descripcion: 'Esta es una tarea de prueba', completada: false }
]

// Contador para generar IDs únicos (como un autoincrement de base de datos)
let nextId = 2

// ─── ENDPOINTS ───────────────────────────────────────────────────────────────

// GET /api/tasks → Devuelve todas las tareas
app.get('/api/tasks', (req, res) => {
  res.json(tasks)
})

// POST /api/tasks → Crea una nueva tarea
app.post('/api/tasks', (req, res) => {
  const { titulo, descripcion } = req.body  // Extraemos los datos del body

  // Validación básica: el título es obligatorio
  if (!titulo) {
    return res.status(400).json({ error: 'El título es obligatorio' })
  }

  // Creamos la nueva tarea
  const newTask = {
    id: nextId++,         // Usamos el contador y lo incrementamos
    titulo,
    descripcion: descripcion || '',  // Si no mandan descripción, ponemos string vacío
    completada: false     // Toda tarea nueva empieza sin completar
  }

  tasks.push(newTask)              // La agregamos al array
  res.status(201).json(newTask)   // 201 = "Created", devolvemos la tarea creada
})

// PUT /api/tasks/:id → Actualiza una tarea existente
// El :id es un parámetro dinámico en la URL, ej: /api/tasks/1
app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id)  // Convertimos el id de string a número
  const taskIndex = tasks.findIndex(t => t.id === id)  // Buscamos la tarea

  // Si no existe, devolvemos error 404
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' })
  }

  // Actualizamos solo los campos que mandaron, mantenemos los que no
  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body }

  res.json(tasks[taskIndex])  // Devolvemos la tarea actualizada
})

// DELETE /api/tasks/:id → Elimina una tarea
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const taskIndex = tasks.findIndex(t => t.id === id)

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' })
  }

  tasks.splice(taskIndex, 1)  // Eliminamos la tarea del array
  res.status(204).send()      // 204 = "No Content", éxito sin cuerpo de respuesta
})

// ─── LEVANTAR SERVIDOR ───────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})