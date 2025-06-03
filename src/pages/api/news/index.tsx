import type {NextApiRequest, NextApiResponse} from "next"
import {createNews, getNews} from "@/api/services/News";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
            const newNews = req.body
            const result = await createNews(newNews)
            res.status(201).json(result)
        } catch (error) {
            res.status(500).json({error: "Failed to create news"})
        }
    }
    if (req.method === "GET") {
        try {
            const blogs = await getNews();
            res.status(200).json(blogs)
        } catch (error) {
            res.status(500).json({error: "Failed to get news"})
        }
    } else {
        res.status(405).json({error: "Method not allowed"})
    }
}