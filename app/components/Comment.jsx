import React, { useEffect, useRef, useState } from "react";
import Line from "./Line";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { ArrowUpFromLine } from "lucide-react";
import { motion } from "framer-motion";
import { scrollToTop } from "../helpers/global";

function Comment() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to");

  const [scrollY, setScrollY] = useState(0);
  const divRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (divRef.current) {
        setScrollY(divRef.current.scrollTop);
      }
    };
    const divElement = divRef.current;
    divElement.addEventListener("scroll", handleScroll);
    return () => {
      divElement.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [isClicked, setIsClicked] = useState(false);

  const [isLoad, setLoad] = useState(false);
  const [resComment, setResComment] = useState([]);
  const fetching = async () => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );
      //   console.log(res);
      if (res.status === 200) setResComment(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  const [present, setPresent] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    commentary: "",
  });
  useEffect(() => {
    fetching();
    setForm({ ...form, name: guestName || "" });
  }, []);

  const onChangeForm = (e) => {
    const { name, value } = e.target;
    setForm((form) => {
      return { ...form, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...form, present });
  };

  return (
    <div
      ref={divRef}
      className="flex flex-col gap-4 overflow-y-auto pt-4 pb-10 px-4 relative"
    >
      <div className="mt-2">
        <p className="text-2xl text-center text-primary">
          {"Kirim Do'a dan Ucapan"}
        </p>
        <Line />
      </div>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="input input-bordered flex items-center gap-2">
          Nama:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChangeForm}
            className="grow"
            placeholder="nama anda..."
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Email:
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={onChangeForm}
            className="grow"
            placeholder="email anda..."
          />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Your bio</span>
            {/* <span className="label-text-alt">Alt label</span> */}
          </div>
          <textarea
            name="commentary"
            value={form.commentary}
            onChange={onChangeForm}
            className="textarea textarea-bordered h-24"
            placeholder="tulis ucapan atau doa untuk kedua mempelai..."
          ></textarea>
        </label>
        <div className="form-control gap-2">
          {["akan", "tidak bisa"].map((info, i) => (
            <label key={i} className="cursor-pointer label w-fit gap-2 p-0">
              <input
                type="checkbox"
                checked={present === info}
                onChange={() => setPresent(present === info ? "" : info)}
                className="checkbox checkbox-sm checkbox-info peer"
              />
              <span className="label-text opacity-60 peer-checked:opacity-100 transition-opacity duration-500">
                Saya {info} hadir
              </span>
            </label>
          ))}
        </div>
        <button className="btn btn-sm h-10 mt-4">{`Kirim Do'a dan Ucapan`}</button>
      </form>
      <Line className="w-full my-10" />
      <p className="text-center text-primary mb-4">
        {"Do'a dan Ucapan dari para undangan"}
      </p>
      <div className="flex flex-col gap-2">
        {resComment.map((cmt, id) => (
          <div key={id} className="card bg-primary p-2">
            <p>{cmt.name}</p>
            <p>{cmt.email}</p>
            <p>{cmt.body}</p>
          </div>
        ))}
        {scrollY > 400 && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: isClicked ? 0.8 : 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            onClick={() => {
              setIsClicked(true);
              setTimeout(() => {
                divRef.current.scrollTo({ top: 0, behavior: "smooth" });
                setIsClicked(false);
              }, 100);
            }}
            className="p-3 rounded-full bg-accent w-fit sticky bottom-0 left-1 shadow-lg"
          >
            <ArrowUpFromLine />
          </motion.button>
        )}
      </div>
    </div>
  );
}

export default Comment;
