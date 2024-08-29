"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

function CountdownTime({ date = "2024-12-25 10:00" }) {
  const [timeLeft, setTimeLeft] = useState({});
  const [isClient, setIsClient] = useState(false);

  const calculateTimeLeft = () => {
    const targetDate = dayjs(date);
    const now = dayjs();
    const diff = dayjs.duration(targetDate.diff(now));

    return {
      days: Math.floor(diff.asDays()),
      hours: diff.hours(),
      minutes: diff.minutes(),
      seconds: diff.seconds(),
    };
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    setIsClient(true);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  const timeUnits = [
    { label: "days", value: timeLeft.days },
    { label: "hours", value: timeLeft.hours },
    { label: "min", value: timeLeft.minutes },
    { label: "sec", value: timeLeft.seconds },
  ];

  if (!isClient) return null; // Return null until the component has mounted on the client

  return (
    <>
      <div className="grid grid-flow-col gap-2 text-center auto-cols-max">
        {timeUnits.map((unit, index) => (
          <div
            key={index}
            className="flex-1 aspect-square flex flex-col items-center p-2 bg-accent glass rounded-box text-neutral-content"
          >
            <span className="countdown font-sans font-semibold text-3xl">
              <span style={{ "--value": unit.value }}></span>
            </span>
            <p className="opacity-80 text-[10px]">{unit.label}</p>
          </div>
        ))}
      </div>
      <h2 className="text-accent-content">
        {dayjs(date).format(" dddd, DD MMMM YYYY ")}
      </h2>
    </>
  );
}

export default CountdownTime;
