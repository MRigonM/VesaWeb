import Image from "next/image";
import {motion} from "framer-motion";
import CustomImage from "@/assets/images/image.jpg"
import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import { Rocket, BarChart, ShieldCheck} from "lucide-react";


export default function Home() {
  return (
    <div className="pt-14">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {/*Hero Section */}
        <motion.section
        className="w-full py-20 bg-yellow-600 text-black text-center"
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ duration:1 }}
        >
          <h1 className="text-5xl font-bold mb-4">
            Mirë se Vini në Aplikacionin Tonë!
          </h1>
          <p className="text-xl">
            Ndërtoni aplikacione të fuqishme dhe të shpejta me Next.js
          </p>
          <Button text={"Meso me shume"}
                  variant="secondary"
                  onClick={() => alert("Redirecting...")}/>
        </motion.section>
        {/* About Section*/}
        <motion.section
        className="max-w-6xl py-20 px-6 text-center"
        initial={{ x:-100}}
        animate={{ x:0}}
        transition={{duration:1}}
        >
         <h2 className="text-4xl font-bold mb-6 text-yellow-600">
          Rreth Nesh
          </h2>
          <p className="text-gray-700 mb-6">
            Ne krijojme aplikacione te avancuara duke perdorur teknologjite me
            te fundit.Fokusi yne kryesir eshte te ofrojme produkte te optimizuara dhe SEO-fiendly.
          </p>
          <Image
          src={CustomImage.src}
          alt="Imazh Rreth Nesh"
          width={500}
          height={300}
          className="rounded-xl"
          />
        </motion.section>
        {/*Features Section */}
        <motion.section
        className="w-full py-20 bg-gray-200 text-center"
        initial={{ y:100 }}
        animate={{ y:0}}
        transition={{ duration:1 }}
        >
          <div className="contanier m-auto">
            <h2 className="text-4xl font-bold mb-6 text-yellow-600">
              Karakyeristikat Kryesore
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card icon={Rocket}
                  title="Shpejtesi dhe Perfomanc"
                  description="Aplikacion me i mire per motoret"
            />
            <Card icon={BarChart}
                  title="SEO e Avancuar"
                  description="Rankim me i mire per motoret"
            />
            <Card icon={ShieldCheck}
                  title="Siguri maksimale"
                  description="Mbrojtje e te dhenave dhe siguri"
            />
            </div>
          </div>
        </motion.section>
        {/*Service Section */}
        <motion.section
        className="max-w-6xl py-20 px-6 text-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1}}
        transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-yellow-600">
            Sherbimet tona
          </h2>
          <p className="text-gray-700 mb-6">
            Ofrojme nje game te gjere sherbimesh dduke perfshire zhvillimin
            e aplikacioneve web,optimizimin per SEO dhe integrimin
            me API te jashtem.
          </p>
          <Button text="Shikoni Sherbimet"
                  variant="secondary"
                  onClick={() => alert("Redirecting...")}
          />
        </motion.section>
        {/* Contact Section */}
        <motion.section
        className="w-full py-20 bg-yellow-600 text-black text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6">Kontaktoni me Ne</h2>
          <p>Email contact@mycompany.com</p>
          <p>TEL: +383 123 456 789</p>
          <p>Adresa:Prishtine, Kosove</p>
          <Button text="Na kontaktoni"
                  variant={"secondary"}
                  onClick={() => alert("Opening Contact Form...")}
          />
        </motion.section>
      </div>
    </div>

  );
}

Home.displayName = "My Application";
