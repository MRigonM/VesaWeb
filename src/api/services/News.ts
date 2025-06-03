import clientPromise from "@/lib/mongodb";
import {ObjectId} from "bson";
import {News} from "../models/News";

const DB_NAME = "myapp"
const COLLECTION_NAME = "news"

export const createNews = async (data: Omit<News, '_id'>) => {
  const client = await clientPromise
  const db = client.db(DB_NAME)
  const result = await db.collection(COLLECTION_NAME).insertOne({
    ...data,
    createdAt: new Date(),
  })
  return result
}

export  async function getNews(){
  const client = await clientPromise
  const db = client.db(DB_NAME)
  const news = await db.
    collection(COLLECTION_NAME)
    .find()
    .sort({ createdAt: -1 })
    .toArray()
  return news
}

export async function getSingleNews(id: string){
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const news = await db.collection(COLLECTION_NAME)
        .findOne({_id: new ObjectId(id)});
    return news;
}

export async function updateNews(id: string, data: News){
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const news = await db
        .collection(COLLECTION_NAME)
        .updateOne({_id: new ObjectId(id)}, {$set: data});
    return news;
}

export async function deleteNews(id: string) {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const news = await db
    .collection(COLLECTION_NAME)
        .deleteOne({_id: new ObjectId(id)});
    return news;
}