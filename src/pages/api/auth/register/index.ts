import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/api/models/User";
import { createUser, getUser } from "@/api/services/User";
import * as bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { name, email, password } = req.body as User;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Missing required field" });
        }
        try {
            const normalizedEmail = email.toLowerCase();
            const existingUser = await getUser(normalizedEmail);
            if (existingUser) {
                return res.status(409).json({ error: "User already exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                name,
                email: normalizedEmail,
                password: hashedPassword,
                role: "user",
                createdAt: new Date(),
            };

            const result = await createUser(newUser);
            res.status(201).json({
                message: "User created successfully",
                userId: result.insertedId,
            });
        } catch (error) {
            res.status(500).json({ error: "Error during registration" });
        }
    } else {
        res.status(405).json({ error: "Method is not allowed" });
    }
}
