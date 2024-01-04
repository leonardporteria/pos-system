import { useRef, useState, useEffect } from 'react';
import Quagga from 'quagga';

const Dashboard = () => {
  const videoRef = useRef(null);
  const [code, setCode] = useState('asd');

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: videoRef.current,
        },
        decoder: {
          readers: ['ean_reader'], // You can add more readers based on the barcode types you want to support
        },
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      }
    );

    // Specify cleanup function
    return () => {
      Quagga.stop();
    };
  }, []); // Empty dependency array to ensure useEffect runs only once

  Quagga.onDetected((result) => {
    console.log('Barcode detected and processed', result.codeResult.code);
    setCode(result.codeResult.code);
  });

  return (
    <div className='Dashboard'>
      Dashboard
      <video ref={videoRef} style={{ width: '100%', height: '10rem' }} />
      <h1>{code}</h1>
    </div>
  );
};

export default Dashboard;
