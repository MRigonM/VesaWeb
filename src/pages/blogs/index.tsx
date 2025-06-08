import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { Blog } from "@/api/models/Blog";
import { useRouter } from "next/router";
import { Edit, Trash, View } from "lucide-react";
import { useSession } from "next-auth/react";

export interface Post {
  id: string;
  title: string;
  body: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Blogs() {
  const { data: session } = useSession();
  const role = (session?.user as any)?.role;

  const { data: initialPosts, loading } = useFetch<Post[]>(
    "https://json-placeholder.mock.beeceptor.com/posts"
  );

  const [posts, setPosts] = useState<Post[] | null>();

  useEffect(() => {
    if (initialPosts) {
      setPosts(initialPosts);
    }
  }, [initialPosts]);

  const handleDelete = (id: string) => {
    if (posts) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  const router = useRouter();
  const { data: blogsData, loading: blogsLoading, remove } = useFetch<Blog[]>("/api/blogs");

  const handleDeleteBlog = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this blog?");
    if (!confirmed) return;

    try {
      await remove(`/api/blogs/${id}`);
      alert("Blog u fshi me sukses!");
      router.reload();
    } catch (error) {
      alert("Gabim gjate fshirjes se blogut");
      console.error(error);
    }
  };

  const renderPosts = (posts?: Post[] | null, routePrefix?: string) => (
    posts?.slice(0, 3).map((post: Post) => (
      <motion.section
        key={post.id}
        className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between hover:shadow-2xl transition-transform transform hover:-translate-y-1"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl md:text-2xl font-semibold md:font-bold mb-2 text-purple-700 uppercase line-clamp-2">
          {post.title}
        </h2>
        <p className="text-gray-700 mb-6 line-clamp-4">{post.body}</p>
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-auto">
          <Tooltip title="Course details">
            <IconButton onClick={() => router.push(`blogs/${routePrefix}/${post.id}`)} className="hover:text-blue-600">
              <View className="text-blue-500" />
            </IconButton>
          </Tooltip>
          {role === "admin" && (
            <Tooltip title="Delete course">
              <IconButton onClick={() => handleDelete(post.id)} className="hover:text-red-600">
                <Trash className="text-red-500" />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </motion.section>
    ))
  );

  return (
    <div className="pt-14 bg-gray-50 flex flex-col items-center min-h-screen gap-y-20">
      {/* Blogs from DB */}
      {blogsLoading ? (
        <CircularProgress />
      ) : (
        <div className="bg-gradient-to-b from-gray-100 to-gray-200 w-full py-16 px-4 sm:px-6 lg:px-16">
          <div className="max-w-screen-xl mx-auto">
            <h1 className="text-5xl font-extrabold mb-12 pb-6 text-purple-800 drop-shadow-sm text-center">
              Displaying Courses from our Database
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogsData && blogsData.length > 0 ? (
                blogsData.map((post: Blog) => (
                  <motion.section
                    key={post._id}
                    className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between hover:shadow-2xl transition-transform transform hover:-translate-y-1"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-xl md:text-2xl font-semibold md:font-bold mb-4 text-purple-700 uppercase line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-700 mb-6 line-clamp-4">{post.body}</p>
                    {role === "admin" && (
                      <div className="flex flex-col sm:flex-row justify-end gap-4 mt-auto">
                        <Tooltip title="Update post">
                          <IconButton
                              onClick={() => router.push("update/blog/" + post._id)}
                              className="hover:text-purple-700">
                            <Edit className="text-purple-600"/>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete post">
                          <IconButton onClick={() => handleDeleteBlog(post._id!)}
                                      className="hover:text-red-600">
                            <Trash className="text-red-500" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    )}
                  </motion.section>
                ))
              ) : (
                <div className="py-20 text-xl font-medium text-gray-600 text-center">
                  No courses in the database
                </div>
              )}
            </div>
            {role === "admin" && (
              <div className="text-center mt-16">
                <Link href="/create/blog">
                  <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2 rounded-full shadow-md transition duration-300">
                    + Create Course
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Blogs SSG */}
      {!loading && (
        <div className="bg-gradient-to-b from-gray-100 to-gray-200 w-full py-16 px-4 sm:px-6 lg:px-16">
          <div className="max-w-screen-xl mx-auto">
            <h1 className="text-5xl font-extrabold mb-12 text-purple-800 drop-shadow-sm text-center">
              Single Page Blog Display (SSG)
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {renderPosts(posts, "ssg")}
            </div>
          </div>
        </div>
      )}

      {/* Blogs SSR */}
      {!loading && (
        <div className="bg-gradient-to-b from-gray-100 to-gray-200 w-full py-16 px-4 sm:px-6 lg:px-16">
          <div className="max-w-screen-xl mx-auto">
            <h1 className="text-5xl font-extrabold mb-12 text-purple-800 drop-shadow-sm text-center">
              Blog Display (SSR)
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {renderPosts(posts, "ssr")}
            </div>
          </div>
        </div>
      )}

      {/* Blogs ISR */}
      {!loading && (
        <div className="bg-gradient-to-b from-gray-100 to-gray-200 w-full py-16 px-4 sm:px-6 lg:px-16">
          <div className="max-w-screen-xl mx-auto">
            <h1 className="text-5xl font-extrabold mb-12 text-purple-800 drop-shadow-sm text-center">
              Course Display (ISR)
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {renderPosts(posts, "isr")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Blogs.displayName = "Blogs";
