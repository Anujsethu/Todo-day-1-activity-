import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getTodos, saveTodos } from '../utils/storage';
import Navbar from '../components/Navbar';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import SearchBar from '../components/SearchBar';

const PRIORITY_ORDER = { High: 1, Medium: 2, Low: 3 };

export default function Dashboard() {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [search, setSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('createdDate');
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const all = getTodos();
    setTodos(all.filter((t) => t.userEmail === user.email));
  }, [user.email]);

  const persist = (updated) => {
    const others = getTodos().filter((t) => t.userEmail !== user.email);
    saveTodos([...others, ...updated]);
    setTodos(updated);
  };

  const handleAdd = (form) => {
    const newTodo = {
      id: Date.now().toString(),
      userEmail: user.email,
      title: form.title,
      description: form.description,
      priority: form.priority,
      dueDate: form.dueDate,
      status: 'Pending',
      createdDate: new Date().toLocaleDateString('en-GB'),
    };
    persist([...todos, newTodo]);
    setShowForm(false);
  };

  const handleEdit = (form) => {
    const updated = todos.map((t) =>
      t.id === editTodo.id ? { ...t, ...form } : t
    );
    persist(updated);
    setEditTodo(null);
  };

  const handleDelete = (id) => {
    persist(todos.filter((t) => t.id !== id));
    setDeleteId(null);
  };

  const handleToggle = (id) => {
    const updated = todos.map((t) =>
      t.id === id ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' } : t
    );
    persist(updated);
  };

  const filtered = todos
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => filterPriority === 'All' || t.priority === filterPriority)
    .filter((t) => filterStatus === 'All' || t.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === 'priority') return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      if (sortBy === 'dueDate') return new Date(a.dueDate) - new Date(b.dueDate);
      return new Date(b.id) - new Date(a.id);
    });

  const counts = {
    total: todos.length,
    pending: todos.filter((t) => t.status === 'Pending').length,
    completed: todos.filter((t) => t.status === 'Completed').length,
  };

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>Welcome, {user.name}! 👋</h1>
            <p className="dashboard-sub">Here's your task overview</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Add Todo</button>
        </div>

        <div className="stats-row">
          <div className="stat-card"><span className="stat-num">{counts.total}</span><span>Total</span></div>
          <div className="stat-card stat-pending"><span className="stat-num">{counts.pending}</span><span>Pending</span></div>
          <div className="stat-card stat-done"><span className="stat-num">{counts.completed}</span><span>Completed</span></div>
        </div>

        <div className="controls">
          <SearchBar value={search} onChange={setSearch} />
          <div className="filters">
            <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
              <option value="All">All Priorities</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="All">All Status</option>
              <option>Pending</option>
              <option>Completed</option>
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="createdDate">Sort: Newest</option>
              <option value="priority">Sort: Priority</option>
              <option value="dueDate">Sort: Due Date</option>
            </select>
          </div>
        </div>

        <TodoList
          todos={filtered}
          onEdit={(todo) => setEditTodo(todo)}
          onDelete={(id) => setDeleteId(id)}
          onToggle={handleToggle}
        />
      </div>

      {showForm && (
        <TodoForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />
      )}
      {editTodo && (
        <TodoForm initial={editTodo} onSubmit={handleEdit} onCancel={() => setEditTodo(null)} />
      )}
      {deleteId && (
        <div className="modal-overlay">
          <div className="modal confirm-modal">
            <h3>Delete Todo?</h3>
            <p>This action cannot be undone.</p>
            <div className="form-actions">
              <button className="btn btn-outline" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteId)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
