import { useState } from 'react';
import { BRAND_NAME } from '../../constant/general';
import { Link } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import login_background from '../../assets/img/login_background.png';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div
      className='flex h-screen w-full min-w-[800px] min-h-[500px] overflow-auto relative'
      style={{
        backgroundImage: `url(${login_background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className='text-2xl absolute top-6 left-6 font-semibold inline-block' style={{ color: '#fff' }}>
        {BRAND_NAME}
      </div>
      <div className='w-[40%] p-10 flex flex-col items-center justify-center text-white '>
        <h2 className='text-3xl font-semibold'>Dont Have an Account Yet?</h2>
        <p className='mt-8 text-base text-center'>
          Sign up today to connect with friends, share your moments, and stay updated with the latest trends. Join our
          community and start your journey now!
        </p>
        <Link
          to='/register'
          className='mt-8 bg-[#7940ed] cursor-pointer text-white border-1 p-2 px-7 border-white rounded'
        >
          Sign up
        </Link>
      </div>

      <div className='flex flex-col w-[60%] items-center justify-center min-h-screen '>
        <div className='w-110'>
          <h2 className='text-5xl font-bold text-gray-800'>Hello There</h2>
          <p className='text-gray-600 text-base mt-2'>It's great to have you here.</p>
          <p className='text-gray-600 text-base mt-1'>Log in to your account to continue!</p>
        </div>
        <div className='bg-white mt-6 p-6 rounded-lg shadow-lg w-110'>
          <form className='mt-6'>
            <div className='mb-4'>
              <input
                type='text'
                placeholder='Email address or phone number'
                className='w-full px-3 py-4 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
            </div>
            <div className='mb-4 relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                className='w-full px-3 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10'
              />
              <span
                className='absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            <div className='flex mt-5 px-5 items-center justify-between text-sm text-gray-600'>
              <label className='flex items-center  text-base'>
                <input type='checkbox' className='mr-2' /> Remember me
              </label>
              <a href='#' className='text-blue-500 text-base hover:underline'>
                Forgot password?
              </a>
            </div>
            <div className='w-full mt-8 flex justify-center'>
              <button className='w-4/5 py-2 bg-gradient-to-r cursor-pointer from-purple-600 to-purple-400 text-white rounded-lg hover:opacity-90'>
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
