import { useNavigate } from 'react-router-dom';

import './Cashier.scss';

const Cashier = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className='Cashier'>
      <div className='Cashier__Header'>
        <div className='Cashier__Header__Details'>SnapShot Cashier</div>
      </div>

      <div className='Cashier__Main'>
        <h1>This page is not available</h1>

        <p onClick={handleLogout}>go back to login</p>
      </div>
    </div>
  );
};

export default Cashier;
