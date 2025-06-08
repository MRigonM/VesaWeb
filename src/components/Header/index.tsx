import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "@/assets/icons/logo.png";
import classNames from "classnames";
import { signOut, useSession } from "next-auth/react";
import Button from "@/components/shared/Button";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isAdmin = (session?.user as any)?.role === "admin";

  const items = [
    { name: "Home", pathName: "/" },
    { name: "About", pathName: "/about" },
    { name: "Contact Us", pathName: "/contact" },
    { name: "Courses", pathName: "/blogs" },
    { name: "News", pathName: "/news" },
    ...(isAdmin ? [{ name: "Dashboard", pathName: "/admin/dashboard" }] : []),
  ];

  return (
    <header className="fixed z-50 w-full bg-white border-b shadow-sm transition-all duration-300">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={Logo.src} alt="Logo" className="h-10 cursor-pointer " />
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-medium">
          {items.map((item) => (
            <Link
              key={item.pathName}
              href={item.pathName}
              className={classNames(
                "text-gray-700 hover:text-purple-700 transition relative",
                {
                  "text-purple-700 font-semibold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-purple-700":
                    router.pathname === item.pathName,
                }
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 relative">
          {status === "authenticated" ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
              >
                {session?.user?.name ?? "User"}
                <ChevronDownIcon
                  className={`h-5 w-5 transition-transform ${
                    dropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-md z-50">
                  {isAdmin && (
                  <button
                    onClick={() => router.push("/admin/dashboard")}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-b-xl transition"
                    >
                    Dashboard
                  </button>
                      )}
                  <button
                    onClick={() => signOut({ callbackUrl: "/sign-in" })}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-b-xl transition"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
              <>
                <button
                    onClick={() => router.push("/sign-up")}
                    className="px-5 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition font-semibold shadow-sm"
                >
                  Sign up
                </button>
                <button
                    onClick={() => router.push("/sign-in")}
                    className="px-5 py-2 rounded-full border border-purple-600 text-purple-600 hover:bg-purple-50 transition font-semibold shadow-sm"
                >
                  Sign in
                </button>
              </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
