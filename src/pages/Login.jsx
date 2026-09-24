import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers } from '../utils/storage';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return setError('All fields are required.');
    const users = getUsers();
    const found = users.find((u) => u.email === form.email && u.password === form.password);
    if (!found) return setError('Invalid email or password.');
    login(found);
    navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">✅ TaskMaster</div>
        <h2>Welcome Back</h2>
        <p className="auth-sub">Login to manage your tasks</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Your password" />
          </div>
          <button type="submit" className="btn btn-primary btn-full">Login</button>
        </form>
        <p className="auth-link">Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}
