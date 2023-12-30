import { useState } from 'react';

const Auth = () => {
  const [loginMode, setLoginMode] = useState('cashier');

  const toggleLoginMode = () => {
    setLoginMode((prevMode) => (prevMode === 'cashier' ? 'admin' : 'cashier'));
  };

  return (
    <div className='Auth'>
      <h1>{loginMode === 'cashier' ? 'Cashier Login' : 'Admin Login'}</h1>
      <div className='Auth__Input'>
        <input type='text' placeholder='Cashier Name' />
        <input type='password' placeholder='Password' />
        <button>Login</button>
      </div>
      <div className='Auth__Other'>
        <p>Login as</p>
        <a href='#' onClick={toggleLoginMode}>
          {loginMode === 'cashier' ? 'Admin' : 'Cashier'}
        </a>
      </div>
    </div>
  );
};

export default Auth;
