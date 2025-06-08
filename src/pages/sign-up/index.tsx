import { useRouter } from "next/router";
import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { User } from "@/api/models/User";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignUp() {
    const router = useRouter();
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");

    const { post } = useFetch<User[]>("/api/auth/register");

    const handleSubmit = async () => {
        setError("");
        const res = await post(user);

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

                <input
                    type="text"
                    placeholder="Name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-black"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-black"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                    }
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-black"
                />
                <button
                    onClick={handleSubmit}
                    className="w-full mt-2 py-2 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
                >
                    Sign up with Email
                </button>

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
