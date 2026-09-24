import TodoCard from './TodoCard';

export default function TodoList({ todos, onEdit, onDelete, onToggle }) {
  if (!todos.length) {
    return <div className="empty-state">No todos found. Add one to get started! 🎯</div>;
  }
  return (
    <div className="todo-grid">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </div>
  );
}
