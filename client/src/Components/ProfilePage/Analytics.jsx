import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

const Analytics = ({ graphData }) => {
    // const [isMobile, setIsMobile] = useState(false);
    const [graphCategory, setGraphCategory] = useState('asked');
    const [graphWidth, setGraphWidth] = useState(300);

    useEffect(() => {
        const handleResize = () => {
            const { innerWidth } = window;
            let graphWidth = innerWidth - 105;
            if (innerWidth > 600) {
                graphWidth = 600;
            }
            setGraphWidth(graphWidth);
            // setIsMobile(innerWidth <= 768);
        };

        // Add event listener to track window resize
        window.addEventListener('resize', handleResize);

        // Call handleResize initially
        handleResize();

        // Clean up the event listener when the component is unmounted
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    const askedQuestionData = graphData.asked;
    const answeredQuestionData = graphData.answered;

    return (
        <div id="graph_display" className='bg-white h-[230px] rounded-2xl w-full px-4'>

            <div id="graph_head" className={`flex justify-between  mobile:justify-start mobile:gap-4 items-center py-2`}>
                <div id="analytics" className='flex justify-center items-center gap-1'>
                    <div>
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.0303 17L7.0303 13" stroke="#A8A8A8" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M12.052 17L12.052 7" stroke="#A8A8A8" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M17.0736 17L17.0736 11" stroke="#A8A8A8" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M2.51082 12C2.51082 7.52166 2.51082 5.28249 3.90808 3.89124C5.30535 2.5 7.55422 2.5 12.052 2.5C16.5497 2.5 18.7985 2.5 20.1958 3.89124C21.5931 5.28249 21.5931 7.52166 21.5931 12C21.5931 16.4783 21.5931 18.7175 20.1958 20.1088C18.7985 21.5 16.5497 21.5 12.052 21.5C7.55422 21.5 5.30535 21.5 3.90808 20.1088C2.51082 18.7175 2.51082 16.4783 2.51082 12Z" stroke="#A8A8A8" strokeWidth="1.5" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className={`hidden mobile:block whitespace-nowrap text-sm text-[#A8A8A8]`}>
                        Analytics
                    </div>
                </div>

                <div id="current_month" className='flex justify-center items-center gap-1'>
                    <div>
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.5059 8C11.5059 9.65685 10.1628 11 8.50593 11C6.84908 11 5.50593 9.65685 5.50593 8C5.50593 6.34315 6.84908 5 8.50593 5C10.1628 5 11.5059 6.34315 11.5059 8Z" fill="#1C1C1C" />
                        </svg>
                    </div>
                    <div className={`whitespace-nowrap text-xs`}>
                        Current Month
                    </div>
                </div>

                <div id="previous_month" className='flex justify-center items-center gap-1'>
                    <div>
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.2705 8C11.2705 9.65685 9.92736 11 8.27051 11C6.61365 11 5.27051 9.65685 5.27051 8C5.27051 6.34315 6.61365 5 8.27051 5C9.92736 5 11.2705 6.34315 11.2705 8Z" fill="#A8C5DA" />
                        </svg>
                    </div>
                    <div className={`whitespace-nowrap text-xs`}>
                        Previous Month
                    </div>
                </div>
            </div>

            <div id="graph_options" className={`flex justify-start gap-4 items-center py-2`}>
                <div id="graph_asked_option" className={`${graphCategory === 'asked' && 'text-black border-b-2 border-black'} px-1 text-sm text-[#A8A8A8] cursor-pointer`} onClick={() => setGraphCategory('asked')}>
                    Asked
                </div>
                <div id="graph_answered_option" className={`${graphCategory === 'answered' && 'text-black border-b-2 border-black'} px-1 text-sm text-[#A8A8A8] cursor-pointer`} onClick={() => setGraphCategory('answered')}>
                    Answered
                </div>
            </div>

            <div id="graph">
                {
                    <LineChart data={graphCategory === 'asked' ? askedQuestionData : answeredQuestionData} width={graphWidth} height={150} >
                        <Line type="monotone" dataKey='previous' stroke="#000000" strokeWidth={2} />
                        <Line type="monotone" dataKey='current' stroke="#A8C5DA" strokeWidth={2} />
                        <CartesianGrid stroke="#F2F2F2" strokeWidth="1" />
                        <XAxis dataKey="name" color="#A8A8A8" />
                        <YAxis />
                    </LineChart>
                }
            </div>
        </div>
    )
}

export default Analytics;
