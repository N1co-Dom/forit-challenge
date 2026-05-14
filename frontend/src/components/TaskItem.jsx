import { useNavigate } from 'react-router-dom'

function TaskItem({ task, onDelete, onToggle }) {
  const navigate = useNavigate()

  return (
    <div className={`task-item ${task.completada ? 'completada' : ''}`}>
      <div className="task-info">
        <h3>{task.titulo}</h3>
        <p>{task.descripcion}</p>
      </div>
      <div className="task-actions">
        <button className="btn-success" onClick={() => onToggle(task)}>
          {task.completada ? 'Deshacer' : 'Completar'}
        </button>
        <button className="btn-primary" onClick={() => navigate(`/edit/${task.id}`)}>
          Editar
        </button>
        <button className="btn-danger" onClick={() => onDelete(task.id)}>
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default TaskItem