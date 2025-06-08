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
        if (newsData) setNews(newsData);
    }, [newsData, setNews]);

    const handleDeleteNews = async (id: string) => {
        const confirmed = confirm("Are you sure you want to delete?");
        if (!confirmed) return;

        try {
            await remove(`/api/news/${id}`);
            alert("Deleted news!");
            router.reload();
        } catch (err) {
            alert("Error while deleting news.");
            console.log(err);
        }
    };

    return (
        <div className="pt-14 bg-gray-50 flex flex-col items-center min-h-screen gap-y-20">
            {loading ? (
                <div className="pt-24">
                    <CircularProgress/>
                </div>
            ) : (
                <div className="w-full py-20 px-6 sm:px-10 lg:px-20 bg-gradient-to-b from-gray-100 to-gray-200">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-800 text-center mb-16 drop-shadow-sm">
                        Displaying News from Our Database
                    </h1>

                    <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {newsData && newsData.length > 0 ? (
                            newsData.map((post: News) => (
                                <motion.div
                                    key={post._id}
                                    className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between hover:shadow-2xl transition-transform transform hover:-translate-y-1"
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.4}}
                                >
                                    <h2 className="text-xl md:text-2xl font-semibold md:font-bold mb-4 text-purple-700 uppercase line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-700 mb-6 line-clamp-4">{post.body}</p>
                                    {role === "admin" && (
                                        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-auto">
                                            <Tooltip title="Update post">
                                                <IconButton
                                                    onClick={() => router.push("update/news/" + post._id)}
                                                    className="hover:text-purple-700">
                                                    <Edit className="text-purple-600"/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton
                                                    onClick={() => handleDeleteNews(post._id!)}
                                                >
                                                    <Trash className="text-red-500" />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    )}
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-xl text-center font-medium text-gray-600 col-span-full py-20">
                                No news found in the database.
                            </div>
                        )}
                    </div>

                    {role === "admin" && (
                        <div className="text-center mt-16">
                            <Link href="/create/news">
                                <button
                                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2 rounded-full shadow-md transition duration-300">
                                    + Create News
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
            {/* Filler section below news cards */}
            <div className="mt-14 bg-white py-16 px-6 sm:px-10 lg:px-40 rounded-3xl shadow-inner text-center mb-14">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-purple-800 mb-4">
                    Stay Updated
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-8">
                    We’re constantly sharing new updates, features, and announcements. Subscribe to our newsletter so
                    you don’t miss anything!
                </p>
                <div className="flex justify-center gap-4 max-w-xl mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="px-4 py-2 rounded-l-xl border border-gray-300 placeholder-gray-400 text-black focus:ring-purple-500 w-full sm:w-2/3"
                    />
                    <button
                        className="px-6 py-2 bg-purple-700 hover:bg-purple-800 text-white font-medium rounded-r-xl transition"
                        onClick={() => router.push("/news")}>
                        Subscribe
                    </button>
                </div>
            </div>

        </div>
    );
}

NewsPage.displayName = "News | My App";
