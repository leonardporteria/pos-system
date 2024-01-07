import { useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import Admin from '../admin/Admin';
import Manager from '../manager/Manager';
import Cashier from '../cashier/Cashier';

import './Auth.scss';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginMode, setLoginMode] = useState('cashier');

  const handleLogin = async () => {
    console.log(loginMode);
    navigate(`/${loginMode}`);
  };

  const shouldRenderLogin =
    !location.pathname.startsWith('/admin') &&
    !location.pathname.startsWith('/manager') &&
    !location.pathname.startsWith('/cashier');

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
            <input type='text' placeholder={`${loginMode} Name`} />
            <input type='password' placeholder='Password' />
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
        <Route path='/' element={<div>/</div>} />
        <Route path='/*' element={<div>/as</div>} />
        <Route path='/admin/*' element={<Admin />} />
        <Route path='/manager/*' element={<Manager />} />
        <Route path='/cashier/*' element={<Cashier />} />
      </Routes>
    </div>
  );
};

export default Auth;
