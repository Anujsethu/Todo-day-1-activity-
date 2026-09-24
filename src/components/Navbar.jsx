import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">✅ TaskMaster</div>
      <div className="navbar-right">
        {user && (
          <>
            <span className="navbar-user">👤 {user.name}</span>
            <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
