import {motion} from "framer-motion";
import Image from "next/image"
import CustomImage from "@/assets/images/image.jpg"
import Button from "@/components/shared/Button";


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
                <h1 className="text-5xl font-extrabold tracking-wide mb-4">Rreth Nesh</h1>
                <p className="text-xl max-w-3xl mx-auto leading-relaxed">
                    Ne jemi një ekip pasionant që ndërtojmë aplikacione moderne dhe të fuqishme me teknologji të
                    avancuar.
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
                    Misioni Ynë
                </h2>
                <p className="text-gray-700 mb-6 text-lg max-w-4xl mx-auto leading-relaxed">
                    Misioni ynë është të ofrojmë zgjidhje inovative dhe të qëndrueshme
                    për zhvillimin e aplikacioneve që përmbushin nevojat e klientëve
                    tanë në mënyrë të plotë.
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
                        Vizioni Ynë
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="p-8 bg-purple-900 rounded-xl shadow-lg text-white text-lg leading-relaxed">
                            <p>
                                Ne aspirojmë të bëhemi liderë në fushën e zhvillimit të aplikacioneve,
                                duke krijuar produkte të qëndrueshme dhe të adaptueshme për të gjithë përdoruesit.
                            </p>
                        </div>
                        <div>
                            <Image
                                src={CustomImage.src}
                                alt="Ekipi ynë"
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
                        Vlerat Tona
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="p-8 bg-white rounded-xl shadow-lg border-2 border-bg-purple-400 text-purple-900 font-semibold text-lg">
                            Intergriteti & Transparenca
                        </div>
                         <div className="p-8 bg-white rounded-xl shadow-lg border-2 border-bg-purple-400 text-purple-900 font-semibold text-lg">
                            Pasioni per Teknologjine
                        </div>
                         <div className="p-8 bg-white rounded-xl shadow-lg border-2 border-bg-purple-400 text-purple-900 font-semibold text-lg">
                            Kujdesi per Perdoruesin
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
                <h2 className="text-4xl font-bold mb-6"> Na Kontaktoni</h2>
                <p className="mb-1"> Email contact@mycompany.com</p>
                <p className="mb-1">TEL: +383 123 456 789</p>
                <p className="mb-6">Adresa:Prishtine, Kosove</p>
                <Button text="Na kontaktoni"
                        variant={"secondary"}
                        onClick={() => alert("Opening Contact Form...")}
                />
            </motion.section>
        </div>
    );
}


About.displayName = "about"