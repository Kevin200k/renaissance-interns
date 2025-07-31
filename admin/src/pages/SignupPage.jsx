import React from 'react'
import SignupForm from '../components/SignupForm'
import signup_image from "../../../shared/utils/icons/signup.svg"; 

const SignupPage = () => {
  return (
    <>
      <section className='min-h-screen w-full grid grid-cols-[1fr_1fr]'>
        <div className=''>
          <SignupForm />
        </div>

        <div className='flex items-center justify-center'>
          <img src={ signup_image } className= "h-[70%]"alt="Undraw Illustration on this side" />
        </div>
      </section>
    </>
  )
}

export default SignupPage