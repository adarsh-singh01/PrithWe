import React, { useEffect } from 'react';
import '../App.css';

function Spinner({ setLoading, delay = 1500 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [setLoading, delay]);

  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
}

export default Spinner;
