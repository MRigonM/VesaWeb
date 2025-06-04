import {motion} from "framer-motion";
import {useState} from "react";
import Button from "@/components/shared/Button";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        setFormData({name: "", email: "", message: ""});
    };

    return (
        <div className="pt-12 bg-gray-50 min-h-screen flex flex-col items-center">
            {/* Contact Section */}
            <motion.section
                className="w-full py-20 bg-purple-700 text-white text-center shadow-inner"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
            >
                <h2 className="text-5xl font-extrabold mb-4 tracking-wide"> Na Kontaktoni</h2>
                <p className="text-xl max-w-3xl mx-auto leading-relaxed">Jemi te gatshem te ju ndihmojme! Plotesoni
                    formularin me poshte per te na kontaktuar</p>
            </motion.section>
            {/* Form Submission Section */}
            <motion.section
                className="max-w-4xl w-full py-20 px-6"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
            >
                <div className="bg-white p-8 rounded-xl shadow-md">
                    <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">
                        Formulari i Kontaktit
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 text-left">
                            <label className="block font-medium mb-1 text-[#333]">Emri juaj</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Shkruani emrin tuaj"
                            />
                        </div>
                        <div className="mb-4 text-left">
                            <label className="block font-medium mb-1 text-[#333]">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Shkruani email-in tuaj"
                            />
                        </div>
                        <div className="mb-4 text-left">
                            <label className="block font-medium mb-1 text-[#333]">Mesazhi</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Shkruani mesazhin tuaj"
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <motion.button
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                type="submit"
                                className="mt-4 px-6 py-3 bg-purple-700 text-white rounded-xl"
                            >
                                Dërgo Mesazhin
                            </motion.button>
                        </div>
                    </form>
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
                <p>Adresa:Prishtine, Kosove</p>

            </motion.section>
        </div>
    );
}
