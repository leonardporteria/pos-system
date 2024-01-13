const Cashier = () => {
  return (
    <div className='Cashier'>
      <div className='Cashier__Header'>
        <div className='Cashier__Header__Details'>SnapShot</div>
        <div className='Cashier__Header__User'>User</div>
      </div>
      <div className='Cashier__Main'>
        <div className='Cashier__Main__Preview'>
          <div className='Cashier__Main__Preview__Receipt'></div>
          <div className='Cashier__Main__Preview__Confirm'>cancel pay</div>
        </div>
        <div className='Cashier__Main__Action'>
          <div className='Cashier__Main__Action__Buttons'></div>
          <div className='Cashier__Main__Action__Numpad'></div>
        </div>
      </div>
    </div>
  );
};

export default Cashier;
