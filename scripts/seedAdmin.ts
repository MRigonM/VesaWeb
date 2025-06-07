import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

async function seedAdmin() {
  const client = await clientPromise;
  const db = client.db();

  const existingAdmin = await db.collection("users").findOne({ email: "admin@example.com" });
  if (existingAdmin) {
    console.log("Admin user already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash("yourAdminPassword123", 10);

  await db.collection("users").insertOne({
    name: "Admin User",
    email: "admin@example.com",
    password: hashedPassword,
    role: "admin",
    createdAt: new Date(),
  });

  console.log("Admin user created.");
}

seedAdmin().catch(console.error);
