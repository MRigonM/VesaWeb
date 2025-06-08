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
    // ✅ Only show News if admin
    ...(isAdmin ? [{ name: "News", pathName: "/news" }] : []),
  ];

  return (
    <div className="py-2 fixed z-50 bg-white border-b w-full transition-all duration-300">
      <div className="container m-auto flex items-center">
        <Link href="/">
          <picture>
            <img className="h-10" src={Logo.src} alt="Logo" />
          </picture>
        </Link>
        <div className="flex-1 flex gap-10 items-center justify-center">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.pathName}
              className={classNames("text-black", {
                "underline fnt-semibold": router.pathname === item.pathName,
              })}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex gap-5 relative">
          {status === "authenticated" ? (
            <div className="relative inline-block text-left">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                {session?.user?.name ?? 'User'}
                <ChevronDownIcon className="-mr-1 size-5 text-gray-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="py-1">
                    <button
                      onClick={() => signOut({ callbackUrl: "/sign-in" })}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button text="Sign up" onClick={() => router.push("/sign-up")} />
              <Button
                text="Sign in"
                variant="secondary"
                onClick={() => router.push("/sign-in")}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
