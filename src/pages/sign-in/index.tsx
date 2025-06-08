import { getCsrfToken, signIn } from "next-auth/react";
import React, { useState } from "react";
import { router } from "next/client";

export default function SignIn({ csrfToken }: { csrfToken: string }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
        <div className="pt-12">
            <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
                <div className="mb-10 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-black text-2xl font-semibold mb-4">
                        Sign In
                    </h2>
                    {error && (
                        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 mb-4 py-2 border rounded placeholder-gray-400 text-black"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 mb-4 py-2 border rounded placeholder-gray-400 text-black"
                        />
                        <button
                            type="submit"
                            className="w-full mt-2 px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                        >
                            Sign in with Email
                        </button>
                    </form>

                    <div className="flex items-center my-4">
                        <hr className="flex-grow border-gray-300" />
                        <span className="mx-2 text-gray-500">or</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    <button
                        onClick={() =>
                            signIn("google", {
                                callbackUrl: "/",
                            })
                        }
                        className="w-full px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                    >
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
}
SignIn.getInitialProps = async ( context : any) => {
    return {
        csrfToken : await getCsrfToken(context),
    };
};
SignIn.displayName = "Sign In | My Application";