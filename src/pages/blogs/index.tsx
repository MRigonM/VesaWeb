import useFetch from "../../hooks/useFetch";
import {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import {motion} from "framer-motion";
import Link from "next/link";
import {Blog} from "../api/models/Blog";
import {useRouter} from "next/router";

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
        <div className="pt-12">
            <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
                {/* Blogs nga DATABAZA*/}
                {blogsLoading ? (
                    <CircularProgress/>
                ) : (
                    <div className="bg-gray-200 w-full">
                        <h1 className="text-4xl font-bold pt-20 pb-6 text-black text-center">
                            Shfaqja e Blogave nga databaza jonë
                        </h1>
                        <div className="grid grid-cols-3">
                            {blogsData && blogsData.length > 0 ? (
                                blogsData.map((post: Blog) => (
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
                                            <Link href={"/update/blog/" + post._id}>
                                                <button
                                                    className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl transition">
                                                    Update
                                                </button>
                                            </Link>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteBlog(post._id!)}
                                            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white transition">
                                            Delete Post
                                        </button>
                                    </motion.section>
                                ))
                            ) : (
                                <div className="col-span-3 py-20">
                                    <p className="text-xl font-bold pb-10 text-black text-center">
                                        Nuk ka blogs ne databaze
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="text-center pb-10">
                            <Link href={"/create/blog"}>
                                <button
                                    className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl transition">
                                    Krijo blog
                                </button>
                            </Link>
                        </div>
                    </div>
                )}

                {/* Blogs SSG*/}
                {loading ? (
                    <CircularProgress/>
                ) : (
                    <div className="bg-gray-200">
                        <h1 className="text-4xl font-bold py-20 pb-6 text-black text-center">
                            Shfaqja e blogut në single page me Static dhe Server Side Generation (SSG)
                        </h1>
                        <div className="grid grid-cols-3">
                            {posts &&
                                posts.slice(0, 3)
                                    .map((post: Post) => (
                                        <motion.section
                                            key={post.id}
                                            className="max-w-6xl py-20 px-6 text-center"
                                            initial={{scale: 0.8}}
                                            animate={{scale: 1}}
                                            transition={{duration: 1}}>
                                            <h2 className="text-4xl font-bold mb-6 text-yellow-600 line-clamp-2 uppercase">
                                                {post.title}
                                            </h2>
                                            <p className="text-gray-700 mb-6">{post.body}</p>
                                            <div className="mb-6">
                                                <Link href={"/blogs/ssg/" + post.id}>
                                                    <button
                                                        className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl transition">
                                                        Shiko Detajet
                                                    </button>
                                                </Link>
                                            </div>
                                            <button onClick={() => handleDelete(post.id)}
                                                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white transition">
                                                Fshij Postin
                                            </button>
                                        </motion.section>))}
                        </div>
                    </div>
                )}
                {/* Blogs SSR*/}
                {loading ? (
                    <CircularProgress/>
                ) : (
                    <div className="bg-gray-200">
                        <h1 className="text-4xl font-bold py-20 pb-6 text-black text-center">
                            Shfaqja e blogut në single page me (SSR)
                        </h1>
                        <div className="grid grid-cols-3">
                            {posts &&
                                posts.slice(0, 3)
                                    .map((post: Post) => (
                                        <motion.section
                                            key={post.id}
                                            className="max-w-6xl py-20 px-6 text-center"
                                            initial={{scale: 0.8}}
                                            animate={{scale: 1}}
                                            transition={{duration: 1}}>
                                            <h2 className="text-4xl font-bold mb-6 text-yellow-600 line-clamp-2 uppercase">
                                                {post.title}
                                            </h2>
                                            <p className="text-gray-700 mb-6">{post.body}</p>
                                            <div className="mb-6">
                                                <Link href={"/blogs/ssr/" + post.id}>
                                                    <button
                                                        className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl transition">
                                                        Shiko Detajet
                                                    </button>
                                                </Link>
                                            </div>
                                            <button onClick={() => handleDelete(post.id)}
                                                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white transition">
                                                Fshij Postin
                                            </button>
                                        </motion.section>))}
                        </div>
                    </div>
                )}
                {/* Blogs ISR*/}
                {loading ? (
                    <CircularProgress/>
                ) : (
                    <div className="bg-gray-200">
                        <h1 className="text-4xl font-bold py-20 pb-6 text-black text-center">
                            Shfaqja e blogut në single page me (ISR)
                        </h1>
                        <div className="grid grid-cols-3">
                            {posts &&
                                posts.slice(0, 3)
                                    .map((post: Post) => (
                                        <motion.section
                                            key={post.id}
                                            className="max-w-6xl py-20 px-6 text-center"
                                            initial={{scale: 0.8}}
                                            animate={{scale: 1}}
                                            transition={{duration: 1}}>
                                            <h2 className="text-4xl font-bold mb-6 text-yellow-600 line-clamp-2 uppercase">
                                                {post.title}
                                            </h2>
                                            <p className="text-gray-700 mb-6">{post.body}</p>
                                            <div className="mb-6">
                                                <Link href={"/blogs/isr/" + post.id}>
                                                    <button
                                                        className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl transition">
                                                        Shiko Detajet
                                                    </button>
                                                </Link>
                                            </div>
                                            <button onClick={() => handleDelete(post.id)}
                                                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white transition">
                                                Fshij Postin
                                            </button>
                                        </motion.section>))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

Blogs.displayName = "Blogs";