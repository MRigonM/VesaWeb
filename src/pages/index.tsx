import Image from "next/image";
import {motion} from "framer-motion";
import CustomImage from "@/assets/images/image.jpg"
import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import {Rocket, BarChart, ShieldCheck, Trash} from "lucide-react";
import useFetch from "../hooks/useFetch";
import {useEffect, useState} from "react";
import {CircularProgress, IconButton, Tooltip} from "@mui/material";
import {useSession} from "next-auth/react";
import {router} from "next/client";


export interface Post {
    id: string;
    title: string;
    body: string;
}

export default function Home() {
    const {data: session, status} = useSession();
    const role = (session?.user as any)?.role;
    const {data: initialPosts, loading} = useFetch<Post[]>(
        "https://json-placeholder.mock.beeceptor.com/posts"
    );
    const [posts, setPosts] = useState<Post[] | null>(null);

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

    const loadFavorites = (email: string) => {
        try {
            const data = localStorage.getItem(`favorites_${email}`);
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    };

    const saveFavorites = (email: string, favorites: any[]) => {
        localStorage.setItem(`favorites_${email}`, JSON.stringify(favorites));
    };

    const [favoritedIds, setFavoritedIds] = useState<string[]>([]);

    useEffect(() => {
        if (session?.user?.email) {
            const stored = loadFavorites(session.user.email);
            setFavoritedIds(stored.map((fav: any) => fav.id));
        }
    }, [session?.user?.email]);

    const handleToggleFavorite = (post: Post) => {
        if (!session?.user?.email) return;

        const userEmail = session.user.email;
        const favorites = loadFavorites(userEmail);
        const exists = favorites.find(
            (fav: any) => fav.id === post.id && fav.type === "ssg"
        );

        let updatedFavorites;
        if (exists) {
            updatedFavorites = favorites.filter(
                (fav: any) => fav.id !== post.id || fav.type !== "ssg"
            );
        } else {
            const courseData = {
                id: post.id,
                title: post.title,
                body: post.body,
                type: "ssg",
                source: "home",
            };
            updatedFavorites = [...favorites, courseData];
        }

        saveFavorites(userEmail, updatedFavorites);
        setFavoritedIds(updatedFavorites.map((f: any) => f.id));
    };


    return (
        <div className="pt-14 bg-gradient-to-br from-purple-50 to-purple-100 min-h-screen">
            {/* Hero Section */}
            <motion.section
                className="w-full py-24 bg-purple-700 text-white px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
                        Welcome to our Programming Courses Application
                    </h1>
                    <p className="text-xl mb-8 leading-relaxed">
                        Learn how to code or build your skills in programming online to gain a better understanding of how websites and apps are designed and developed.
                    </p>
                    <Button
                        text={"Learn more"}
                        variant="secondary"
                        onClick={() => router.push("/about")}
                    />
                </div>
            </motion.section>

            {/* About Section */}
            <motion.section
                className="max-w-6xl mx-auto py-20 px-6 text-center"
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ duration: 1 }}
            >
                <h2 className="text-4xl font-bold mb-6 text-purple-700">
                    Learn anything
                </h2>
                <p className="text-gray-700 mb-8 leading-relaxed">
                    Whether you want to develop as a professional or discover a new hobby, there iss an online course for that.
                    You can even take your learning further with online microcredentials and degrees.
                    Join millions of people from around the world learning together. Online learning is as easy and natural as chatting with a group of friends.
                    Meet educators from top universities and cultural institutions, who will share their experience through videos, quizzes and discussions.
                </p>
                <Image
                    src={CustomImage.src}
                    alt="About Us Image"
                    width={600}
                    height={400}
                    className="rounded-xl shadow-lg mx-auto"
                />
            </motion.section>

            {/* Features Section */}
            <motion.section
                className="w-full py-20 bg-gray-200 text-center"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold mb-8 text-purple-600">
                        Main Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card
                            icon={Rocket}
                            title="Speed and Performance"
                            description="Experience lightning-fast performance for all your needs."
                        />
                        <Card
                            icon={BarChart}
                            title="Advanced SEO"
                            description="Get the best search engine rankings with our optimized solutions."
                        />
                        <Card
                            icon={ShieldCheck}
                            title="Maximum Security"
                            description="Your data is protected with top-notch security protocols."
                        />
                    </div>
                </div>
            </motion.section>

            {/* Services Section */}
            <motion.section
                className="max-w-6xl py-20 mx-auto px-6 text-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1 }}
            >
                <h2 className="text-4xl font-bold mb-6 text-purple-700">
                    Our Services
                </h2>
                <p className="text-gray-700 mb-8 leading-relaxed">
                    We offer a wide range of services including web application development,
                    SEO optimization, and integration with external APIs.
                </p>
                <Button
                    text="View Courses"
                    variant="secondary"
                    onClick={() => router.push("/blogs")}
                />
            </motion.section>

            {/* Course Section */}
            <section className="max-w-6xl mx-auto py-20 px-6 bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl">
                <h2 className="text-4xl font-bold mb-8 text-purple-700 text-center">
                    Latest Courses
                </h2>
                {loading ? (
                    <div className="flex justify-center">
                        <CircularProgress />
                    </div>
                ) : posts && posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {posts.slice(0, 9).map((post) => {
                            const isFavorited = favoritedIds.includes(post.id);
                            return (
                                <motion.section
                                    key={post.id}
                                    className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between relative"
                                    initial={{scale: 0.8}}
                                    animate={{scale: 1}}
                                    transition={{duration: 1}}
                                >
                                    <h3 className="text-2xl font-bold mb-2 text-purple-700 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 flex-1 leading-relaxed">{post.body}</p>

                                    <div className="flex justify-between items-center mt-4">
                                        {role === "admin" && (
                                            <Tooltip title="Delete Post">
                                                <IconButton onClick={() => handleDelete(post.id)}>
                                                    <Trash className="text-gray-400"/>
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        {status === "authenticated" && (
                                            <Tooltip title={isFavorited ? "Remove from favorites" : "Add to favorites"}>
                                                <IconButton onClick={() => handleToggleFavorite(post)}>
                                                <span className={isFavorited ? "text-red-500" : "text-gray-400"}>
                                                  {isFavorited ? "❤️" : "🤍"}
                                                </span>
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </div>
                                </motion.section>
                            );
                        })}

                    </div>
                ) : (
                    <p className="text-center text-gray-500">
                        No blog posts available.
                    </p>
                )}
            </section>

            {/* Contact Section */}
            <motion.section
                className="w-full py-20 bg-purple-700 text-white text-center px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
                <p className="mb-2 text-lg">Email: contact@mycompany.com</p>
                <p className="mb-2 text-lg">TEL: +383 123 456 789</p>
                <p className="mb-8 text-lg">Address: Prishtine, Kosove</p>
                <Button
                    text="Contact us"
                    variant="secondary"
                    onClick={() => router.push("/contact")}
                />
            </motion.section>
        </div>
    );
}

Home.displayName = "My Application";
