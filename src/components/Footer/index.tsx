import Link from "next/link";
import Logo from "@/assets/icons/logo.png";

export function Footer() {
  return (
    <footer className="bg-gradient-to-t from-gray-100 via-white to-white border-t">
      <div className="container mx-auto py-8 flex flex-col sm:flex-row items-center justify-between gap-y-4 px-4">
        {/* Logo */}
        <Link href="/">
          <picture>
            <img className="h-10 hover:opacity-80 transition" src={Logo.src} alt="Logo" />
          </picture>
        </Link>
        {/* Copyright */}
        <p className="text-sm text-gray-500 text-center sm:text-right">
          &copy; {new Date().getFullYear()} MyCompanyName. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
