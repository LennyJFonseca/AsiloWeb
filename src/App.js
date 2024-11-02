import React, { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import PatientList from './PatientList';
import PatientDetail from './PatientDetail';

function App() {
  const [role, setRole] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    setLoggedIn(false);
    setError('');
  };

  const handleLogin = (username, password) => {
    if (role === 'Empleado' && username === 'empleado' && password === 'emple1234') {
      setLoggedIn(true);
      setError('');
    } else if (role === 'Visitante' && username === 'visitante' && password === 'visi1234') {
      setLoggedIn(true);
      setError('');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setRole('');
  };

  return (
    <Router>
      <div className="App">
        {!loggedIn ? (
          !role ? (
            <Welcome onRoleSelect={handleRoleSelection} />
          ) : role === 'Empleado' ? (
            <LoginEmpleado onLogin={handleLogin} error={error} />
          ) : (
            <LoginVisitante onLogin={handleLogin} error={error} />
          )
        ) : (
          <Routes>
            <Route path="/patients" element={<PatientList />} />
            <Route path="/patient/:id" element={<PatientDetail role={role} />} />
            <Route path="/" element={<Dashboard role={role} onLogout={handleLogout} />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}
const Welcome = ({ onRoleSelect }) => {
  return (
    <div className="welcome-container">
      <h1>Bienvenido al Asilo Casa Tranquila</h1>
      <div className="profile-picture-container">
        <img src="/asiloimageninicio.jpg" alt="ImgWelcome" className="menu-picture" />
      </div>
      <p>Por favor, selecciona cómo deseas ingresar:</p>
      <div className="button-group">
        <button onClick={() => onRoleSelect('Empleado')}>Empleado</button>
        <button onClick={() => onRoleSelect('Visitante')}>Visitante</button>
      </div>
    </div>
  );
};



const LoginEmpleado = ({ onLogin, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="login-container">
      <h1>Login Empleado</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
      <div>
  <label>Usuario: </label>
  <input 
    type="text" 
    className="input" 
    value={username} 
    onChange={(e) => setUsername(e.target.value)} 
    required 
  />
</div>
<div>
  <label>Contraseña: </label>
  <input 
    type="password" 
    className="input" 
    value={password} 
    onChange={(e) => setPassword(e.target.value)} 
    required 
  />
</div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};


const LoginVisitante = ({ onLogin, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="login-container">
      <h1>Login Visitante</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
      <div>
  <label>Usuario: </label>
  <input 
    type="text" 
    className="input" 
    value={username} 
    onChange={(e) => setUsername(e.target.value)} 
    required 
  />
</div>
<div>
  <label>Contraseña: </label>
  <input 
    type="password" 
    className="input" 
    value={password} 
    onChange={(e) => setPassword(e.target.value)} 
    required 
  />
</div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};


const Dashboard = ({ role, onLogout }) => {
  return (
    <div className="dashboard-container">
      <h1>{role} Dashboard</h1>
      <p>Bienvenido, {role}. Aquí puedes acceder a la información correspondiente.</p>
      <Link to="/patients">Ir a la lista de pacientes</Link>
    </div>
  );
};


export default App;