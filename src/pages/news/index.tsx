import {useRouter} from "next/router";
import {useNewsContext} from "@/lib/contexts/NewsContext";
import useFetch from "../../hooks/useFetch";
import {News} from "@/api/models/News";
import {useEffect} from "react";
import {CircularProgress, IconButton, Tooltip} from "@mui/material";
import Link from "next/link";
import {motion} from "framer-motion";
import {Edit, Trash} from "lucide-react";
import {useSession} from "next-auth/react";

export default function NewsPage() {
    const {data: session} = useSession();
    const role = (session?.user as any)?.role;
    const router = useRouter();
    const {news, setNews} = useNewsContext();
    const {data: newsData, loading, remove} = useFetch<News[]>("/api/news");

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
        <div className="pt-14 bg-gray-50 flex flex-col items-center min-h-screen gap-y-20">
            {/* Blogs nga DATABAZA*/}
            {loading ? (
                <CircularProgress/>
            ) : (
                <div className="bg-gradient-to-b from-gray-100 to-gray-200 w-full py-16 px-4 sm:px-6 lg:px-16">
                    <h1 className="text-5xl font-extrabold mb-12 pb-6 text-purple-800 drop-shadow-sm text-center">
                        Shfaqja e News nga databaza jonë
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {newsData && newsData.length > 0 ? (
                            newsData.map((post: News) => (
                                <motion.section
                                    key={post._id}
                                    className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between hover:shadow-xl transition duration-300"
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.6}}
                                >
                                    <h2 className="text-2xl font-bold mb-4 text-purple-700 line-clamp-2 uppercase">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-700 mb-6 line-clamp-4">{post.body}</p>
                                    {role === "admin" && (
                                        <>
                                            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-auto">
                                                <Tooltip title="Update news">
                                                    <IconButton
                                                        onClick={() => router.push("update/news/" + post._id)}
                                                    >
                                                        <Edit className="text-gray-400"/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete news">
                                                    <IconButton
                                                        onClick={() => handleDeleteNews(post._id!)}
                                                    >
                                                        <Trash className="text-gray-400"/>
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        </>
                                    )}
                                </motion.section>
                            ))
                        ) : (
                            <div className="py-20 text-xl font-medium text-gray-600 text-center">
                                No news in the database
                            </div>
                        )}
                    </div>
                    {role === "admin" && (
                        <>
                            <div className="text-center mt-16">
                                <Link href={"/create/news"}>
                                    <button
                                        className="px-6 py-2 bg-purple-700 hover:bg-purple-800 text-white text-lg rounded-2xl transition">
                                        + Create News
                                    </button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    )

}
NewsPage.displayName = "News | My App";