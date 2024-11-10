import bgImg from "@/app/assets/bg-wedding.webp";
import { Suspense } from "react";
import Image from "next/image";
import logoImg from "@/app/assets/logo.webp";
import CountdownTime from "./components/CountdownTime";
import { coupleData, invitationInfo } from "./weddingData";
import Visitor from "./components/Visitor";
import MenuContent from "./components/MenuContent";
import axios from "axios";

export default async function Home() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/data-wedding`
    );
    if (res.status !== 200) throw res;
    // console.log(res.data);
    const { date, start_at } = res.data.receptInfo;

    return (
      <main
        style={{
          backgroundImage: `url(${bgImg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full max-w-xl h-dvh overflow-hidden mx-auto relative"
      >
        <div className="w-full h-full overflow-y-auto bg-secondary/70 flex flex-col items-center justify-evenly pb-12 z-0">
          <div className="avatar">
            <div className="mask mask-squircle w-40">
              <Image
                src={logoImg}
                alt="Logo Wedding"
                width={160}
                height={160}
                priority
              />
            </div>
          </div>
          <h1 className="text-lg">Undangan Pernikahan</h1>
          <div className="flex text-2xl text-accent-content">
            <p>{coupleData[0].initialName}</p>
            <p className="text-7xl -ml-2">&</p>
            <p className="mt-auto">{coupleData[1].initialName}</p>
          </div>
          <CountdownTime date={date + " " + start_at} />
          <Suspense fallback={<div>Loading...</div>}>
            <Visitor />
          </Suspense>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          {/* <ContentMenu /> */}
          <MenuContent dataProps={{ ...res.data }} />
        </Suspense>
      </main>
    );
  } catch (error) {
    return (
      <div className="w-full min-h-screen grid place-content-center">
        <p className="text-xl font-bold">Internal Server Error</p>
      </div>
    );
  }
}
