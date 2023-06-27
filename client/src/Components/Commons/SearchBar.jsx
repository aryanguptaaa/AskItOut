import React, { useState, useEffect } from 'react';
import SearchSnake from './../../Assets/images/SearchSnake.png';
import './../../styles/SearchArea.css';

const SearchBar = ({ placeholder, searchdata }) => {

    // MOBILE OR DESKTOP
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

    // FILTER DATA
    const [filteredData, setFilteredData] = useState([])

    const handleFilter = (event) => {
        const searchWord = event.target.value

        // --------------- Replace with our filter algorithm ----------------
        let newFilter = searchdata.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });
        // ----------------------------

        if (searchWord === '') {
            newFilter = []
        }

        setFilteredData(newFilter.slice(0, 4));
        searchWord.length !== 0 && setIsSearchActive(true);
        newFilter.length === 0 && setIsSearchActive(false);
    }

    // IS SEARCH BOX ACTIVE
    const [isSearchActive, setIsSearchActive] = useState(false);

    return (
        <div id='search' className={`w-full px-4 mt-2`}>
            <div className="searchInputs w-full flex items-center justify-center bg-white p-4 h-12 hover:border-[#0090FC] border-2 rounded-full">
                <div className="searchIcon">
                    <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.4344 17.5L23.082 22" stroke="#A8A8A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M21.0164 11C21.0164 6.02944 16.8549 2 11.7213 2C6.58779 2 2.42624 6.02944 2.42624 11C2.42624 15.9706 6.58779 20 11.7213 20C16.8549 20 21.0164 15.9706 21.0164 11Z" stroke="#A8A8A8" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                </div>
                <input type="text" placeholder={placeholder} onChange={handleFilter} className='w-full px-4 h-10 font-base text-[14px] border-none text-sm font-light focus:outline-none' />
            </div>
            <div className={`${ isSearchActive? "block" : "hidden" } dataresults w-full ${isMobile ? "" : ""} bg-[#f2f2f2] mt-3 border-2 rounded-[20px] overflow-hidden overflow-y-auto flex flex-col justify-center items-center`}>
                {
                    filteredData.length === 0 && !isMobile ?
                        <div>
                            <img src={SearchSnake} alt="Search Snake" />
                            <p className='text-sm text-gray-500 px-4 text-center'>Type above to make me search your question!</p>
                        </div>
                        :
                        <div className='w-full h-full flex flex-col justify-start items-start'>
                            {
                                (filteredData.slice(0, 10).map((value, key) => { // Show only top 10 results
                                    return (
                                        <div className='w-full bg-white p-3 last:rounded-b-[20px] hover:bg-[#f2f2f2]' key={key}>
                                            <a href={value.link} target='_blank' rel="noreferrer">
                                            <p>{value.title}</p>
                                        </a>
                                        </div>
                                    );
                                }))
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default SearchBar