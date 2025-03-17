import { BRAND_NAME } from '../../constant/general';
import register_background from '../../assets/img/register_background.png';

export const RegisterPage = () => {
  return (
    <div
      className='flex h-screen w-full min-w-[1400px] min-h-[600px] overflow-auto'
      style={{
        backgroundImage: `url(${register_background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className='w-[60%]  p-10 flex flex-col'>
        <div className='text-3xl font-semibold inline-block' style={{ color: '#7940ed' }}>
          {BRAND_NAME}
        </div>
        <h1 className='text-4xl font-bold text-gray-800 mt-6.5'>Sign up for an account</h1>
        <p className='text-gray-500 mt-2 max-w-md'>
          You’re missing out! Sign up now to connect, explore, and experience everything we offer!
        </p>

        <div className='mt-6 space-y-10'>
          <div className='flex gap-4'>
            <input
              type='text'
              placeholder='Your first name'
              className='w-1/4 p-3  border-1 border-accent-light rounded'
            />
            <input
              type='text'
              placeholder='Your last name'
              className='w-1/4 p-3 border-1 border-accent-light rounded'
            />
          </div>

          <div className='flex flex-col gap-10'>
            <input
              type='email'
              placeholder='Enter your email address'
              className='w-[calc(50%+1rem)] p-3 border-1 border-accent-light  rounded'
            />
            <input
              type='password'
              placeholder='Enter your password'
              className='w-[calc(50%+1rem)] p-3 border-1 border-accent-light  rounded'
            />
          </div>

          {/* <div className='flex items-center gap-2'>
            <input type='checkbox' />
            <p className='text-sm text-gray-600'>
              I accept <span className='text-blue-500'>Fakebook Terms & Conditions</span>
            </p>
          </div> */}

          <button className='w-[calc(50%+1rem)] bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-3 text-lg rounded'>
            Sign up
          </button>
        </div>
      </div>

      <div className='w-[40%]  flex flex-col items-center justify-center text-white '>
        <h2 className='text-4xl font-semibold'>Already Signed up?</h2>
        <p className='mt-10 text-lg text-center'>
          Log in to your account so you can start creating your own exploding experience!
        </p>
        <button className='mt-10 bg-[#7940ed] text-white border-1 p-3 px-7 border-white rounded'>Log in</button>
      </div>
    </div>
  );
};
