import React from "react";
import { invitationInfo } from "../weddingData";
import dayjs from "dayjs";
import Line from "./Line";

function InvitationDetails() {
  const { contractInfo, receptInfo } = invitationInfo;
  return (
    <div className="flex flex-col gap-4 overflow-y-auto pt-4 pb-10 px-4">
      <p className="text-xl text-primary text-center">Undangan & Acara</p>
      <p className="text-justify leading-5">
        Bahagia rasanya apabila anda berkenan hadir dan memberikan doa restu
        kepada kami. Kami mengundang anda untuk hadir dalam acara resepsi
        pernikahan kami berikut ini
      </p>
      <div className="card w-full items-center bg-primary/80 p-4">
        <p className="w-full border-b border-secondary/60 text-primary-content pb-1 mb-4">
          Akad Nikah:
        </p>
        <p className="font-semibold text-xl">
          {dayjs(contractInfo.date + " " + contractInfo.startAt).format(
            "HH:mm"
          )}
          {" - "}
          {contractInfo.endAt
            ? dayjs(contractInfo.date + " " + contractInfo.endAt).format(
                "HH:mm"
              )
            : "Selesai"}
        </p>
        <p className="mb-4 opacity-80">
          {dayjs(contractInfo.date).format("dddd, DD MMMM YYYY")}
        </p>
        <p className="leading-5 text-center text-neutral">{contractInfo.loc}</p>
      </div>
      <Line />
      <div className="card w-full items-center bg-primary/80 p-4">
        <p className="w-full border-b border-secondary/60 text-primary-content pb-1 mb-4">
          Resepsi pernikahan:
        </p>
        <p className="font-semibold text-xl">
          {dayjs(contractInfo.date + " " + contractInfo.startAt).format(
            "HH:mm"
          )}
          {" - "}
          {contractInfo.endAt
            ? dayjs(contractInfo.date + " " + contractInfo.endAt).format(
                "HH:mm"
              )
            : "Selesai"}
        </p>
        <p className="mb-4 opacity-80">
          {dayjs(contractInfo.date).format("dddd, DD MMMM YYYY")}
        </p>
        <p className="leading-5 text-center text-neutral">{contractInfo.loc}</p>
      </div>
    </div>
  );
}

export default InvitationDetails;
