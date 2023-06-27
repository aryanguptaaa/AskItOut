import { Link } from 'react-router-dom';
import Welcome_image_3 from '../../Assets/images/Welcome/Welcome_image_3.png';

export default function Welcome1() {
  return (
    <div className='flex flex-col justify-around items-center w-full h-screen'>
      <h2 className='text-3xl font-semibold text-center'>AskItOut</h2>

      <img src={Welcome_image_3} alt="Welcome Home Page 3" className='max-w-[350px] max-h-[261.85px] sm:max-w-[600px] sm:max-h-[448.8px] content-center' />

      <div>
        <p className='text-2xl text-center'>Earn Points For</p>
        <p className='text-2xl text-center'>Helping Your Juniors</p>
      </div>

      <div className='relative inline-flex justify-center items-center'>
        <div>
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M81.5942 26.3296C89.597 31.4622 95.5101 39.2774 98.2733 48.3742L95.1964 49.3088C92.6553 40.9433 87.2177 33.7564 79.8582 29.0365L81.5942 26.3296Z" fill="black"/>
            <path d="M47.2379 22.0906C56.2483 19.0573 66.0445 19.3325 74.8704 22.8669L73.6749 25.8521C65.5586 22.6018 56.5499 22.3487 48.2639 25.1382L47.2379 22.0906Z" fill="#CCCCCC"/>
            <path d="M22.2439 46.7912C25.3834 37.8173 31.6166 30.255 39.8261 25.46L41.448 28.2367C33.8984 32.6462 28.1663 39.6006 25.2792 47.8531L22.2439 46.7912Z" fill="#CCCCCC"/>
          </svg>
        </div>

        <Link to='/' className='bg-black w-[60px] h-[60px] rounded-full flex justify-center items-center absolute'>
          <button>
            <span className='text-white text-2xl font-semibold '>Go</span>
          </button>
        </Link>
      </div>
    </div>
  )
}
