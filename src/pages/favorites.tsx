// pages/favorites.tsx
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function FavoritesPage() {
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState<any[]>([]);

  const getFavoritesKey = (email: string) => `favorites_${email}`;

  const loadFavorites = (email: string) => {
    const raw = localStorage.getItem(getFavoritesKey(email));
    return raw ? JSON.parse(raw) : [];
  };

  useEffect(() => {
    if (!session?.user?.email) return;
    const stored = loadFavorites(session.user.email);
    setFavorites(stored);
  }, [session?.user?.email]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h2 className="text-3xl font-bold text-center text-purple-800 mb-10 mt-20">My Favorite Courses</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {favorites.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No favorites yet.</p>
        ) : (
          favorites.map((course) => (
            <div key={course.id} className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-black mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{course.body}</p>
              <Link href={`/blogs/${course.type || "ssg"}/${course.id}`}>
                <span className="text-purple-600 hover:underline">View Course</span>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
