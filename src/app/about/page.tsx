"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; 

export default function About() {
  const { push } = useRouter();

  return (
    <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-10">
      <div className="flex flex-col md:flex-row items-center md:gap-10 lg:gap-20">
        <div className="w-full md:w-[500px] lg:w-[700px] p-4 md:p-6 space-y-4 lg:leading-loose">
          <h1 className="text-xl md:text-2xl font-semibold">About Us</h1>
          <p className="text-lg md:text-xl leading-loose lg:leading-loose">
            We are a group of developers who believe that everyone deserves to
            communicate freely. We were inspired by the challenges faced by the
            deaf community and limited access to sign language resources for
            people who want to learn sign language. That's why we developed a
            web app to recognition sign language using machine learning and to
            make learning sign language more accessible. Our system can
            translate sign language to text in real-time, learn new signs, and
            connect with the deaf community.
          </p>
        </div>
        <div className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto my-4 md:my-0">
          <Image
            src={require("../../assets/about-us.png")}
            alt="About Us"
            width={530}
            height={300}
            className="w-full h-auto" // Tailwind doesn't directly support 'auto', ensure Image component manages it
          />
        </div>
      </div>
      <div className="px-4 md:px-6">
        <h1 className="text-xl md:text-2xl font-semibold">Mission</h1>
        <p className="text-lg md:text-xl leading-loose lg:leading-loose">
          To empower seamless communication for everyone by providing
          user-friendly and accessible web-based solutions.
        </p>
      </div>
      <div className="p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-semibold">
          The Wangsel Institute for the Deaf
        </h1>
        <p className="text-lg md:text-xl leading-loose lg:leading-loose">
          The Wangsel Institute for the Deaf stands as a testament to Bhutan's
          commitment to inclusive education. Through its dedication to providing
          a nurturing environment and a well-rounded curriculum, Wangsel
          empowers deaf students to reach their full potential and contribute
          meaningfully to Bhutanese society.
        </p>
      </div>
      <p className="pt-2 px-4 md:px-6 font-semibold text-xl md:text-2xl lg:leading-loose">
        Break down communication barriers and experience a world of connection.
        Try our BSL Recognition System today:
      </p>
      <div className="flex justify-center items-center m-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg h-16 md:h-20 rounded-md mt-2 bg-primary text-white text-lg md:text-xl font-bold"
          onClick={() => push("/demo")}
        >
          Try now!
        </motion.button>
      </div>
    </div>
  );
}
