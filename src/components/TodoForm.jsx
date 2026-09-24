import { useState, useEffect } from 'react';

const empty = { title: '', description: '', priority: 'Medium', dueDate: '' };

export default function TodoForm({ onSubmit, onCancel, initial }) {
  const [form, setForm] = useState(initial || empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initial || empty);
  }, [initial]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required.';
    if (!form.dueDate) e.dueDate = 'Due date is required.';
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) return setErrors(e2);
    onSubmit(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{initial ? 'Edit Todo' : 'Add New Todo'}</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>Title *</label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="Task title" />
            {errors.title && <span className="error">{errors.title}</span>}
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Task description" rows={3} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Priority</label>
              <select name="priority" value={form.priority} onChange={handleChange}>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div className="form-group">
              <label>Due Date *</label>
              <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
              {errors.dueDate && <span className="error">{errors.dueDate}</span>}
            </div>
          </div>
          {initial && (
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option>Pending</option>
                <option>Completed</option>
              </select>
            </div>
          )}
          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary">{initial ? 'Save Changes' : 'Add Todo'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
