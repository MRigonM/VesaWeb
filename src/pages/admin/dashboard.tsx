import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Blog } from "@/api/models/Blog";
import { useEffect } from "react";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import Link from "next/link";
import { Edit, Trash } from "lucide-react";
import useFetch from "../../hooks/useFetch";
import {News} from "@/api/models/News";

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const role = (session?.user as any)?.role;

    const { data: blogsData, loading: blogsLoading, remove } = useFetch<Blog[]>("/api/blogs");
    const { data: newsData, loading: newsLoading } = useFetch<News[]>("/api/news");

    useEffect(() => {
        if (status === "authenticated" && role !== "admin") {
            router.replace("/");
        }
    }, [status, role, router]);

    const handleDeleteBlog = async (id: string) => {
        const confirmed = confirm("Are you sure you want to delete this course?");
        if (!confirmed) return;

        try {
            await remove(`/api/blogs/${id}`);
            alert("Course deleted successfully!");
            router.reload();
        } catch (error) {
            alert("Error deleting course");
            console.error(error);
        }
    };

    const handleDeleteNews = async (id: string) => {
        const confirmed = confirm("Are you sure you want to delete this news?");
        if (!confirmed) return;

        try {
            await remove(`/api/news/${id}`);
            alert("News deleted successfully!");
            router.reload();
        } catch (error) {
            alert("Error deleting news");
            console.error(error);
        }
    };

    if (status === "loading" || role !== "admin") {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="pt-14 bg-gray-50 flex flex-col items-center min-h-screen gap-y-8 px-6">
            <h1 className="text-5xl font-extrabold mb-6 text-purple-800 drop-shadow-sm text-center">
                Admin Dashboard
            </h1>

            {/* Blogs Section */}
            <div className="w-full max-w-6xl flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-purple-700">Courses</h2>
                <Link href={"/create/blog"}>
                    <button className="px-6 py-2 bg-purple-700 hover:bg-purple-800 text-white text-lg rounded-2xl transition">
                        + Create Course
                    </button>
                </Link>
            </div>

            {blogsLoading ? (
                <CircularProgress />
            ) : (
                <div className="overflow-x-auto w-full max-w-6xl mb-16">
                    <table className="min-w-full bg-white shadow rounded-xl overflow-hidden">
                        <thead className="bg-purple-700 text-white">
                            <tr>
                                <th className="py-3 px-6 text-left">ID</th>
                                <th className="py-3 px-6 text-left">Title</th>
                                <th className="py-3 px-6 text-left">Body</th>
                                <th className="py-3 px-6 text-left">Created At</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogsData && blogsData.length > 0 ? (
                                blogsData.map((post: Blog) => (
                                    <tr
                                        key={post._id}
                                        className="border-b hover:bg-gray-50 transition"
                                    >
                                         <td className="py-4 px-6 font-medium text-purple-800">
                                            {post._id}
                                        </td>
                                        <td className="py-4 px-6 font-medium text-purple-800">
                                            {post.title}
                                        </td>
                                        <td className="py-4 px-6 text-gray-700 max-w-xs line-clamp-2">
                                            {post.body}
                                        </td>
                                        <td className="py-4 px-6 text-gray-600 text-sm">
                                            {post.createdAt
                                                ? new Date(post.createdAt).toLocaleDateString()
                                                : "-"}
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <Tooltip title="Update Blog">
                                                <IconButton
                                                    onClick={() =>
                                                        router.push("/update/blog/" + post._id)
                                                    }
                                                >
                                                    <Edit className="text-gray-400" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete Blog">
                                                <IconButton
                                                    onClick={() => handleDeleteBlog(post._id!)}
                                                >
                                                    <Trash className="text-gray-400" />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="py-10 text-xl font-medium text-center text-gray-500"
                                    >
                                        No blogs in the database.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            {/* News Section */}
            <div className="w-full max-w-6xl flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-purple-700">News</h2>
                <Link href={"/create/news"}>
                    <button className="px-6 py-2 bg-purple-700 hover:bg-purple-800 text-white text-lg rounded-2xl transition">
                        + Create News
                    </button>
                </Link>
            </div>

            {newsLoading ? (
                <CircularProgress />
            ) : (
                <div className="overflow-x-auto w-full max-w-6xl mb-16">
                    <table className="min-w-full bg-white shadow rounded-xl overflow-hidden">
                        <thead className="bg-purple-700 text-white">
                            <tr>
                                <th className="py-3 px-6 text-left">ID</th>
                                <th className="py-3 px-6 text-left">Title</th>
                                <th className="py-3 px-6 text-left">Body</th>
                                <th className="py-3 px-6 text-left">Created At</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newsData && newsData.length > 0 ? (
                                newsData.map((post:News) => (
                                    <tr
                                        key={post._id}
                                        className="border-b hover:bg-gray-50 transition"
                                    >
                                         <td className="py-4 px-6 font-medium text-purple-800">
                                            {post._id}
                                        </td>
                                        <td className="py-4 px-6 font-medium text-purple-800">
                                            {post.title}
                                        </td>
                                        <td className="py-4 px-6 text-gray-700 max-w-xs line-clamp-2">
                                            {post.body}
                                        </td>
                                        <td className="py-4 px-6 text-gray-600 text-sm">
                                            {post.createdAt
                                                ? new Date(post.createdAt).toLocaleDateString()
                                                : "-"}
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <Tooltip title="Update News">
                                                <IconButton
                                                    onClick={() =>
                                                        router.push("/update/news/" + post._id)
                                                    }
                                                >
                                                    <Edit className="text-gray-400" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete News">
                                                <IconButton
                                                    onClick={() => handleDeleteNews(post._id!)}
                                                >
                                                    <Trash className="text-gray-400" />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="py-10 text-xl font-medium text-center text-gray-500"
                                    >
                                        No news in the database.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
}

AdminDashboard.displayName = "Admin Dashboard";
