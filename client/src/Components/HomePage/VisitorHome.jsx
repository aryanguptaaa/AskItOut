import React, { useState, useEffect } from 'react';
import VisitorNavbar from "./VisitorNavbar";

const VisitorHome = () => {

  // MOBILE OR DESKTOP?
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;
      setIsMobile(innerWidth <= 768);
    };

    // Add event listener to track window resize
    window.addEventListener('resize', handleResize);

    // Call handleResize initially
    handleResize();

    // Clean up the event listener when the component is unmounted
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return (
    <div className='bg-[#1b1b1b] w-full h-full text-white'>
      <VisitorNavbar />
    </div>
  )
}

export default VisitorHome
