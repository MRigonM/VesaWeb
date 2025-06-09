import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`https://json-placeholder.mock.beeceptor.com/posts/${params?.id}`);
  const post = await res.json();
  return { props: { post } };
};

export default function CoursePage({ post }: any) {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const [isFavorite, setIsFavorite] = useState(false);

  const getFavoritesKey = (email: string) => `favorites_${email}`;

    let loadFavorites: (email: string) => any;
    loadFavorites = (email: string) => {
        const raw = localStorage.getItem(getFavoritesKey(email));
        return raw ? JSON.parse(raw) : [];
    };

  const saveFavorites = (email: string, favorites: any[]) => {
    localStorage.setItem(getFavoritesKey(email), JSON.stringify(favorites));
  };

  useEffect(() => {
    if (!userEmail) return;
    const favorites = loadFavorites(userEmail);
    const isFav = favorites.some((fav: any) => fav.id === post.id);
    setIsFavorite(isFav);
  }, [loadFavorites,post.id, userEmail]);

  const handleToggleFavorite = () => {
    if (!userEmail) return;
    const favorites = loadFavorites(userEmail);
    const updatedFavorites = isFavorite
      ? favorites.filter((fav: any) => fav.id !== post.id)
      : [...favorites, post];

    saveFavorites(userEmail, updatedFavorites);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-6">
      <h2 className="text-3xl font-bold text-purple-800 mb-8 text-center">
        Static Site Generated Course
      </h2>
      <div className="w-full max-w-3xl bg-white p-10 rounded-3xl shadow-2xl text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">{post.title}</h1>
        <p className="text-gray-700 mb-6">{post.body}</p>
        {status === "authenticated"  && (
        <button
          onClick={handleToggleFavorite}
          className={`px-6 py-2 rounded-xl text-white font-semibold transition ${
            isFavorite ? "bg-red-600 hover:bg-red-700" : "bg-purple-700 hover:bg-purple-800"
          }`}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
             )}
        <p className="text-sm text-gray-500 mt-4 italic">Rendered at build time</p>
      </div>
    </div>
  );
}