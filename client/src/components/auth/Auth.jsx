import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import SNAPSHOP_LOGO from '../../assets/snapshop-04.png';

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
      setLoginMode(userRole);

      if (userRole !== loginMode) {
        const redirectPath =
          decodedToken.role === 'admin'
            ? '/admin/dashboard'
            : `/${decodedToken.role}`;
        navigate(redirectPath);
      } else if (
        loginMode === 'admin' &&
        location.pathname.startsWith('/admin')
      ) {
        return;
      } else if (
        loginMode === 'manager' &&
        location.pathname.startsWith('/manager')
      ) {
        return;
      } else {
        const redirectPath = `/${userRole}`;
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
        const redirectPath =
          decodedToken.role === 'admin'
            ? '/admin/dashboard'
            : `/${decodedToken.role}`;

        navigate(redirectPath);
      } else {
        // Handle authentication error
        alert('Authentication failed');
        console.error('Authentication failed');
      }
    } catch (error) {
      alert(error);
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
          <img src={SNAPSHOP_LOGO} alt='' />
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
            <div>
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
        <Route path='/*' element={<div></div>} />
      </Routes>
    </div>
  );
};

export default Auth;
