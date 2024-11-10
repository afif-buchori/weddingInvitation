import dayjs from "dayjs";
import "dayjs/locale/id";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import Line from "./Line";
import { coupleData, invitationInfo } from "../weddingData";
import logoImg from "@/app/assets/logo.webp";

function MerriedCouple({ dataMale, dataFemale, dataContract }) {
  dayjs.locale("id");
  const background = "";
  const cardVariants = {
    offscreen: {
      y: 300,
      opacity: 0,
    },
    onscreen: {
      y: 50,
      opacity: 1,
      rotate: 10,
      transition: {
        type: "spring",
        delay: 0.2,
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <div className="flex flex-col overflow-y-auto pt-4 pb-10">
      <div className="p-4 flex flex-col gap-4">
        <p className="text-2xl text-center text-primary drop-shadow-lg">
          {"Assalamu'alaikum Warahmatullah"}
        </p>
        <p className="text-sm text-center drop-shadow-md leading-4 text-primary-content">
          Dengan Rahmat Allah yang Maha Kuasa InsyaAllah kami akan melangsungkan
          pernikahan pada:
        </p>
        <div className="w-4/5 mx-auto card gap-2 p-4 border bg-base-100/20">
          <p className="text-center border-b pb-1">
            {dayjs(dataContract.date).format("dddd, DD MMMM YYYY")}
          </p>
          <p className="leading-5 text-center">di {dataContract.location}</p>
        </div>
      </div>
      {/* {coupleData.map((item, idx) => ( */}
      {[dataMale, dataFemale].map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && (
            <Line className="mt-10 w-4/5" />
            // <div className="w-4/5 flex justify-center items-center gap-4 mt-10 mx-auto">
            //   <span className="flex-1 h-1 backdrop-blur-md bg-error/50 rounded-lg" />
            //   <Image
            //     src={logoLove}
            //     alt="Logo Wedding"
            //     width={32}
            //     height={32}
            //     priority
            //     className="rounded-lg"
            //   />
            //   <span className="flex-1 h-1 backdrop-blur-md bg-error/50 rounded-lg" />
            // </div>
          )}
          <motion.div
            //   key={idx}
            className="card-container flex flex-col items-center min-w-80"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
          >
            <div className="splash" style={{ background }} />
            <motion.div className="card z-0 w-fit" variants={cardVariants}>
              <Image
                src={logoImg}
                // src={item.imageUser}
                alt="Logo Wedding"
                width={160}
                height={160}
                priority
                className="rounded-lg"
              />
            </motion.div>
            <div className="w-60 card items-center z-[1] mt-10 py-2 px-4 border bg-base-100/70 shadow-lg">
              <p className="text-accent-content text-center text-2xl leading-5">
                {item.full_name}
              </p>
              <p>{item.gender} dari</p>
              <p className="text-accent-content text-center text-2xl leading-5">
                {item.parent}
              </p>
            </div>
          </motion.div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default MerriedCouple;
