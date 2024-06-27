"use client";

import Carroussel from "@/components/ui/carousel/Carousel";
import { CarouselImage } from "@/components/ui/carousel/CarouselImage";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
const {push} = useRouter()
let images = [ 
  { 
    key: uuidv4(), 
    content: ( 
      <CarouselImage imagen="https://i.ibb.co/0YT78Tp/sign.png" /> 
    ), 
  }, 
   
  { 
    key: uuidv4(), 
    content: ( 
      <CarouselImage imagen="https://i.ibb.co/ZhbbKSF/bgs.jpg" /> 
    ), 
  }, 
  { 
    key: uuidv4(), 
    content: <CarouselImage imagen="https://i.ibb.co/2sVzTD9/mansignperforming.jpg" />, 
  }, 
  { 
    key: uuidv4(), 
    content: <CarouselImage imagen="https://i.ibb.co/cDhpwdf/boySign.jpg" />, 
  }, 
  { 
    key: uuidv4(), 
    content: <CarouselImage imagen="https://i.ibb.co/ZhbbKSF/bgs.jpg" />, 
  }, 
  { 
    key: uuidv4(), 
    content: <CarouselImage imagen="https://i.ibb.co/Q6cMv89/boy2.jpg" />, 
  }, 
];

  return (
    <div>
      <div className="h-[500px] flex justify-center items-center flex-col">
        <Carroussel
          cards={images}
          height="500px"
          width="80%"
          margin="0 auto"
          offset={2}
          showArrows={false}
        />
      </div>
      <div className="h-[304px] w-full flex items-center flex-col space-y-8 font-bold">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="text-5xl">
            COMMUNICATE WITH DEAF AND HARD OF HEARING PEOPLE
          </p>
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="text-xl">
            Empowering Inclusivity, Our Sign Language Recognition System a Hero
            for the Deaf Community!
          </p>
        </motion.p>
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
