import type {NextApiRequest, NextApiResponse} from "next"
import {deleteNews, getSingleNews, updateNews} from "@/api/services/News";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const { id } = req.query;
            const news = await getSingleNews(id as string);
            res.status(200).json(news)
        } catch (error) {
            res.status(500).json({error: "Failed to get news"})
        }
    }

    if (req.method === "PUT") {
        try {
            const { id } = req.query;
            const newNews = req.body
            const result = await updateNews(id as string,newNews)
            res.status(201).json(result)
        } catch (error) {
            res.status(500).json({error: "Failed to create news"})
        }
    }
    if (req.method === "DELETE") {
        try {
            const { id } = req.query;
            const news = await deleteNews(id as string);
            res.status(200).json(news)
        } catch (error) {
            res.status(500).json({error: "Failed to get news"})
        }
    } else {
        res.status(405).json({error: "Method not allowed"})
    }
}