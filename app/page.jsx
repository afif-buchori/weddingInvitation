import bgImg from "@/app/assets/bg-wedding.jpg";
import { Suspense } from "react";
import Image from "next/image";
import logoImg from "@/app/assets/logo.jpg";
import CountdownTime from "./components/CountdownTime";
import { coupleData, invitationInfo } from "./weddingData";
import Visitor from "./components/Visitor";
import ContentMenu from "./components/Content";
import MenuContent from "./components/MenuContent";

export default function Home() {
  const { date, startAt } = invitationInfo.receptInfo;

  return (
    <main
      style={{
        backgroundImage: `url(${bgImg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      // className="w-full min-h-screen flex flex-col mx-auto"
      className="w-full max-w-screen-sm h-dvh overflow-hidden mx-auto relative"
    >
      <div
        // className="w-full min-h-screen h-full bg-secondary/70 flex flex-col items-center gap-4"
        className="w-full h-full overflow-y-auto bg-secondary/70 flex flex-col items-center justify-evenly pb-12 z-0"
      >
        <div className="avatar">
          <div className="mask mask-squircle w-44">
            <Image
              src={logoImg}
              alt="Logo Wedding"
              width={160}
              height={160}
              priority
            />
          </div>
        </div>
        <h1 className="text-lg">Wedding Invitation</h1>
        <div className="flex text-2xl text-accent-content">
          <p>{coupleData[0].initialName}</p>
          <p className="text-8xl -ml-2">&</p>
          <p className="mt-auto">{coupleData[1].initialName}</p>
        </div>
        <CountdownTime date={date + " " + startAt} />
        <Suspense fallback={<div>Loading...</div>}>
          <Visitor />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        {/* <ContentMenu /> */}
        <MenuContent />
      </Suspense>
    </main>
  );
}
