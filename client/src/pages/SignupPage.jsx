// src/pages/SignupPage.jsx
import SignupForm from "../components/SignupForm";
import Logo from "../../../shared/utils/icons/logo.png"; // Adjust the path as necessary
import signup_image from "../../../shared/utils/icons/signup.svg";

export default function SignupPage() {
  return (
    <div className="min-h-screen justify-center">
      <section className = "h-screen  flex">
        <div className = "bg-red-800 w-[50%] flex flex-col px-20 items-center h-full">
        <img src={Logo} alt="Logo" className=" p-5 mb-8 h-[100px]" />
          <div className="bg-orange-400 w-full">
            <h1 className="text-4xl font-normal mt-10">
              Welcome Interns,
            </h1>
            <p className="text-gray-700">Please sign up to take attendance</p>
          </div>
          <SignupForm className = "w-full"/>
        </div>
        <div className = "w-[50%] flex items-center justify-center">
          <img src={signup_image} className = "h-[70%]"alt="Undraw Illustration on this side" />
        </div>
      </section>
    </div>
  );
}
