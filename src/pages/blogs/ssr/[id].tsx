//(SSR) with Next.js
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch(`https://json-placeholder.mock.beeceptor.com/posts/${params?.id}`);
  const post = await res.json();
  return { props: { post } };
};

export default function Blog({ post }: any) {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const [isFavorited, setIsFavorited] = useState(false);

  const getFavoritesKey = (email: string) => `favorites_${email}`;

  const loadFavorites = (email: string) => {
    const raw = localStorage.getItem(getFavoritesKey(email));
    return raw ? JSON.parse(raw) : [];
  };

  const saveFavorites = (email: string, favorites: any[]) => {
    localStorage.setItem(getFavoritesKey(email), JSON.stringify(favorites));
  };

  useEffect(() => {
    if (!userEmail) return;
    const favorites = loadFavorites(userEmail);
    const isFav = favorites.some((fav: any) => fav.id === post.id && fav.type === "ssr");
    setIsFavorited(isFav);
  }, [post.id, userEmail]);

  const handleToggleFavorite = () => {
    if (!userEmail) return;
    const favorites = loadFavorites(userEmail);
    const courseData = { ...post, type: "ssr" };
    const updatedFavorites = isFavorited
      ? favorites.filter((fav: any) => fav.id !== post.id || fav.type !== "ssr")
      : [...favorites, courseData];

    saveFavorites(userEmail, updatedFavorites);
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-6">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-purple-800 mb-10 text-center">SSR</h2>
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-10 sm:p-14 text-center">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 uppercase mb-4 line-clamp-2">
          {post.title}
        </h1>
        <p className="text-gray-700 leading-relaxed mb-6">{post.body}</p>
        {status === "authenticated"  && (
        <button
          onClick={handleToggleFavorite}
          className={`px-6 py-2 rounded-xl text-white font-semibold transition ${
            isFavorited ? "bg-red-600 hover:bg-red-700" : "bg-purple-700 hover:bg-purple-800"
          }`}
        >
          {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
        </button>
             )}
        <p className="text-sm text-gray-500 italic mt-4">Rendered by server requests</p>
      </div>
    </div>
  );
}
