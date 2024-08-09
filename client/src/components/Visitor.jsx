import React, { useState, useEffect } from 'react';

const Visit = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // Retrieve the visitor count from localStorage
    const count = localStorage.getItem('visitorCount');
    const newCount = count ? parseInt(count, 10) : 0;
    
    // Check if the visitor has already been counted in this session
    if (!sessionStorage.getItem('visited')) {
      const updatedCount = newCount + 1;
      setVisitorCount(updatedCount);
      localStorage.setItem('visitorCount', updatedCount);
      sessionStorage.setItem('visited', 'true');
    } else {
      setVisitorCount(newCount);
    }
  }, []);

  return (
    <footer>
      <p>Visitors: {visitorCount}</p>
    </footer>
  );
};

export default Visit;
