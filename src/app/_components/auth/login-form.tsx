import EmailInput from "@/app/_components/auth/email-input";
import PasswordInput from "@/app/_components/auth/password-input";
import RememberCheckbox from "@/app/_components/auth/remember-checkbox";
import ForgotPasswordLink from "@/app/_components/auth/forgot-password-link";
import SignInButton from "@/app/_components/auth/sign-in-button";
import Google from "next-auth/providers/google";
import GoogleButton from "./google-button";

export default function LoginForm() {
  return (
    <form className="space-y-6" action="#" method="POST">
      

      <EmailInput />
      <PasswordInput />

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
            Remember me
          </label>
        </div>

        <div className="text-sm leading-6">
          <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Forgot password?
          </a>
        </div>
      </div>

      <div>
        <SignInButton />  
      </div>      
      
    </form>
  )
}