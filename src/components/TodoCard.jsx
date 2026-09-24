const priorityClass = { High: 'priority-high', Medium: 'priority-medium', Low: 'priority-low' };
const statusClass = { Pending: 'status-pending', Completed: 'status-completed' };

export default function TodoCard({ todo, onEdit, onDelete, onToggle }) {
  return (
    <div className={`todo-card ${todo.status === 'Completed' ? 'card-completed' : ''}`}>
      <div className="card-header">
        <h3 className="card-title">{todo.title}</h3>
        <span className={`badge ${priorityClass[todo.priority]}`}>{todo.priority}</span>
      </div>
      {todo.description && <p className="card-desc">{todo.description}</p>}
      <div className="card-meta">
        <span>📅 Due: {todo.dueDate}</span>
        <span>🗓 Created: {todo.createdDate}</span>
      </div>
      <div className="card-footer">
        <span className={`badge ${statusClass[todo.status]}`}>{todo.status}</span>
        <div className="card-actions">
          <button className="btn btn-sm btn-outline" onClick={() => onEdit(todo)}>✏️ Edit</button>
          <button className="btn btn-sm btn-toggle" onClick={() => onToggle(todo.id)}>
            {todo.status === 'Completed' ? '↩ Pending' : '✔ Complete'}
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => onDelete(todo.id)}>🗑 Delete</button>
        </div>
      </div>
    </div>
  );
}
