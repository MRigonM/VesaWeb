import useFetch from "../../hooks/useFetch";
import {useEffect, useState} from "react";
import {CircularProgress, IconButton, Tooltip} from "@mui/material";
import {motion} from "framer-motion";
import Link from "next/link";
import {Blog} from "@/api/models/Blog";
import {useRouter} from "next/router";
import {Edit, Trash, View, ViewIcon} from "lucide-react";

export interface Post {
    id: string;
    title: string;
    body: string;
}

export default function Blogs() {
    const {data: initialPosts, loading} = useFetch<Post[]>(
        "https://jsonplaceholder.typicode.com/posts?_limit=3"
    );

    const [posts, setPosts] = useState<Post[] | null>();

    useEffect(() => {
        if (initialPosts) {
            setPosts(initialPosts);
        }
    }, [initialPosts]);

    const handleDelete = (id: string) => {
        if (posts) {
            setPosts(posts.filter((post) => post.id !== id));
        }
    };

    //Blogs nga databaza
    const router = useRouter();
    const {data: blogsData, loading: blogsLoading, remove} = useFetch<Blog[]>("/api/blogs");

    const handleDeleteBlog = async (id: string) => {
        const confirmed = confirm("Are you sure you want to delete this blog?");
        if (!confirmed) {
            return;
        }

        try {
            await remove(`/api/blogs/${id}`);
            alert("Blog u fshi me sukses!");
            router.reload();
        } catch (error) {
            alert("Gabim gjate fshirjes se blogut");
            console.error(error);
        }
    };

    return (
        <div className="pt-14 bg-gray-50 flex flex-col items-center min-h-screen gap-y-20">
            {/* Blogs nga DATABAZA*/}
            {blogsLoading ? (
                <CircularProgress/>
            ) : (
                <div className="bg-gradient-to-b from-gray-100 to-gray-200 w-full py-16 px-4 sm:px-6 lg:px-16">
                    <h1 className="text-5xl font-extrabold mb-12 pb-6 text-purple-800 drop-shadow-sm text-center">
                        Shfaqja e Blogave nga databaza jonë
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {blogsData && blogsData.length > 0 ? (
                            blogsData.map((post: Blog) => (
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
                                    <div className="flex flex-col sm:flex-row justify-end gap-4 mt-auto">
                                        <Tooltip title="Update post">
                                            <IconButton
                                                onClick={() => router.push("update/blog/" + post._id)}
                                            >
                                                <Edit className="text-gray-400"/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete post">
                                            <IconButton
                                                onClick={() => handleDeleteBlog(post._id!)}
                                            >
                                                <Trash className="text-gray-400"/>
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </motion.section>
                            ))
                        ) : (
                            <div className="py-20 text-xl font-medium text-gray-600 text-center">
                                No blogs in the database
                            </div>
                        )}
                    </div>
                    <div className="text-center mt-16">
                        <Link href={"/create/blog"}>
                            <button
                                className="px-6 py-2 bg-purple-700 hover:bg-purple-800 text-white text-lg rounded-2xl transition">
                                + Create Blog
                            </button>
                        </Link>
                    </div>
                </div>
            )}

            {/* Blogs SSG*/}
            {loading ? (
                <CircularProgress/>
            ) : (
                <div className="bg-gradient-to-b from-gray-100 to-gray-200 w-full py-16 px-4 sm:px-6 lg:px-16">
                    <h1 className="text-5xl font-extrabold mb-12 text-purple-800 drop-shadow-sm text-center">
                        Shfaqja e blogut në single page me Static dhe Server Side Generation (SSG)
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {posts &&
                            posts.slice(0, 3)
                                .map((post: Post) => (
                                    <motion.section
                                        key={post.id}
                                        className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between hover:shadow-xl transition duration-300"
                                        initial={{opacity: 0, y: 20}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{duration: 0.6}}
                                    >
                                        <h2 className="text-2xl font-bold mb-2 text-purple-700 uppercase line-clamp-2">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-700 mb-6 line-clamp-4">{post.body}</p>
                                        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-auto">
                                            <Tooltip title="Post details">
                                                <IconButton
                                                    onClick={() => router.push("blogs/ssg/" + post.id)}
                                                >
                                                    <View className="text-gray-400"/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete post">
                                                <IconButton
                                                    onClick={() => handleDelete(post.id)}
                                                >
                                                    <Trash className="text-gray-400"/>
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </motion.section>))}
                    </div>
                </div>
            )}
            {/* Blogs SSR*/}
            {loading ? (
                <CircularProgress/>
            ) : (
                <div className="bg-gradient-to-b from-gray-100 to-gray-200 w-full py-16 px-4 sm:px-6 lg:px-16">
                    <h1 className="text-5xl font-extrabold mb-12 text-purple-800 drop-shadow-sm text-center">
                        Shfaqja e blogut në single page me (SSR)
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {posts &&
                            posts.slice(0, 3)
                                .map((post: Post) => (
                                    <motion.section
                                        key={post.id}
                                        className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between hover:shadow-xl transition duration-300"
                                        initial={{opacity: 0, y: 20}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{duration: 0.6}}>
                                        <h2 className="text-2xl font-bold mb-2 text-purple-700 uppercase line-clamp-2">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-700 mb-6 line-clamp-4">{post.body}</p>
                                        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-auto">
                                            <Tooltip title="Post details">
                                                <IconButton
                                                    onClick={() => router.push("blogs/ssr/" + post.id)}
                                                >
                                                    <View className="text-gray-400"/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete post">
                                                <IconButton
                                                    onClick={() => handleDelete(post.id)}
                                                >
                                                    <Trash className="text-gray-400"/>
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </motion.section>))}
                    </div>
                </div>
            )}
            {/* Blogs ISR*/}
            {loading ? (
                <CircularProgress/>
            ) : (
                <div className="bg-gradient-to-b from-gray-100 to-gray-200 w-full py-16 px-4 sm:px-6 lg:px-16">
                    <h1 className="text-5xl font-extrabold mb-12 text-purple-800 drop-shadow-sm text-center">
                        Shfaqja e blogut në single page me (ISR)
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {posts &&
                            posts.slice(0, 3)
                                .map((post: Post) => (
                                    <motion.section
                                        key={post.id}
                                        className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between hover:shadow-xl transition duration-300"
                                        initial={{opacity: 0, y: 20}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{duration: 0.6}}>
                                        <h2 className="text-2xl font-bold mb-2 text-purple-700 uppercase line-clamp-2">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-700 mb-6 line-clamp-4">{post.body}</p>
                                        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-auto">
                                            <Tooltip title="Post details">
                                                <IconButton
                                                    onClick={() => router.push("blogs/isr/" + post.id)}
                                                >
                                                    <View className="text-gray-400"/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete post">
                                                <IconButton
                                                    onClick={() => handleDelete(post.id)}
                                                >
                                                    <Trash className="text-gray-400"/>
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </motion.section>))}
                    </div>
                </div>
            )}
        </div>
    )
}

Blogs.displayName = "Blogs";