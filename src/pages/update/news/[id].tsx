import {useEffect, useState} from "react";
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

export  default function UpdateNews(){
    const router = useRouter();
    const {id} = router.query;
    const[newNews, setNewNews] = useState({title :"", body:""});
    const { data: existingNews, loading, put} = useFetch<News>(`/api/news/${id}`);

    useEffect(() => {
        if(existingNews) {
            setNewNews({
                title: existingNews.title,
                body: existingNews.body,
            })
        }
    }, [existingNews]);

    const handleUpdate = async () => {
        if(!newNews.title || !newNews.body || !id) return;
        await put(newNews);
        router.push("/news");
    }

    if(loading) return <p className="text-center mt-10">Loading...</p>

    return(
    <div className="pt-12">
        <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
            <div className="mb-10 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-black text-2xl font-semibold mb-4">
                    Update News
                </h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={newNews.title}
                    onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                    className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
                />
                <textarea
                    placeholder="Content-"
                    value={newNews.body}
                    onChange={(e) => setNewNews({ ...newNews, body: e.target.value })}
                    className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
                />
                <button
                    onClick={handleUpdate}
                    className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                    >
                    Update News
                </button>
            </div>
        </div>
    </div>
    )
}
UpdateNews.displayName = "UpdateNews | My app";