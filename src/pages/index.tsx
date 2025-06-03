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
        "https://jsonplaceholder.typicode.com/posts"
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
                    Mirë se Vini në Aplikacionin Tonë!
                </h1>
                <p className="text-xl mb-6">
                    Ndërtoni aplikacione të fuqishme dhe të shpejta me Next.js
                </p>
                <Button text={"Meso me shume"}
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
                    Rreth Nesh
                </h2>
                <p className="text-gray-700 mb-6">
                    Ne krijojme aplikacione te avancuara duke perdorur teknologjite me
                    te fundit.Fokusi yne kryesir eshte te ofrojme produkte te optimizuara dhe SEO-fiendly.
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
                        Karakyeristikat Kryesore
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card icon={Rocket}
                              title="Shpejtesi dhe Perfomanc"
                              description="Aplikacion me i mire per motoret"
                        />
                        <Card icon={BarChart}
                              title="SEO e Avancuar"
                              description="Rankim me i mire per motoret"
                        />
                        <Card icon={ShieldCheck}
                              title="Siguri maksimale"
                              description="Mbrojtje e te dhenave dhe siguri"
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
                    Sherbimet tona
                </h2>
                <p className="text-gray-700 mb-6">
                    Ofrojme nje game te gjere sherbimesh dduke perfshire zhvillimin
                    e aplikacioneve web,optimizimin per SEO dhe integrimin
                    me API te jashtem.
                </p>
                <Button text="Shikoni Sherbimet"
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
                <h2 className="text-4xl font-bold mb-6">Kontaktoni me Ne</h2>
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
