import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import './index.css'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const [tasks, setTasks] = useState([])
  const navigate = useNavigate() // Hook para navegar entre rutas por código

  useEffect(() => {
    fetchTasks()
  }, [])

  async function fetchTasks() {
    const res = await fetch(`${API_URL}/tasks`)
    const data = await res.json()
    setTasks(data)
  }

  async function createTask(taskData) {
    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    })
    const newTask = await res.json()
    setTasks([...tasks, newTask])
    navigate('/') // Después de crear, vuelve a la lista
  }

  async function updateTask(id, taskData) {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    })
    const updated = await res.json()
    setTasks(tasks.map(t => t.id === updated.id ? updated : t))
    navigate('/') // Después de editar, vuelve a la lista
  }

  async function toggleTask(task) {
    const res = await fetch(`${API_URL}/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completada: !task.completada })
    })
    const updated = await res.json()
    setTasks(tasks.map(t => t.id === updated.id ? updated : t))
  }

  async function deleteTask(id) {
    await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' })
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <div className="container">
      <h1>Lista de Tareas</h1>

      {/* Routes define qué componente mostrar según la URL */}
      <Routes>

        {/* Ruta raíz: muestra la lista */}
        <Route
          path="/"
          element={
            <TaskList
              tasks={tasks}
              onDelete={deleteTask}
              onToggle={toggleTask}
            />
          }
        />

        {/* Ruta para crear tarea nueva */}
        <Route
          path="/new"
          element={<TaskForm onSave={createTask} />}
        />

        {/* Ruta para editar: el :id es dinámico, ej: /edit/3 */}
        <Route
          path="/edit/:id"
          element={
            <TaskForm
              onSave={updateTask}
              tasks={tasks}
            />
          }
        />

      </Routes>
    </div>
  )
}

export default App