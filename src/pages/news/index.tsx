import {useRouter} from "next/router";
import {useNewsContext} from "@/lib/contexts/NewsContext";
import useFetch from "../../hooks/useFetch";
import {News} from "@/api/models/News";
import {useEffect} from "react";
import {CircularProgress} from "@mui/material";
import Link from "next/link";
import {motion} from "framer-motion";

export default function NewsPage() {
    const router = useRouter();
    const {news, setNews} = useNewsContext();
    const {data : newsData, loading, remove} = useFetch<News[]>("/api/news");

    useEffect(() => {
        if (newsData) {
            setNews(newsData);
        }
    }, [newsData]);

    const handleDeleteNews = async (id: string) => {
        const confirmed = confirm("Are you sure you want to delete?");

        if (!confirmed) return;

        try {
            await remove(`/api/news/${id}`);
            alert("Deleted news!");
            router.reload();
        } catch (err) {
            alert("Gabim gjate fshirjes se news");
            console.log(err);
        }
    }

    return (
        <div className="pt-12">
            <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
                {/* Blogs nga DATABAZA*/}
                {loading ? (
                    <CircularProgress/>
                ) : (
                    <div className="bg-gray-200 w-full">
                        <h1 className="text-4xl font-bold pt-20 pb-6 text-black text-center">
                            Shfaqja e News nga databaza jonë
                        </h1>
                        <div className="grid grid-cols-3">
                            {newsData && newsData.length > 0 ? (
                                newsData.map((post: News) => (
                                    <motion.section
                                        key={post._id}
                                        className="max-w-6xl py-20 px-6 text-center"
                                        initial={{scale: 0.8}}
                                        animate={{scale: 1}}
                                        transition={{duration: 1}}>
                                        <h2 className="text-4xl font-bold mb-6 text-yellow-600 line-clamp-2 uppercase">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-700 mb-6">{post.body}</p>
                                        <div className="mb-6">
                                            <Link href={"/update/news/" + post._id}>
                                                <button
                                                    className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl transition">
                                                    Update
                                                </button>
                                            </Link>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteNews(post._id!)}
                                            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white transition">
                                            Delete News
                                        </button>
                                    </motion.section>
                                ))
                            ) : (
                                <div className="col-span-3 py-20">
                                    <p className="text-xl font-bold pb-10 text-black text-center">
                                        Nuk ka News ne databaze
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="text-center pb-10">
                            <Link href={"/create/news"}>
                                <button
                                    className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl transition">
                                    Create news
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )

}
NewsPage.displayName = "News | My App";