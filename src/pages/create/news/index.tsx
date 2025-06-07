import {useState} from "react";
import useFetch from "../../../hooks/useFetch";
import {News} from "@/api/models/News";
import {useRouter} from "next/router";

export  default function CreateNews(){
    const router = useRouter();
    const[newNews, setNewNews] = useState({title :"", body:""});
    const { post } = useFetch<News[]>("/api/news");

    const handleCreate = async () => {
        if (!newNews.title || !newNews.body) return;
        await post(newNews);
        setNewNews({title :"", body:""});
        router.push("/news");
    };
    return(
    <div className="pt-12">
        <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
            <div className="mb-10 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-black text-2xl font-semibold mb-4">
                    Create News
                </h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={newNews.title}
                    onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                    className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
                />
                <textarea
                    placeholder="Content"
                    value={newNews.body}
                    onChange={(e) => setNewNews({ ...newNews, body: e.target.value })}
                    className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
                />
                <button
                    onClick={handleCreate}
                    className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                    >
                    Create News
                </button>
            </div>
        </div>
    </div>
    )
}
CreateNews.displayName = "CreateNews | My app";