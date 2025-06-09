import { useRouter } from "next/router";
import React from "react";
import useFetch from "../../hooks/useFetch";
import { User } from "@/api/models/User";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";

type SignUpForm = {
  name: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const router = useRouter();
  const { post } = useFetch<User[]>("/api/auth/register");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>();
  const [error, setError] = React.useState("");

  const onSubmit = async (data: SignUpForm) => {
    setError("");
    const res = await post(data);

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div className="pt-12 bg-gradient-to-r from-purple-100 to-blue-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
          Create your account
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-2 mb-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mb-3">{errors.name.message}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full px-4 py-2 mb-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-3">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full px-4 py-2 mb-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-3">
              {errors.password.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full mt-2 py-2 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
          >
            Sign up with Email
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={() =>
            signIn("google", {
              callbackUrl: "/",
            })
          }
          className="w-full py-2 px-6 flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
        >
          <img
            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
            alt="Google logo"
            className="w-5 h-5"
          />
          <span>Continue with Google</span>
        </button>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-purple-600 font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
