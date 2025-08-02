import React from 'react'
import SignupForm from '../components/SignupForm'
import signup_image from "../../../shared/utils/icons/adminSignup.svg"; 

const SignupPage = () => {
  return (
    <>
      <section className='min-h-screen w-full grid grid-cols-[1fr_1fr]'>
        <div className=''>
          <SignupForm />
        </div>

        <div className='flex items-end justify-center'>
          <img src={ signup_image } className= "h-[50%] mb-20 animate-none"alt="Undraw Illustration on this side animate-pulse" />
        </div>
      </section>
    </>
  )
}

export default SignupPage