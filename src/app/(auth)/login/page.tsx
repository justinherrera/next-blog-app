import GoogleButton from "@/components/auth/google-button";
import Image from "next/image";
import AlternativeLogins from "@/components/auth/alternative-logins";
import LoginForm from "@/components/auth/login-form";
import GithubButton from "@/components/auth/github-button";


export default function Login() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          className="mx-auto h-10 w-auto"
          width={100}
          height={100}
          src="https://tailwindui.com/img/logos/mark.svg"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <LoginForm />

          <AlternativeLogins />

          <GithubButton />
          <GoogleButton />
        </div>
      </div>
    </div>
  );
}