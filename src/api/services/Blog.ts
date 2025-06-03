import {Blog} from "../models/Blog";
import clientPromise from "@/lib/mongodb";
import {ObjectId} from "bson";

const DB_NAME = "myapp"
const COLLECTION_NAME = "blogs"

export const createBlog = async (data: Omit<Blog, '_id'>) => {
  const client = await clientPromise
  const db = client.db(DB_NAME)
  const result = await db.collection(COLLECTION_NAME).insertOne({
    ...data,
    createdAt: new Date(),
  })
  return result
}

export  async function getBlogs(){
  const client = await clientPromise
  const db = client.db(DB_NAME)
  const blogs = await db.
    collection(COLLECTION_NAME)
    .find()
    .sort({ createdAt: -1 })
    .toArray()
  return blogs
}

export async function getBlog(id: string){
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const blog = await db.collection(COLLECTION_NAME)
        .findOne({_id: new ObjectId(id)});
    return blog;
}

export async function updateBlog(id: string, data: Blog){
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const blog = await db
        .collection(COLLECTION_NAME)
        .updateOne({_id: new ObjectId(id)}, {$set: data});
    return blog;
}

export async function deleteBlog(id: string) {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const blog = await db
    .collection(COLLECTION_NAME)
        .deleteOne({_id: new ObjectId(id)});
    return blog;
}