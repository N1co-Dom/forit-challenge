import { useNavigate } from 'react-router-dom'
import TaskItem from './TaskItem'

function TaskList({ tasks, onDelete, onToggle }) {
  const navigate = useNavigate()

  if (tasks.length === 0) {
    return (
      <div>
        <button className="btn-primary" onClick={() => navigate('/new')}>
          + Nueva tarea
        </button>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          No hay tareas todavía.
        </p>
      </div>
    )
  }

  return (
    <div>
      <button
        className="btn-primary"
        style={{ marginBottom: '20px' }}
        onClick={() => navigate('/new')}
      >
        + Nueva tarea
      </button>
      <div className="task-list">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  )
}

export default TaskList