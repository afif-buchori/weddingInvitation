import Image from "next/image";
import logoLove from "@/app/assets/heart.png";

function Line({ className = "w-full" }) {
  return (
    <div
      className={`flex justify-center items-center gap-4 mx-auto ${className}`}
    >
      <span className="flex-1 h-1 backdrop-blur-md bg-error/50 rounded-lg" />
      <Image
        src={logoLove}
        alt="Logo Wedding"
        width={32}
        height={32}
        priority
        className="animate-pulse"
      />
      <span className="flex-1 h-1 backdrop-blur-md bg-error/50 rounded-lg" />
    </div>
  );
}

export default Line;
