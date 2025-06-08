import useFetch from "../../../hooks/useFetch";
import { Blog } from "@/api/models/Blog";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import {useForm} from "react-hook-form";

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

type BlogFormData = {
    title: string;
    body: string;
};

export default function CreateBlog() {
    const router = useRouter();
    const { post } = useFetch<Blog[]>("/api/blogs");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<BlogFormData>();

    const onSubmit = async (data: BlogFormData) => {
        await post(data);
        reset();
        router.push("/admin/dashboard");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
                    Create Course
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <input
                        type="text"
                        placeholder="Enter title"
                        {...register("title", {
                            required: "Title is required",
                            minLength: {
                                value: 5,
                                message: "Title must be at least 5 characters",
                            },
                        })}
                        className="w-full px-4 py-3 mb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder-gray-400"
                    />
                    {errors.title && (
                        <p className="text-red-600 text-sm mb-4">{errors.title.message}</p>
                    )}

                    <textarea
                        placeholder="Enter content"
                        {...register("body", {
                            required: "Content is required",
                            minLength: {
                                value: 20,
                                message: "Content must be at least 20 characters",
                            },
                        })}
                        className="w-full px-4 py-3 mb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder-gray-400 min-h-[150px]"
                    />
                    {errors.body && (
                        <p className="text-red-600 text-sm mb-4">{errors.body.message}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-xl text-lg font-semibold transition"
                    >
                        Create Course
                    </button>
                </form>
            </div>
        </div>
    );
}

CreateBlog.displayName = "CreateBlog | My app";
