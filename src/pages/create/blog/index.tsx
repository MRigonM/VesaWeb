﻿import {useState} from "react";
import useFetch from "../../../hooks/useFetch";
import {Blog} from "@/api/models/Blog";
import {useRouter} from "next/router";

export  default function CreateBlog(){
    const router = useRouter();
    const[newBlog, setNewBlog] = useState({title :"", body:""});
    const { post } = useFetch<Blog[]>("/api/blogs");

    const handleCreate = async () => {
        if (!newBlog.title || !newBlog.body) return;
        await post(newBlog);
        setNewBlog({title :"", body:""});
        router.push("/blogs");
    };
    return(
    <div className="pt-12">
        <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
            <div className="mb-10 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-black text-2xl font-semibold mb-4">
                    Create Course
                </h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                    className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
                />
                <textarea
                    placeholder="Content"
                    value={newBlog.body}
                    onChange={(e) => setNewBlog({ ...newBlog, body: e.target.value })}
                    className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
                />
                <button
                    onClick={handleCreate}
                    className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                    >
                    Create Blog
                </button>
            </div>
        </div>
    </div>
    )
}
CreateBlog.displayName = "CreateBlog | My app";