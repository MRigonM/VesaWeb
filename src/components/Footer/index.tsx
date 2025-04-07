import Link from "next/link";
import Logo from "@/assets/icons/logo.png"




export function Footer(){
    return (
        <div className="border-t">
            <div className="container m-auto py-7 flex items-center">
                <Link href="/">
                <picture>
                    <img className="h-10" src={Logo.src} alt="Logo" />
                </picture>
                </Link>
                <div className="flex-1 flex justify-center">
                    <p className="text-grey">All right reserved - MyCompanyName.</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;