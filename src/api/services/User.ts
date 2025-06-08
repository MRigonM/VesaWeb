import clientPromise from "@/lib/mongodb";
import {User} from "@/api/models/User";
import * as bcrypt from "bcryptjs";

const DB_NAME = "myapp"
const COLLECTION_NAME = "users"

export const createUser = async (data: Omit<User, '_id'>) => {
  const client = await clientPromise
  const db = client.db(DB_NAME)
  const result = await db.collection(COLLECTION_NAME).insertOne({
    ...data,
    createdAt: new Date(),
  })
  return result
}

export async function getUser(email: string) {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const result = await db.collection(COLLECTION_NAME).findOne(
        { email: email.toLowerCase() },
        { projection: { email: 1, password: 1, name: 1, role: 1, createdAt: 1 } }
    );
    return result;
}
export async function ensureAdminUser() {
    const ADMIN_EMAIL = "admin@example.com";
    const ADMIN_PASSWORD = "admin123";
    const ADMIN_NAME = "Admin User";

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const existingAdmin = await db.collection(COLLECTION_NAME).findOne({
        email: ADMIN_EMAIL.toLowerCase(),
        role: "admin"
    });

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
        await db.collection(COLLECTION_NAME).insertOne({
            name: ADMIN_NAME,
            email: ADMIN_EMAIL.toLowerCase(),
            password: hashedPassword,
            role: "admin",
            createdAt: new Date()
        });
        console.log("Admin user created successfully");
    }
}

ensureAdminUser().catch(err => {
    console.error("Failed to ensure admin user:", err);
});