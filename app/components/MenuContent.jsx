"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
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

function MenuContent() {
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

  const itemMotion = {
    hidden: { y: -40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const [isOpen, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    if (selectedId) document.querySelector("body").style = "overflow: hidden";
    else document.querySelector("body").style = "overflow: auto";
  }, [selectedId]);

  return !isOpen ? (
    <div className="sticky bottom-4 left-0 w-full flex">
      <button
        onClick={() => setOpen(true)}
        className="w-3/4 btn btn-info rounded-full mx-auto"
      >
        Buka Surat
      </button>
    </div>
  ) : (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="sticky bottom-0 left-0 w-full grid grid-cols-5 justify-items-center gap-4 p-4"
      >
        {contents.map((item) => (
          <React.Fragment key={item.id}>
            <motion.label
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              variants={itemMotion}
              htmlFor="my_modal_kuff"
              className="btn btn-square"
            >
              {item.ico}
            </motion.label>
          </React.Fragment>
        ))}
      </motion.div>
      <input type="checkbox" id="my_modal_kuff" className="modal-toggle" />
      <div className="modal modal-bottom z-[1] backdrop-blur-sm" role="dialog">
        <div
          className={`max-w-xl mx-auto modal-box max-h-[90dvh] glass bg-secondary/80 p-0 flex flex-col ralative`}
          // className={`max-w-xl mx-auto modal-box max-h-[99.8dvh] glass bg-secondary/80 p-0 flex flex-col ralative`}
        >
          <label
            htmlFor="my_modal_kuff"
            className="btn btn-sm btn-circle btn-primary absolute top-2 right-2 z-10"
          >
            ✕
          </label>
          <div className="w-full flex flex-col overflow-y-auto">
            {selectedId && contents.find((i) => i.id === selectedId)?.content}
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuContent;
