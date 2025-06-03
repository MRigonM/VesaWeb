import clientPromise from "@/lib/mongodb";
import {User} from "@/api/models/User";

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

export async function getUser(email: string){
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const result = await db.collection(COLLECTION_NAME).findOne({email: email});
    return result;
}

