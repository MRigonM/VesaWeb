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
    return {props: {post}};


}

export default function Blog({post}: any) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-6">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-purple-800 mb-10 text-center">
        Static Site Generated Blog
      </h2>
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-10 sm:p-14 text-center">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 uppercase mb-4 line-clamp-2">
          {post.title}
        </h1>
        <p className="text-gray-700 leading-relaxed mb-6">
          {post.body}
        </p>
        <p className="text-sm text-gray-500 italic">
          Rendered ne build time
        </p>
      </div>
    </div>
  );
}