import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import translations from './translations'
import './index.css'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const [tasks, setTasks] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [lang, setLang] = useState('es') // 'es' o 'en'
  const navigate = useNavigate()

  // t es el diccionario del idioma activo
  const t = translations[lang]

  useEffect(() => { fetchTasks() }, [])

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [darkMode])

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
    navigate('/')
  }

  async function updateTask(id, taskData) {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    })
    const updated = await res.json()
    setTasks(tasks.map(t => t.id === updated.id ? updated : t))
    navigate('/')
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
      {/* Controles fijos arriba a la derecha */}
      <div style={{ position: 'fixed', top: '16px', right: '16px', display: 'flex', gap: '8px', alignItems: 'center', zIndex: 1000 }}>
        {/* Toggle de idioma */}
        <button
          className="dark-toggle"
          onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
        >
          {lang === 'es' ? '🇺🇸 English' : '🇦🇷 Español'}
        </button>

        {/* Toggle de dark mode */}
        <button
          className="dark-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? t.lightMode : t.darkMode}
        </button>
      </div>

      <h1>{t.appTitle}</h1>

      <Routes>
        <Route
          path="/"
          element={
            <TaskList
              tasks={tasks}
              onDelete={deleteTask}
              onToggle={toggleTask}
              t={t}
            />
          }
        />
        <Route
          path="/new"
          element={<TaskForm onSave={createTask} t={t} />}
        />
        <Route
          path="/edit/:id"
          element={<TaskForm onSave={updateTask} tasks={tasks} t={t} />}
        />
      </Routes>
    </div>
  )
}

export default App