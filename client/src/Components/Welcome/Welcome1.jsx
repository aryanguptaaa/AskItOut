import { Link } from 'react-router-dom';

import Welcome_image_1 from '../../Assets/images/Welcome/Welcome_image_1.png';

export default function Welcome1() {
  return (
    <div className='flex flex-col justify-around items-center w-full h-screen'>
      <h2 className='text-3xl font-semibold text-center'>AskItOut</h2>

      <img src={Welcome_image_1} alt="Welcome Home Page 1" className='max-w-[350px] max-h-[261.85px] sm:max-w-[600px] sm:max-h-[448.8px] content-center' />

      <div>
        <p className='text-2xl text-center'>Sharing Answers</p>
        <p className='text-2xl text-center'>Improves Your Confidence</p>
      </div>

      <div className='relative inline-flex justify-center items-center'>
        <div>
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M81.5941 26.3296C89.597 31.4622 95.51 39.2774 98.2732 48.3742L95.1964 49.3088C92.6553 40.9433 87.2176 33.7564 79.8581 29.0365L81.5941 26.3296Z" fill="#E5E5E5"/>
            <path d="M47.2379 22.0906C56.2483 19.0572 66.0445 19.3325 74.8704 22.8669L73.6749 25.8521C65.5586 22.6018 56.5499 22.3487 48.2639 25.1382L47.2379 22.0906Z" fill="#E5E5E5"/>
            <path d="M22.2438 46.7912C25.3833 37.8173 31.6166 30.255 39.8261 25.46L41.4479 28.2367C33.8984 32.6462 28.1662 39.6006 25.2791 47.8531L22.2438 46.7912Z" fill="black"/>
          </svg>
        </div>

        <Link to='/welcome2' className='bg-black w-[60px] h-[60px] rounded-full flex justify-center items-center absolute'>
          <button>
            <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M31.0607 13.0607C31.6464 12.4749 31.6464 11.5251 31.0607 10.9393L21.5147 1.3934C20.9289 0.807611 19.9792 0.807611 19.3934 1.3934C18.8076 1.97919 18.8076 2.92893 19.3934 3.51472L27.8787 12L19.3934 20.4853C18.8076 21.0711 18.8076 22.0208 19.3934 22.6066C19.9792 23.1924 20.9289 23.1924 21.5147 22.6066L31.0607 13.0607ZM0 13.5H30V10.5H0V13.5Z" fill="white"/>
            </svg>
          </button>
        </Link>
      </div>
    </div>
  )
}
