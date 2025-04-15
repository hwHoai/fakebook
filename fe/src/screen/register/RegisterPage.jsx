import { Link, useNavigate } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerValidationSchema } from '../../validation/authValidaionSchema';
import { BRAND_NAME } from '../../constant/general';
import register_background from '../../assets/img/register_background.png';
import { UserAuthenticationService } from '../../service/user/auth/userAuthentication';
import { TokenService } from '../../util/tokenService';
import { CookieService } from '../../util/cookieService';
import { useContext, useEffect } from 'react';
import { AuthProvider } from '../../components/layout/provider/AuthProvider';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const loginContext = useContext(AuthProvider);

  useEffect(() => {
    if (loginContext.isAuth) {
      navigate('/newfeed');
    }
  });

  const handleRegisterUser = async (values, { setSubmitting }) => {
    try {
      console.log(values);
      const tokens = await UserAuthenticationService.signUp(values);
      console.log(tokens);
      for (const key in tokens) {
        const tokenPayload = TokenService.decodeToken(tokens[key]);
        const tokenExpire = new Date(tokenPayload.exp);
        CookieService.setCookie(key, tokens[key], tokenExpire);
      }
      navigate('/');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div
      className='flex h-screen w-full min-w-[900px] min-h-[500px] overflow-auto'
      style={{
        backgroundImage: `url(${register_background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className='w-[60%] p-6 flex flex-col'>
        <div className='text-2xl font-semibold inline-block' style={{ color: '#7940ed' }}>
          {BRAND_NAME}
        </div>
        <h1 className='text-3xl font-bold text-gray-800 mt-6.5'>Sign up for an account</h1>
        <p className='text-gray-500 mt-2 max-w-md'>
          You’re missing out! Sign up now to connect, explore, and experience everything we offer!
        </p>

        <Formik
          initialValues={{ firstName: '', lastName: '', userEmail: '', password: '' }}
          validationSchema={registerValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleRegisterUser(values, { setSubmitting });
          }}
        >
          {({ isSubmitting }) => (
            <Form className='mt-6 space-y-8'>
              <div className='flex gap-4'>
                <div className='w-1/4 flex flex-col'>
                  <Field
                    autoComplete='new-password'
                    type='text'
                    name='firstName'
                    placeholder='Your first name'
                    className='w-full p-2 border-1 border-accent-light rounded'
                  />
                  <ErrorMessage name='firstName' component='div' className='text-red-500 text-sm  mt-2' />
                </div>

                <div className='w-1/4 flex flex-col'>
                  <Field
                    autoComplete='new-password'
                    type='text'
                    name='lastName'
                    placeholder='Your last name'
                    className='w-full p-2 border-1 border-accent-light rounded'
                  />
                  <ErrorMessage name='lastName' component='div' className='text-red-500 text-sm  mt-2' />
                </div>
              </div>

              <div className='flex flex-col gap-10'>
                <div className='flex flex-col w-[calc(50%+1rem)]'>
                  <Field
                    autoComplete='new-password'
                    type='email'
                    name='userEmail'
                    placeholder='Enter your email address'
                    className='w-full p-2 border-1 border-accent-light rounded'
                  />
                  <ErrorMessage name='userEmail' component='div' className='text-red-500 text-sm mt-2' />
                </div>

                <div className='flex flex-col w-[calc(50%+1rem)]'>
                  <Field
                    autoComplete='new-password'
                    type='password'
                    name='password'
                    placeholder='Enter your password'
                    className='w-full p-2 border-1 border-accent-light rounded'
                  />
                  <ErrorMessage name='password' component='div' className='text-red-500 text-sm  mt-2' />
                </div>
              </div>

              <button
                type='submit'
                disabled={isSubmitting}
                className='w-[calc(50%+1rem)] cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-2 text-lg rounded'
              >
                {isSubmitting ? 'Signing up...' : 'Sign up'}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <div className='w-[40%] flex flex-col items-center justify-center text-white'>
        <h2 className='text-3xl font-semibold'>Already Signed up?</h2>
        <p className='mt-10 text-lg text-center'>
          Log in to your account so you can start creating your own exploding experience!
        </p>
        <Link
          to='/login'
          className='mt-10 bg-[#7940ed] cursor-pointer text-white border-1 p-2 px-7 border-white rounded'
        >
          Log in
        </Link>
      </div>
    </div>
  );
};
