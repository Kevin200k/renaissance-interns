import SignupForm from "../components/SignupForm";
import Logo from "../assets/icons/logo.png"; // Adjust the path as needed
import signup_image from "../assets/icons/signup.svg"; // Adjust the path as needed

export default function SignupPage() {
  return (
    <div className="min-h-screen justify-center">
      <section className="h-screen flex relative">
        <div className="w-[50%] flex flex-col px-20 justify-center items-center h-full">
          <img
            src={Logo}
            alt="Logo"
            className="mb-8 h-10 left-5 top-5 absolute"
          />
          <SignupForm className="w-full" />
        </div>
        <div className="w-[50%] bg-[#10b981] flex items-center justify-center">
          <img
            src={signup_image}
            className="h-[70%]"
            alt="Undraw Illustration on this side"
          />
        </div>
      </section>
    </div>
  );
}
