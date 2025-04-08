import React from "react";
import Image from "next/image";
import home1 from "@/public/images/home1.png";
export const Quote = () => {
  return (
    <div className="bg-[#C8FACD]  m-4 pb-5 rounded-xl">
      <div className="text-center h-screen md:h-auto flex flex-col md:flex-row justify-center items-center md:text-left md:px-10">
        <div>
          <div className="mx-5 pt-8 pb-3 font-semibold text-xl text-[rgba(0,0,0,0.9)] md:font-bold md:text-2xl md:mx-0">
            Words without actions are the assassins of idealism.
          </div>
          <div className="text-[rgb(33,43,54)] font-semibold">
            — Herbert Hoover
          </div>
          <div className="text-[rgb(33,43,54)] pt-4">Welcome back,</div>
          <div className="text-[rgb(33,43,54)] pb-4">Samuel!</div>
          <button className="bg-[rgb(0,171,85)] shadow-[rgba(0,171,85,0.24)] font-semibold text-white rounded-lg px-4 py-2 hover:bg-[#007b55] hover:shadow-[rgba(0,171,85,0.24)] transition duration-200 ease-in-out">
            Problems
          </button>
        </div>
        <div className="w-full flex justify-center items-center pt-5">
          <Image src={home1} alt="home image" width={350} height={350} className="md:h-32 md:w-auto"/>
        </div>
      </div>
    </div>
  );
};
