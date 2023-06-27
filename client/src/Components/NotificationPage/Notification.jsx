import React from 'react'

const Notification = ({ notification }) => {
  return (
    <div className='flex flex-col px-8 py-5 w-full bg-white shadow-lg border-b-2 border-[#f2f2f2]'>
      {notification.message}
    </div>
  )
}

export default Notification
