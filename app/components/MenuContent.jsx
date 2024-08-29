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
    hidden: { y: 20, opacity: 0 },
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
            {/* <input
              type="checkbox"
              id={"my_modal_" + item.idx}
              className="modal-toggle"
            /> */}
            {/* <div className="modal modal-bottom" role="dialog">
              <div className={`modal-box max-h-[99dvh]`}>
                <label
                  htmlFor={"my_modal_" + item.idx}
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                  ✕
                </label>
                {item.content}
              </div>
            </div> */}
          </React.Fragment>
        ))}
      </motion.div>
      <input type="checkbox" id="my_modal_kuff" className="modal-toggle" />
      <div className="modal modal-bottom z-[1] backdrop-blur-sm" role="dialog">
        <div
          className={`modal-box flex max-h-[99.8dvh] glass bg-secondary/80 p-0`}
        >
          <label
            htmlFor="my_modal_kuff"
            className="btn btn-sm btn-circle btn-accent absolute top-2 right-2 z-10"
          >
            ✕
          </label>
          {/* <h3 className="text-lg font-bold">Hello!</h3>
                <p className="py-4">This modal works with a hidden checkbox!</p> */}
          {/* {item.content} */}

          <div className="w-full flex flex-col overflow-y-auto">
            {selectedId && contents.find((i) => i.id === selectedId)?.content}
          </div>
          {/* {contents.find((i) => console.log(i))} */}
          {/* {contents.find((i) => i.id === selectedId).content} */}
          {/* <div className="modal-action">
                  <label htmlFor={"my_modal_" + item.idx} className="btn">
                    Close!
                  </label>
                </div> */}
        </div>
      </div>
    </>
  );
  // return (
  //   <>
  //     <div className="sticky bottom-4 left-0 w-full grid grid-cols-5 gap-4 p-4">
  //       {contents.map((item) => (
  //         <motion.div
  //           key={item.id}
  //           layoutId={item.id.toString()}
  //           onClick={() => setSelectedId(item.id)}
  //           className="btn btn-square m-auto"
  //         >
  //           <p>{item.ico}</p>
  //         </motion.div>
  //       ))}
  //     </div>
  //     <AnimatePresence>
  //       {selectedId && (
  //         <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
  //           <motion.div
  //             animate={{ backdropFilter: "blur(6px)" }}
  //             exit={{ backdropFilter: "blur(0px)" }}
  //             transition={{ delay: 0.01, duration: 0.5 }}
  //             onClick={() => setSelectedId(null)}
  //             className="absolute top-0 left-0 w-full h-dvh bsg-secondary/80 backdrop-blur-sms z-0"
  //           />
  //           <motion.div
  //             layoutId={selectedId.toString()}
  //             className={`w-full border rounded-lg glasss bg-primary-content/80 ${
  //               contents.find((i) => i.id === selectedId).isFull
  //                 ? "max-w-[99%] h-dvh"
  //                 : "max-w-[90%] max-h-[80%]"
  //             } mx-auto flex flex-col relative z-[1]`}
  //             initial={{ opacity: 0 }}
  //             animate={{ opacity: 1 }}
  //             exit={{ opacity: 0 }}
  //           >
  //             <button
  //               onClick={() => setSelectedId(null)}
  //               className="absolute top-0 right-0 btn btn-sm btn-circle btn-ghost z-10"
  //             >
  //               ✕
  //             </button>
  //             {contents.find((i) => i.id === selectedId).content}
  //           </motion.div>
  //         </div>
  //       )}
  //     </AnimatePresence>
  //   </>
  // );
}

function Modal({ content }) {
  const [data, setData] = useState(null);
  se;
}

export default MenuContent;
