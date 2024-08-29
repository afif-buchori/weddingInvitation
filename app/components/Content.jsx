"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import MerriedCouple from "./MerriedCouple";
import {
  Images,
  Mail,
  MapPin,
  MessageSquareMore,
  UserRound,
} from "lucide-react";
import InvitationDetails from "./InvitationDetails";
import Galery from "./Galery";
import Comment from "./Comment";

function ContentMenu() {
  const contents = [
    {
      id: 1,
      ico: <UserRound />,
      content: <MerriedCouple />,
      isFull: false,
    },
    {
      id: 2,
      ico: <Mail />,
      content: <InvitationDetails />,
      isFull: false,
    },
    {
      id: 3,
      ico: <MapPin />,
      content: <MerriedCouple />,
      isFull: false,
    },
    {
      id: 4,
      ico: <Images />,
      content: <Galery />,
      isFull: true,
    },
    {
      id: 5,
      ico: <MessageSquareMore />,
      content: <Comment />,
      isFull: true,
    },
  ];
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    if (selectedId) document.querySelector("body").style = "overflow: hidden";
    else document.querySelector("body").style = "overflow: auto";
  }, [selectedId]);

  return (
    <>
      <div className="sticky bottom-4 left-0 w-full grid grid-cols-5 gap-4 p-4">
        {contents.map((item) => (
          <motion.div
            key={item.id}
            layoutId={item.id.toString()}
            onClick={() => setSelectedId(item.id)}
            className="btn btn-square m-auto"
          >
            <p>{item.ico}</p>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedId && (
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
            <motion.div
              animate={{ backdropFilter: "blur(6px)" }}
              exit={{ backdropFilter: "blur(0px)" }}
              transition={{ delay: 0.01, duration: 0.5 }}
              onClick={() => setSelectedId(null)}
              className="absolute top-0 left-0 w-full h-dvh bsg-secondary/80 backdrop-blur-sms z-0"
            />
            <motion.div
              layoutId={selectedId.toString()}
              className={`w-full border rounded-lg glasss bg-primary-content/80 ${
                contents.find((i) => i.id === selectedId).isFull
                  ? "max-w-[99%] h-dvh"
                  : "max-w-[90%] max-h-[80%]"
              } mx-auto flex flex-col relative z-[1]`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-0 right-0 btn btn-sm btn-circle btn-ghost z-10"
              >
                ✕
              </button>
              {contents.find((i) => i.id === selectedId).content}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ContentMenu;
