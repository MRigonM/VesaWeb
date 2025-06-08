import NextAuth, { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { getUser } from "@/api/services/User";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import * as process from "node:process";

export const authOptions: AuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
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
                    name: user.name,
                    role: user.role,
                    emailVerified: user.emailVerified ?? null,
                };
            },
        }),
    ],
    pages: {
        signIn: "/sign-in",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: any }) {
            if (user) {
                token.name = user.name;
                token.email = user.email;
                token.role = user.role || "user";
                token.image = user.image ?? null;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (session.user) {
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                (session.user as any).role = token.role;
                (session.user as any).image = token.image ?? null;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
