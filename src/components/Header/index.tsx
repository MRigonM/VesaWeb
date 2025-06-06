import Link from "next/link";
import {useRouter} from "next/router";
import Logo from "@/assets/icons/logo.png";
import classNames from "classnames";
import {signOut, useSession} from "next-auth/react";
import Button from "@/components/shared/Button";

const cs = classNames;


//import cs from "classnames";  //nuk po e gjen classnames

export function Header() {
    const {data: session, status} = useSession();

    const router = useRouter();
    const items = [
        {
            name: "Home",
            pathName: "/",
        },
        {
            name: "About",
            pathName: "/about",
        },
        {
            name: "Contact Us",
            pathName: "/contact",
        },
        {
            name: "Blogs",
            pathName: "/blogs",
        },
        {
            name: "News",
            pathName: "/news",
        }

    ]

    function cs(arg0: string, arg1: { "underline fnt-semibold": boolean; }): string | undefined {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="py-2 fixed z-50 bg-white border-b w-full transition-all duration-300">
            <div className="container m-auto flex items-center">
                <Link href="/">
                    <picture>
                        <img className="h-10" src={Logo.src} alt="Logo"/>
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
                <div className="flex gap-5">
                    {status == 'authenticated' ? (
                        <Button
                            text={"Sign out"}
                            onClick={() => signOut({callbackUrl: "/sign-in"})}
                        />
                    ) : (
                        <>
                            <Button
                                text="Sign up"
                                onClick={() => router.push("/sign-up")}
                            />
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
    )
}

export default Header;