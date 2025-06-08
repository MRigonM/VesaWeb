import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { Blog } from "@/api/models/Blog";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";

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

export default function UpdateBlog() {
    const router = useRouter();
    const { id } = router.query;
    const [newBlog, setNewBlog] = useState({ title: "", body: "" });
    const { data: existingBlog, loading, put } = useFetch<Blog>(`/api/blogs/${id}`);

    useEffect(() => {
        if (existingBlog) {
            setNewBlog({
                title: existingBlog.title,
                body: existingBlog.body,
            });
        }
    }, [existingBlog]);

    const handleUpdate = async () => {
        if (!newBlog.title || !newBlog.body || !id) return;
        await put(newBlog);
        router.push("/admin/dashboard");
    };

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl text-gray-600">Loading...</p>
            </div>
        );

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
                    Update Course
                </h2>
                <input
                    type="text"
                    placeholder="Enter title"
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                    className="w-full px-4 py-3 mb-5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder-gray-400"
                />
                <textarea
                    placeholder="Enter content"
                    value={newBlog.body}
                    onChange={(e) => setNewBlog({ ...newBlog, body: e.target.value })}
                    className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder-gray-400 min-h-[150px]"
                />
                <button
                    onClick={handleUpdate}
                    className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-xl text-lg font-semibold transition"
                >
                    Update Blog
                </button>
            </div>
        </div>
    );
}

UpdateBlog.displayName = "UpdateBlog | My app";
