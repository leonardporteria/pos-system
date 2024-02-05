import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Admin from '../admin/Admin';
import Manager from '../manager/Manager';
import Cashier from '../cashier/Cashier';
import NotFound from '../error/NotFound';
import './Auth.scss';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginMode, setLoginMode] = useState('cashier');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;

      if (userRole !== loginMode) {
        // If the user's role doesn't match the current loginMode, redirect to the correct URL
        const redirectPath =
          userRole === 'admin' ? '/admin/dashboard' : `/${userRole}`;
        navigate(redirectPath);
      } else if (
        (loginMode === 'admin' && !location.pathname.startsWith('/admin')) ||
        (loginMode === 'manager' &&
          !location.pathname.startsWith('/manager')) ||
        (loginMode === 'cashier' && !location.pathname.startsWith('/cashier'))
      ) {
        // If the user's role matches the loginMode, but the path is not a protected route, redirect to the appropriate URL
        const redirectPath =
          userRole === 'admin' ? '/admin/dashboard' : `/${userRole}`;
        navigate(redirectPath);
      }
    } else {
      navigate('/');
    }
  }, [navigate, location.pathname, loginMode]);

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role: loginMode }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;

        localStorage.setItem('token', token);

        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        const redirectPath =
          decodedToken.role === 'admin'
            ? '/admin/dashboard'
            : `/${decodedToken.role}`;

        navigate(redirectPath);
      } else {
        // Handle authentication error
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  const shouldRenderLogin =
    !localStorage.getItem('token') ||
    (!location.pathname.startsWith('/admin') &&
      !location.pathname.startsWith('/manager') &&
      !location.pathname.startsWith('/cashier') &&
      location.pathname !== '/*');

  return (
    <div className='Auth'>
      {shouldRenderLogin && (
        <>
          <h1>
            {loginMode === 'cashier'
              ? 'Cashier Login'
              : loginMode === 'manager'
              ? 'Manager Login'
              : 'Admin Login'}
          </h1>
          <div className='Auth__Input'>
            <input
              type='text'
              placeholder={`Username`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
          <div className='Auth__Other'>
            <p>Login as</p>
            {loginMode !== 'cashier' && (
              <button onClick={() => setLoginMode('cashier')}>Cashier</button>
            )}
            {loginMode !== 'manager' && (
              <button onClick={() => setLoginMode('manager')}>Manager</button>
            )}
            {loginMode !== 'admin' && (
              <button onClick={() => setLoginMode('admin')}>Admin</button>
            )}
          </div>
        </>
      )}
      <Routes>
        <Route
          path='/admin/*'
          element={localStorage.getItem('token') ? <Admin /> : <NotFound />}
        />
        <Route
          path='/manager/*'
          element={localStorage.getItem('token') ? <Manager /> : <NotFound />}
        />
        <Route
          path='/cashier/*'
          element={localStorage.getItem('token') ? <Cashier /> : <NotFound />}
        />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Auth;
