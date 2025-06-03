import clientPromise from "@/lib/mongodb";
import {getUser} from "@/api/services/User";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import {compare} from "bcryptjs";
import * as process from "node:process";
import NextAuth from "next-auth";


const authOptions = {
    adapter : MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email" , type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = await getUser(credentials?.email!);
                if (!user) throw new Error("Email doesn't exist");

                const isValid = await compare(credentials!.password, user.password);
                if (!isValid) throw new Error("Password is incorrect");

                return {
                    id: user._id.toString(),
                    email: user.email,
                    emailVerified: user.emailVerified ?? null,
                };
            }
        })
    ],
    pages: {
        signIn: "/sign-in",
    },
    session: {
        strategy: "jwt" as "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions);