import { motion } from "framer-motion";
import Image from "next/image";
import CustomImage from "@/assets/images/image.jpg";
import Button from "@/components/shared/Button";
import { router } from "next/client";
import { Heart, ShieldCheck, Code2 } from "lucide-react";

export default function About() {
    return (
        <div className="pt-14 flex flex-col items-center min-h-screen bg-gray-50">
            {/* Introduction Section */}
            <motion.section
                className="w-full py-24 bg-purple-700 text-white text-center shadow-lg px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <h1 className="text-5xl font-extrabold tracking-wide mb-6">About Us</h1>
                <p className="text-xl max-w-3xl mx-auto leading-relaxed">
                    We are a passionate team that builds modern and powerful applications with advanced technology.
                </p>
            </motion.section>

            {/* Our Mission Section */}
            <motion.section
                className="max-w-5xl py-20 px-6 text-center"
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ duration: 1 }}
            >
                <h2 className="text-4xl font-bold mb-6 text-purple-600">
                    Our Mission
                </h2>
                <p className="text-gray-700 mb-6 text-lg max-w-4xl mx-auto leading-relaxed">
                    Our mission is to provide innovative and sustainable solutions for application development that fully meet the needs of our clients.
                </p>
            </motion.section>

            {/* Vision Section */}
            <motion.section
                className="w-full py-20 bg-white text-center shadow-inner px-6"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-4xl font-bold mb-8 text-purple-600">
                        Our Vision
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
                                height={350}
                                className="rounded-xl shadow-lg object-cover"
                            />
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Our Values Section */}
            <motion.section
                className="w-full py-20 px-6 bg-purple-50 text-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1 }}
            >
                <h2 className="text-4xl font-bold mb-12 text-purple-600">
                    Our Values
                </h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div
                        className="p-8 bg-white rounded-xl shadow-lg border-2 border-purple-400 flex flex-col items-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ShieldCheck size={40} className="text-purple-600 mb-4" />
                        <h3 className="text-xl font-semibold text-purple-900 mb-2">Integrity & Transparency</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            We prioritize honesty, openness, and accountability in everything we do.
                        </p>
                    </motion.div>

                    <motion.div
                        className="p-8 bg-white rounded-xl shadow-lg border-2 border-purple-400 flex flex-col items-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Code2 size={40} className="text-purple-600 mb-4" />
                        <h3 className="text-xl font-semibold text-purple-900 mb-2">Passion for Technology</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            We are driven by a deep love for building and innovating with technology.
                        </p>
                    </motion.div>

                    <motion.div
                        className="p-8 bg-white rounded-xl shadow-lg border-2 border-purple-400 flex flex-col items-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Heart size={40} className="text-purple-600 mb-4" />
                        <h3 className="text-xl font-semibold text-purple-900 mb-2">Care for our Users</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Our users' needs always come first. We listen, adapt, and evolve to serve them better.
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Contact Section */}
            <motion.section
                className="w-full py-20 bg-purple-700 text-white text-center px-6 shadow-inner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
                <p className="mb-2 text-lg">Email: contact@mycompany.com</p>
                <p className="mb-2 text-lg">TEL: +383 123 456 789</p>
                <p className="mb-8 text-lg">Address: Prishtine, Kosove</p>
                <Button
                    text="Contact us"
                    variant={"secondary"}
                    onClick={() => router.push("/contact")}
                />
            </motion.section>
        </div>
    );
}

About.displayName = "about";
