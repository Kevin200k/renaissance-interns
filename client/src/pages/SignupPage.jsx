import SignupForm from "../components/SignupForm";
import Logo from "../../../shared/utils/icons/logo.png"; // Adjust the path as necessary
import signup_image from "../../../shared/utils/icons/signup.svg";

export default function SignupPage() {
  return (
    <>
    {/* Mobile View */}
    <section className="md:hidden h-screen sm:flex  w-full ">

      <nav className="bg-white p-3">
        <img
          src={Logo}
          alt="Logo"
          className="w-24 left-5 top-5 "
        />
      </nav>

        <div className="h-40 flex items-center justify-between px-4 bg-gradient-to-tr from-[#10b981] to-[#0c7954]">
        <div>
          <h1 className="text-xl text-white">Create Your Account</h1>
          <p className="text-sm text-white">Sign up to check in and mark your attendance only when you're within the company&#39;s location</p>
        </div>
              
        <img
          src={signup_image}
          className="h-24 w-24"
          alt="Undraw Illustration on this side"
        />
      </div>

      

      <div className=" flex flex-col justify-center items-center">
        
        <SignupForm className="w-full" />
      </div>
      
    </section>

    {/* Desktop View */}

    <section className="hidden h-screen md:flex">

      {/* Left Side - Logo and Form */}
      <div className="w-[50%] flex flex-col justify-center items-center">
        <nav className="p-4 flex justify-center">
          <img
            src={Logo}
            alt="Logo"
            className="w-32"
          />
        </nav>

        {/* Signup Form */}
        <SignupForm className="w-full" />
      </div>

      {/* Right Side - Text and Image */}
      <div className="w-[50%] bg-[#10b981] flex flex-col justify-center items-center">
        <img
          src={signup_image}
          className="w-64 object-contain"
          alt="Undraw Illustration on this side"
        />
        <div className="text-center mt-10">
          <h1 className="text-4xl text-white">Create Your Account</h1>
          <p className="text-sm text-white">Sign up to check in and mark your attendance only when you're within the company&#39;s location</p>
        </div>
      </div>

    </section>



    </>
  );
}
