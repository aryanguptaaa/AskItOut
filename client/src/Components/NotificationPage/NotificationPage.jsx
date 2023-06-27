import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { BottomMenu, TopMenu } from '../Commons';
import Notification from './Notification';
import { fetchUser } from '../../api';

const NotificationPage = () => {
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

    // NOTIFICATIONS
    const notifications = fetchUser(1).notifications;

    return (
        <div className='bg-[#F2F2F2] w-full h-full'>
            <div id="notifications_header" className={`${isMobile ? '' : 'fixed top-0 z-20'} w-full h-16 px-4`}>
                {
                    isMobile ?
                        <TopMenu currentPage='notifications' fromPage='home' />
                        :
                        <div className='flex justify-between items-center'>
                            <NavLink to={'/'}><div className='text-2xl font-semibold'>AskItOut</div></NavLink>
                            <TopMenu currentPage='notifications' fromPage='home' />
                        </div>
                }
            </div>

            <div id="notifications_body" className={`${isMobile ? '' : 'pt-16'} flex justify-center items-start w-full h-full`}>
                <main className={`${isMobile ? 'h-full w-full' : 'h-[91vh] overflow-y-auto w-[50%] pb-[96px]'}`}>
                    <div id='feedArea' className={`bg-[#F2F2F2] flex flex-col py-2`}>
                        <div id='notificationList' className='flex flex-col items-center pt-4 w-full'>
                            {
                                notifications.map((notification, key) => (
                                    <Notification notification={notification} key={key} />
                                ))
                            }
                        </div>
                    </div>

                    <div id='bottomMenu' className="z-50 flex items-center justify-center absolute bottom-0 left-0 right-0 m-auto">
                        < BottomMenu currentPage='NotificationsPage' />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default NotificationPage
