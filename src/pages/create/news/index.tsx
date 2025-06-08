import {useState} from "react";
import useFetch from "../../../hooks/useFetch";
import {News} from "@/api/models/News";
import {useRouter} from "next/router";
import {getServerSession} from "next-auth";
import {authOptions} from "../../api/auth/[...nextauth]";

export async function getServerSideProps(context: any) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session || (session.user as any).role !== "admin") {
        return {
            redirect: {
                destination: "/sign-in",
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
}

export  default function CreateNews(){
    const router = useRouter();
    const[newNews, setNewNews] = useState({title :"", body:""});
    const { post } = useFetch<News[]>("/api/news");

    const handleCreate = async () => {
        if (!newNews.title || !newNews.body) return;
        await post(newNews);
        setNewNews({title :"", body:""});
        router.push("/admin/dashboard");
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
                    Create News
                </h2>
                <input
                    type="text"
                    placeholder="Enter title"
                    value={newNews.title}
                    onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                    className="w-full px-4 py-3 mb-5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder-gray-400"
                />
                <textarea
                    placeholder="Enter content"
                    value={newNews.body}
                    onChange={(e) => setNewNews({ ...newNews, body: e.target.value })}
                    className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder-gray-400 min-h-[150px]"
                />
                <button
                    onClick={handleCreate}
                    className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-xl text-lg font-semibold transition"
                >
                    Create Blog
                </button>
            </div>
        </div>
    );
}
CreateNews.displayName = "CreateNews | My app";