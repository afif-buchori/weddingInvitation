import React, { useEffect, useRef, useState } from "react";
import Line from "./Line";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { ArrowUpFromLine, BookUser, User } from "lucide-react";
import { motion } from "framer-motion";
import Label from "./input/Label";
import InputGroup from "./input/InputGroup";
import InputText from "./input/InputText";
import InputError from "./input/InputError";
import Button from "./button/Button";
import dayjs from "dayjs";

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

  const [formData, setFormData] = useState({
    name: guestName ?? "",
    eop: "",
    msg: "",
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData((form) => ({ ...form, [name]: value }));
  };

  const [isError, setError] = useState({});
  const [isLoading, setLoading] = useState(false);

  const [resComment, setResComment] = useState([]);
  const fetching = async () => {
    try {
      const res = await axios.get("/api/comments");
      // console.log(res);
      if (res.status === 200) setResComment(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetching();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    let errors = {};
    if (!formData.name.trim()) errors.name = "Nama wajib diisi.";
    if (!formData.eop.trim())
      errors.eop = "Email atau nomor ponsel wajib diisi.";
    if (!formData.msg.trim()) errors.msg = "Pesan tidak boleh kosong.";
    if (Object.keys(errors).length > 0) return setError(errors);

    setLoading(true);
    const body = { ...formData, at: dayjs().format("YYYY-MM-DD HH:mm") };
    // return console.log(body);

    try {
      const response = await axios.post("/api/comments", body);
      if (response.status === 200) {
        // alert("Komentar berhasil dikirim!");
        setFormData({ name: "", eop: "", msg: "" });
        fetching();
      }
    } catch (error) {
      console.error(
        "Error creating comment:",
        error.response?.data || error.message
      );
      setError({ general: "Terjadi kesalahan, silakan coba lagi nanti." });
    } finally {
      setLoading(false);
    }
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

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Label label="Nama">
          <InputGroup error={isError?.name}>
            <User
              size={22}
              className="opacity-50 group-focus-within:opacity-100"
            />
            <InputText
              name="name"
              disabled={isLoading}
              value={formData.name}
              onChange={onChangeInput}
              placeholder="nama anda"
            />
          </InputGroup>
          <InputError message={isError?.name} />
        </Label>
        <Label label="Email / No. Ponsel">
          <InputGroup error={isError?.eop}>
            <BookUser
              size={22}
              className="opacity-50 group-focus-within:opacity-100"
            />
            <InputText
              name="eop"
              disabled={isLoading}
              value={formData.eop}
              onChange={onChangeInput}
              placeholder="alamat email / no. ponsel"
            />
          </InputGroup>
          <InputError message={isError?.eop} />
        </Label>
        <Label label="Pesan">
          <textarea
            name="msg"
            disabled={isLoading}
            value={formData.msg}
            onChange={onChangeInput}
            placeholder="pesan untuk kedua mempelai"
            className="w-full flex-1 textarea textarea-secondary focus:textarea-primary focus:!outline-none"
          />
          <InputError message={isError?.msg} />
        </Label>
        <div className="flex justify-end">
          <Button type="submit" className="min-w-52">
            Kirim
          </Button>
        </div>
      </form>

      <Line className="w-full my-10" />
      {resComment.length > 0 && (
        <>
          <p className="text-center text-primary mb-4">
            {"Do'a dan Ucapan dari para undangan"}
          </p>
          <div className="flex flex-col gap-2">
            {resComment.map((cmt, id) => (
              <div key={id} className="card bg-primary p-2">
                <div className="flex justify-between">
                  <p>{cmt.name}</p>
                  <p className="text-[10px] sm:text-xs text-secondary">
                    {cmt.at}
                  </p>
                </div>
                <p className="opacity-70 text-xs sm:text-sm">{cmt.eop}</p>
                <p className="mt-2 text-neutral">{`"${cmt.msg}"`}</p>
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
        </>
      )}
    </div>
  );
}

export default Comment;
