import { getCsrfToken, signIn } from "next-auth/react";
import React, { useState } from "react";
import { router } from "next/client";

export default function SignIn({ csrfToken }: { csrfToken: string }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        setError("");
        e.preventDefault();
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });
        if (res?.error) {
            setError(res.error);
        } else if (res?.url) {
            router.push("/");
        }
    };

    return (
        <div className="pt-12 bg-gradient-to-r from-purple-100 to-blue-100 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
                    Sign in
                </h2>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-center font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-black"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-black"
                    />
                    <button
                        type="submit"
                        className="w-full py-2 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
                    >
                        Sign in with Email
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
            </div>
        </div>
    );
}

SignIn.getInitialProps = async (context: any) => {
    return {
        csrfToken: await getCsrfToken(context),
    };
};

SignIn.displayName = "Sign In | My Application";
