//Static Site Generation (SSG) with Next.js
import {GetStaticPaths, GetStaticProps} from "next";

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking",
    }
}
export const getStaticProps: GetStaticProps = async ({params}) => {
    console.log("params", params);

    const res = await fetch(`https://json-placeholder.mock.beeceptor.com/posts/${params?.id}`);
    const post = await res.json();
    return {
        props: {post},
        revalidate: 10, // 10 seconds
        notFound: !post.id, // 404 if post not found
    };


}

export default function Blog({post}: any) {
    return (
        <div className="pt-12 px-20 flex flex-col items-center justify-center min-h-screen gap-y-20">
            <h2 className="text-4xl text-center font-bold mb-6 text-black pt-20">
                SSG Post ID : {post.id}
            </h2>
            <h1 className="text-4xl text-center font-bold mb-6 text-yellow-600 line-clamp-2 uppercase">{post.title}</h1>
            <p className="text-sm text-gray-500 mt-4">{post.body}</p>

            <p className="text-sm text-gray-500"> Rifreskohet automatikisht cdo 10 sekonda ne sfond. </p>
        </div>
    );
}
