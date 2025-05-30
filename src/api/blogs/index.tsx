import type {NextApiRequest, NextApiResponse} from "next"
import {createBlog, getBlogs} from "@/api/services/Blog";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
            const newBlog = req.body
            const result = await createBlog(newBlog)
            res.status(201).json(result)
        } catch (error) {
            res.status(500).json({error: "Failed to create blog"})
        }
    }
    if (req.method === "GET") {
        try {
            const blogs = await getBlogs();
            res.status(200).json(blogs)
        } catch (error) {
            res.status(500).json({error: "Failed to get blogs"})
        }
    } else {
        res.status(405).json({error: "Method not allowed"})
    }
}