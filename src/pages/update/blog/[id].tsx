import {useEffect, useState} from "react";
import useFetch from "../../../hooks/useFetch";
import {Blog} from "@/api/models/Blog";
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

export  default function UpdateBlog(){
    const router = useRouter();
    const {id} = router.query;
    const[newBlog, setNewBlog] = useState({title :"", body:""});
    const { data: existingBlog, loading, put} = useFetch<Blog>(`/api/blogs/${id}`);

    useEffect(() => {
        if(existingBlog) {
            setNewBlog({
                title: existingBlog.title,
                body: existingBlog.body,
            })
        }
    }, [existingBlog]);

    const handleUpdate = async () => {
        if(!newBlog.title || !newBlog.body || !id) return;
        await put(newBlog);
        router.push("/admin/dashboard");
    }

    if(loading) return <p className="text-center mt-10">Loading...</p>

    return(
    <div className="pt-12">
        <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
            <div className="mb-10 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-black text-2xl font-semibold mb-4">
                    Update Course
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
                    onClick={handleUpdate}
                    className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                    >
                    Update Blog
                </button>
            </div>
        </div>
    </div>
    )
}
UpdateBlog.displayName = "UpdateBlog | My app";