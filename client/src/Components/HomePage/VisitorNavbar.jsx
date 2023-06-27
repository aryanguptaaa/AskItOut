import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

const VisitorNavbar = () => {

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
        <div className='bg-transparent w-full h-[60px] flex justify-between items-center px-4 sm:px-20 md:px-24 lg:px-32'>
            <div className='flex justify-start items-center'>
                <div id="Title" className='flex justify-center items-center pr-10 md:pr-14 lg:pr-32'>
                    <div id="logo"></div>
                    <NavLink><div id="name" className='text-[20px] font-bold'>AskItOut</div></NavLink>
                </div>
                <div className={`${isMobile ? 'hidden' : 'flex justify-center items-center gap-10 lg:gap-14 text-base font-extralight text-[#cecece]'}`}>
                    <div className='hover:text-white'>Home</div>
                    <div className='hover:text-white'>Features</div>
                    <div className='hover:text-white'>Pricing</div>
                    <div className='hover:text-white'>FAQ</div>
                </div>
            </div>
            <div className='h-[60px] flex justify-center items-center'>
                <Link to="/login" className='text-[#000000] visited:text-[#487faa]'>
                    <div className='bg-white hover:bg-slate-100 px-5 py-2 rounded-md'>
                        Sign In
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default VisitorNavbar
