import {motion} from "framer-motion";
import Image from "next/image"
import CustomImage from "@/assets/images/image.jpg"
import Button from "@/components/shared/Button";
import {router} from "next/client";


export default function About() {
    return (
        <div className="pt-14 flex flex-col items-center min-h-screen bg-gray-50">
            {/* Introduction Section */}
            <motion.section
                className="w-full py-24 bg-purple-700 text-white text-center shadow-lg"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
            >
                <h1 className="text-5xl font-extrabold tracking-wide mb-4">About Us</h1>
                <p className="text-xl max-w-3xl mx-auto leading-relaxed">
                    We are a passionate team that builds modern and powerful applications with advanced technology.
                </p>
            </motion.section>
            {/* Our Mission Section */}
            <motion.section
                className="max-w-5xl py-20 px-6 text-center"
                initial={{x: -100}}
                animate={{x: 0}}
                transition={{duration: 1}}
            >
                <h2 className="text-4xl font-bold mb-6 text-purple-400">
                    Our mission
                </h2>
                <p className="text-gray-700 mb-6 text-lg max-w-4xl mx-auto leading-relaxed">
                    Our mission is to provide innovative and sustainable solutions for application development that fully meet the needs of our clients.
                </p>
            </motion.section>

            {/* Vision Section */}
            <motion.section
                className="w-full py-20 bg-white text-center shadow-inner"
                initial={{y: 100}}
                animate={{y: 0}}
                transition={{duration: 1}}
            >
                <div className="container mx-auto px-6 max-w-6xl">
                    <h2 className="text-4xl font-bold mb-6 text-purple-400">
                        Our vision
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="p-8 bg-purple-900 rounded-xl shadow-lg text-white text-lg leading-relaxed">
                            <p>
                                We aspire to become leaders in the field of application development,
                                creating sustainable and adaptable products for all users.
                            </p>
                        </div>
                        <div>
                            <Image
                                src={CustomImage.src}
                                alt="Our team"
                                width={500}
                                height={300}
                                className="rounded-xl shadow-lg object-cover"
                            />
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Our Values Section */}
            <motion.section
                className="max-w-6xl py-20 px-6 text-center"
                initial={{scale: 0.8}}
                animate={{scale: 1}}
                transition={{duration: 1}}
            >
                    <h2 className="text-4xl font-bold mb-12 text-purple-400">
                        Our Values
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="p-8 bg-white rounded-xl shadow-lg border-2 border-bg-purple-400 text-purple-900 font-semibold text-lg">
                            Integrity & Transparency
                        </div>
                         <div className="p-8 bg-white rounded-xl shadow-lg border-2 border-bg-purple-400 text-purple-900 font-semibold text-lg">
                            Passion for Technology
                        </div>
                         <div className="p-8 bg-white rounded-xl shadow-lg border-2 border-bg-purple-400 text-purple-900 font-semibold text-lg">
                            Care for our Users
                        </div>
                    </div>
            </motion.section>

            {/* Contact Section */}
            <motion.section
                className="w-full py-20 bg-purple-700 text-white text-center shadow-inner"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
            >
                <h2 className="text-4xl font-bold mb-6"> Contact us</h2>
                <p className="mb-1"> Email contact@mycompany.com</p>
                <p className="mb-1">TEL: +383 123 456 789</p>
                <p className="mb-6">Adresa:Prishtine, Kosove</p>
                <Button text="Contact us"
                        variant={"secondary"}
                        onClick={() => router.push("/contact")}
                />
            </motion.section>
        </div>
    );
}


About.displayName = "about"