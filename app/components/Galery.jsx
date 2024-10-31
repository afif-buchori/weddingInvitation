import Image from "next/image";
import logoImg from "@/app/assets/logo.webp";
import Line from "./Line";
import { motion } from "framer-motion";

function Galery() {
  const defData = [
    { id: 0, info: "landscape" },
    { id: 1, info: "square" },
    { id: 2, info: "potrait" },
    { id: 3, info: "potrait" },
    { id: 4, info: "square" },
    { id: 5, info: "landscape" },
    { id: 6, info: "square" },
    { id: 7, info: "potrait" },
    { id: 8, info: "potrait" },
    { id: 9, info: "square" },
  ];

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="grid grid-cols-2 gap-1 overflow-y-auto pt-4 pb-2 px-2"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <Line className="col-span-2 w-full" />
      {defData.map((itemData, idx) => {
        let classes = "bg-primary/40 flex-1 flex rounded ";

        if (itemData.info === "landscape") {
          classes += "col-span-2 aspect-video";
        } else if (itemData.info === "square") {
          classes += "col-span-1 aspect-square";
        } else if (itemData.info === "potrait") {
          classes += "row-span-2 aspect-[9/16]";
        }

        return (
          <motion.label key={idx} className={classes} variants={item}>
            <input type="radio" name="galery" className="peer hidden" />
            <Image
              src={logoImg}
              alt="Logo Wedding"
              width={800}
              height={800}
              priority
              className="w-full h-full object-cover opacity-20 peer-checked:opacity-80 md:hover:opacity-80 transition-opacity duration-500"
            />
          </motion.label>
        );
      })}
      <Line className="col-span-2 w-full" />
    </motion.div>
  );
}

export default Galery;
