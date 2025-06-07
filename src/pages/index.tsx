import Image from "next/image";
import {motion} from "framer-motion";
import CustomImage from "@/assets/images/image.jpg"
import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import {Rocket, BarChart, ShieldCheck, Trash} from "lucide-react";
import useFetch from "../hooks/useFetch";
import {useEffect, useState} from "react";
import {CircularProgress, IconButton, Tooltip} from "@mui/material";


export interface Post {
    id: string;
    title: string;
    body: string;
}

export default function Home() {
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
    }
    return (
        <div className="pt-14 bg-gradient-to-br from-purple-50 to-purple-100 min-h-screen">
            {/*Hero Section */}
            <motion.section
                className="w-full py-24 bg-purple-700 text-white text-center px-4"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
            >
                <h1 className="text-5xl text-primary font-extrabold mb-4">
                    Welcome to our Programming Courses Application
                </h1>
                <p className="text-xl mb-6">
                    Learn how to code or build your skills in programming online to gain a better understanding of how websites and apps are designed and developed.
                </p>
                <Button text={"Learn more"}
                        variant="secondary"
                        onClick={() => alert("Redirecting...")}/>
            </motion.section>
            {/* About Section*/}
            <motion.section
                className="max-w-6xl mx-auto py-20 px-6 text-center"
                initial={{x: -100}}
                animate={{x: 0}}
                transition={{duration: 1}}
            >
                <h2 className="text-4xl font-bold mb-6 text-purple-700">
                    Learn anything
                </h2>
                <p className="text-gray-700 mb-6">
                    Whether you want to develop as a professional or discover a new hobby, there's an online course for
                    that.
                    You can even take your learning further with online microcredentials and degrees.
                    Join millions of people from around the world learning together. Online learning is as easy and
                    natural as chatting with a group of friends.
                    Meet educators from top universities and cultural institutions, who'll share their experience
                    through videos, quizzes and discussions.
                </p>
                <Image
                    src={CustomImage.src}
                    alt="Imazh Rreth Nesh"
                    width={500}
                    height={300}
                    className="rounded-xl shadow-lg mx-auto"
                />
            </motion.section>
            {/*Features Section */}
            <motion.section
                className="w-full py-20 bg-gray-200 text-center"
                initial={{y: 100}}
                animate={{y: 0}}
                transition={{duration: 1}}
            >
                <div className="contanier m-auto">
                    <h2 className="text-4xl font-bold mb-6 text-purple-600">
                        Main Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card icon={Rocket}
                              title="Speed and Performance"
                              description="Best app for engines"
                        />
                        <Card icon={BarChart}
                              title="Advanced SEO"
                              description="Best ranking for engines"
                        />
                        <Card icon={ShieldCheck}
                              title="Maximum security"
                              description="Data protection and security"
                        />
                    </div>
                </div>
            </motion.section>
            {/*Service Section */}
            <motion.section
                className="max-w-6xl py-20 mx-auto px-6 text-center"
                initial={{scale: 0.8}}
                animate={{scale: 1}}
                transition={{duration: 1}}
            >
                <h2 className="text-4xl font-bold mb-6 text-purple-700">
                    Our services
                </h2>
                <p className="text-gray-700 mb-6">
                    We offer a wide range of services including web application development,
                    SEO optimization, and integration with external APIs.
                </p>
                <Button text="View Services"
                        variant="secondary"
                        onClick={() => alert("Redirecting...")}
                />
            </motion.section>
            {/* Blog Section */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-20 px-6 bg-purple-50">
                {loading ? (
                    <CircularProgress/>
                ) : (
                    <>
                        {posts && posts?.map((post) => (
                            <motion.section
                                key={post.id}
                                className="bg-white p-6 rounded-lg shadow-md text-left flex-col"
                                initial={{scale: 0.8}}
                                animate={{scale: 1}}
                                transition={{duration: 1}}
                            >
                                <h3 className="text-2xl font-bold mb-2 text-purple-700 line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 mb-4 flex-1">{post.body}</p>
                                <Tooltip title="Delete Post">
                                  <IconButton onClick={() => handleDelete(post.id)}>
                                    <Trash className="text-gray-400"/>
                                  </IconButton>
                                </Tooltip>
                            </motion.section>
                        ))}
                    </>
                )}
            </div>
            {/* Contact Section */}
            <motion.section
                className="w-full py-20 bg-purple-700 text-white text-center px-4"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
            >
                <h2 className="text-4xl font-bold mb-6"> Contact us</h2>
                <p className="mb-1"> Email contact@mycompany.com</p>
                <p className="mb-1">TEL: +383 123 456 789</p>
                <p className="mb-6">Adresa:Prishtine, Kosove</p>
                <Button text="Na kontaktoni"
                        variant={"secondary"}
                        onClick={() => alert("Opening Contact Form...")}
                />
            </motion.section>
        </div>
    );
}

Home.displayName = "My Application";
