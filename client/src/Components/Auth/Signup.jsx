import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signup } from './../../actions/auth';
import { useDispatch } from 'react-redux';

export default function Signup() {

  /**
   * HANDLE SHOW/HIDE PASSWORD
   */
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Toggle view password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  // Toggle view confirm password
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  /**
   * FORM DATA
   */
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [about, setAbout] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [conditionsAgreed, setConditionsAgreed] = useState(false);
  const [isNotRobot, setIsNotRobot] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])(?=.*[a-zA-Z0-9]).{8,}$/;

    if (password !== '') {
      if (passwordPattern.test(password)) {
        document.getElementById('password').style.borderColor = 'green';
        document.getElementById('notStrongPassword').innerText = '';
      } else {
        document.getElementById('password').style.borderColor = 'red';
        document.getElementById('notStrongPassword').innerText = 'Password should be at least 8 characters long and must contain atleast one lowercase alphabet, one uppercase alphabet, one special character, and one number.'
      }
    } else {
      document.getElementById('password').style.borderColor = '';
      document.getElementById('notStrongPassword').innerText = '';
    }

    if (confirmedPassword !== '') {
      if (password === confirmedPassword) {
        document.getElementById('confirmPassword').style.borderColor = 'green';
        document.getElementById('passwordNotMatched').innerText = '';

      } else {
        document.getElementById('confirmPassword').style.borderColor = 'red';
        document.getElementById('passwordNotMatched').innerText = 'Password must be same!';
      }
    } else {
      document.getElementById('confirmPassword').style.borderColor = '';
      document.getElementById('passwordNotMatched').innerText = '';

    }

  }, [password, confirmedPassword])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (firstName === '') {
      toast.error('Enter your first name!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (lastName === '') {
      toast.error('Enter your last name!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (email === '') {
      toast.error('Enter your email!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (password === '') {
      toast.error('Enter password!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (confirmedPassword === '') {
      toast.error('Confirm your password!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (conditionsAgreed === false) {
      toast.error('Agree to user agreements and privacy policy!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (isNotRobot === false) {
      toast.error('Confirm that you are not robot!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      dispatch(signup({ firstName, lastName, email, about, password }, navigate)) 
    }
  }

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center bg-[#f2f2f2]'>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className='flex flex-col justify-center items-center px-4 py-5 rounded-[30px] max-w-[300px] sm:max-w-[400px] max-h-[800px] bg-white shadow-lg'>
        <form onSubmit={handleSubmit}>
          <h2 className='text-3xl font-semibold mb-1'>Sign Up</h2>
          <p className='text-base font-medium mb-4 text-[#727986]'>Enter your details to create your AskItOut Account:</p>

          <div className='flex justify-between gap-1'>
            <div className='flex flex-col mb-4 max-w-[132px] sm:max-w-[200px]'>
              <label htmlFor="firstName" className='text-sm font-semibold mb-2.5'>First Name*</label>
              <input type="text" id='firstName' name='firstName' placeholder='Natasha' className='border hover:border-[#0090FC] p-2 rounded-[10px] text-sm font-light h-[30px] focus:outline-none' onChange={(e) => { setFirstName(e.target.value) }} />
            </div>

            <div className='flex flex-col mb-4 max-w-[132px] sm:max-w-[200px]'>
              <label htmlFor="lastName" className='text-sm font-semibold mb-2.5'>Last Name*</label>
              <input type="text" id='lastName' name='lastName' placeholder='Rathi' className='border hover:border-[#0090FC] p-2 rounded-[10px] text-sm font-light h-[30px] focus:outline-none' onChange={(e) => { setLastName(e.target.value) }} />
            </div>
          </div>

          <div className='flex flex-col mb-4'>
            <label className='text-sm font-semibold mb-2.5' htmlFor="email">Email*</label>
            <input className='border hover:border-[#0090FC] p-2 rounded-[10px] text-sm font-light h-[30px] focus:outline-none' type="email" id='email' name='email' placeholder='natasha.rathi@outlook.com' onChange={(e) => { setEmail(e.target.value) }} />
          </div>

          <div className='flex flex-col mb-4'>
            <label htmlFor="about" className='text-sm font-semibold mb-2.5'>About</label>
            <input className='border hover:border-[#0090FC] p-2 rounded-[10px] text-sm font-light h-[30px] focus:outline-none' id='about' name='about' type="text" placeholder='Rusty Crab oxidising doubts on my shell.' onChange={(e) => { setAbout(e.target.value) }} />
          </div>

          <div>
            <div className='flex flex-col mb-4 relative'>
              <label htmlFor='password' className='text-sm font-semibold mb-2.5'>Password*</label>
              <input id='password' name='password' className='border hover:border-[#0090FC] p-2 rounded-[10px] text-sm font-light h-[30px] focus:outline-none' type={(showPassword === false) ? "password" : "text"} placeholder='*********' pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])(?=.*[a-zA-Z0-9]).{8,}$" onChange={(e) => { setPassword(e.target.value) }} />
              <div className='absolute right-2 top-10 cursor-pointer'>
                {
                  (showPassword === false) ?
                    <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={toggleShowPassword}>
                      <path d="M14.6667 1.33334C14.6667 1.33334 12 5.33334 8.00004 5.33334C4.00004 5.33334 1.33337 1.33334 1.33337 1.33334" stroke="#2A353D" strokeLinecap="round" />
                      <path d="M10 5L11 6.66667" stroke="#2A353D" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M13.3334 3.33334L14.6667 4.66667" stroke="#2A353D" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M1.33337 4.66667L2.66671 3.33334" stroke="#2A353D" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6 5L5 6.66667" stroke="#2A353D" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    :
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={toggleShowPassword}>
                      <path d="M14.3623 5.36333C14.565 5.64754 14.6663 5.78965 14.6663 6C14.6663 6.21036 14.565 6.35247 14.3623 6.63668C13.4516 7.91371 11.1258 10.6667 7.99967 10.6667C4.87353 10.6667 2.54774 7.91371 1.63704 6.63668C1.43435 6.35247 1.33301 6.21036 1.33301 6C1.33301 5.78965 1.43435 5.64754 1.63703 5.36333C2.54774 4.0863 4.87353 1.33334 7.99967 1.33334C11.1258 1.33334 13.4516 4.0863 14.3623 5.36333Z" stroke="#2A353D" />
                      <path d="M10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8C9.10457 8 10 7.10457 10 6Z" stroke="#2A353D" />
                    </svg>
                }
              </div>
              <div id="notStrongPassword" className='text-red-700 text-xs pt-1 px-2'></div>
            </div>
            <div className='flex flex-col mb-4 relative'>
              <label htmlFor='confirmPassword' className='text-sm font-semibold mb-2.5'>Confirm Password*</label>
              <input id='confirmPassword' name='confirmPassword' className='border hover:border-[#0090FC] p-2 rounded-[10px] text-sm font-light h-[30px] focus:outline-none' type={(showConfirmPassword === false) ? "password" : "text"} placeholder='*********' onChange={(e) => { setConfirmedPassword(e.target.value) }} />
              <div className='absolute right-2 top-10 cursor-pointer'>
                {
                  (showConfirmPassword === false) ?
                    <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={toggleShowConfirmPassword}>
                      <path d="M14.6667 1.33334C14.6667 1.33334 12 5.33334 8.00004 5.33334C4.00004 5.33334 1.33337 1.33334 1.33337 1.33334" stroke="#2A353D" strokeLinecap="round" />
                      <path d="M10 5L11 6.66667" stroke="#2A353D" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M13.3334 3.33334L14.6667 4.66667" stroke="#2A353D" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M1.33337 4.66667L2.66671 3.33334" stroke="#2A353D" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6 5L5 6.66667" stroke="#2A353D" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    :
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={toggleShowConfirmPassword}>
                      <path d="M14.3623 5.36333C14.565 5.64754 14.6663 5.78965 14.6663 6C14.6663 6.21036 14.565 6.35247 14.3623 6.63668C13.4516 7.91371 11.1258 10.6667 7.99967 10.6667C4.87353 10.6667 2.54774 7.91371 1.63704 6.63668C1.43435 6.35247 1.33301 6.21036 1.33301 6C1.33301 5.78965 1.43435 5.64754 1.63703 5.36333C2.54774 4.0863 4.87353 1.33334 7.99967 1.33334C11.1258 1.33334 13.4516 4.0863 14.3623 5.36333Z" stroke="#2A353D" />
                      <path d="M10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8C9.10457 8 10 7.10457 10 6Z" stroke="#2A353D" />
                    </svg>
                }
              </div>
              <div id="passwordNotMatched" className='text-red-700 text-xs pt-1 px-2'></div>
            </div>
          </div>

          <div className='flex items-center'>
            <label htmlFor="agreementCheckbox" className='cursor-pointer relative'>
              <input type="checkbox" id="agreementCheckbox" name='agreementCheckbox' className='appearance-none w-4 h-4 border-[1.5px] border-black rounded hover:border-[#0090FC] focus:outline-none' onChange={(e) => { setConditionsAgreed(e.target.checked) }} />
              <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute left-1 top-[6px] hidden'>
                <path d="M1.05261 5.05263C1.05261 5.05263 2.39998 5.82107 3.07367 6.94736C3.07367 6.94736 5.09472 2.52631 7.78945 1.05263" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </label>
            <p className='text-xs ml-1'>I agree with AskItOut's <Link to="/" className='text-[#0090FC] visited:text-[#0090FC]'>User Agreement</Link> and <Link to="/" className='text-[#0090FC] visited:text-[#0090FC]'>Privacy Policy</Link>.</p>
          </div>

          <div className='flex items-center'>
            <label htmlFor="robotCheckbox" className='cursor-pointer relative'>
              <input type="checkbox" id="robotCheckbox" name='robotCheckbox' className='appearance-none w-4 h-4 border-[1.5px] border-black hover:border-[#0090FC] rounded focus:outline-none' onChange={(e) => { setIsNotRobot(e.target.checked) }} />
              <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute left-1 top-[6px] hidden'>
                <path d="M1.05261 5.05263C1.05261 5.05263 2.39998 5.82107 3.07367 6.94736C3.07367 6.94736 5.09472 2.52631 7.78945 1.05263" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </label>
            <p className='text-xs ml-1'>I am not a Robot.</p>
          </div>

          <button type='submit' className='w-full py-1 bg-[#339AF0] my-4 rounded-full'><span className='text-base font-semibold text-white'>Sign Up</span></button>
          <p className='text-xs text-center my-4'>Already have a AskItOut account? <Link to="/login" className='text-[#0090FC] visited:text-[#0090FC]'>Log In</Link></p>
        </form>
      </div>
    </div>
  )
}