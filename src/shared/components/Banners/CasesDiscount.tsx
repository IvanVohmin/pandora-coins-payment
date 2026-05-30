"use client";

import Image from "next/image";
import { FC } from "react";

const CaseDiscount: FC = () => {
  const handleScroll = () => {
    const shopElement = document.getElementById("shop");
    if (shopElement) {
      shopElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleScroll}
      className="relative block w-full min-h-[220px] h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] rounded-xl overflow-hidden group shadow-lg shadow-amber-500/10 border border-amber-500/20 p-0 bg-transparent cursor-pointer"
    >
      <Image
        src="/casebanner.png"
        alt="Летняя распродажа на кейсы в PandoraMC"
        fill
        priority
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1280px"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </button>
  );
};

export default CaseDiscount;