import type {NextApiRequest, NextApiResponse} from "next"
import {deleteBlog, getBlog,updateBlog} from "../services/Blog";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const { id } = req.query;
            const blogs = await getBlog(id as string);
            res.status(200).json(blogs)
        } catch (error) {
            res.status(500).json({error: "Failed to get blogs"})
        }
    }

    if (req.method === "PUT") {
        try {
            const { id } = req.query;
            const newBlog = req.body
            const result = await updateBlog(id as string,newBlog)
            res.status(201).json(result)
        } catch (error) {
            res.status(500).json({error: "Failed to create blog"})
        }
    }
    if (req.method === "DELETE") {
        try {
            const { id } = req.query;
            const blogs = await deleteBlog(id as string);
            res.status(200).json(blogs)
        } catch (error) {
            res.status(500).json({error: "Failed to get blogs"})
        }
    } else {
        res.status(405).json({error: "Method not allowed"})
    }
}