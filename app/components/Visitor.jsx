"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

function Visitor() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to");
  // console.log(guestName);

  return (
    <div className="w-3/4 card p-4 border border-accent-content/50 bg-base-100/40 backdrop-blur-md shadow-lg mt-5">
      <p className="text-sm">To:</p>
      <h3 className="text-xl text-neutral-content text-center line-clamp-3">
        {guestName || "Bpk / Ibu / Saudara"}
      </h3>
    </div>
  );
}

export default Visitor;
