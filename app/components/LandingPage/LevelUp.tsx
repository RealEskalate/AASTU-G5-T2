import Image from "next/image";
import React from "react";

function LevelUp() {
  return (
    <div className="flex flex-col justify-center text-center h-full">
      <div>
        <h1 className="text-2xl sm:text-4xl font-bold leading-tight mb-6 mt-10">
          Level up your education phase a{" "}
          <span className="text-green-400 underline"> step head.</span>
        </h1>
        <p className="text-lg">
          Elevate Your Learning Journey: Discover the Next Level of Education
          with Enhanced Features
        </p>
      </div>
      <div className="grid grid-cols-2 mt-10 justify-center mx-auto ">
        <div className="grid grid-cols-1 gap-6">
          <div className="relative border-2 border-green-100 rounded-lg  pl-5 pt-5 flex flex-col w-2xl bg-white">
            <div className="flex flex-col items-start  px-5 py-3">
              <h1 className="text-lg font-bold">Wide range pool of problems</h1>
              <p className="text-sm text-start text-gray-500 pt-1">
                Wide pool of problems waiting for you. Wide pool of problems
                waiting for you.
              </p>
            </div>
            <div className="w-full flex justify-end">
              <Image
                src={"/images/wide-problems.png"}
                alt="Wide range pool of problems"
                width={800}
                height={800}
                className="rounded-lg mt-2 "
              />
            </div>
          </div>
          <div className="relative border-2 border-green-100 rounded-lg   px-5 pt-5 flex flex-col w-2xl bg-white">
            <div className="flex flex-col items-start  px-5 py-3">
              <h1 className="text-lg font-bold">Comprehensive Roadmap</h1>
              <p className="text-sm text-start text-gray-500 pt-1">
                Chart Your Course: Navigating Success Through Our Comprehensive
                Roadmap Feature.
              </p>
            </div>
            <div className="w-full flex justify-center">
              <Image
                src={"/images/comprehensive-roadmap.png"}
                alt="Wide range pool of problems"
                width={800}
                height={800}
                className=" rounded-lg mt-2 "
              />
            </div>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-6">
          <div className="relative border-2 border-green-100 rounded-lg   px-5 pt-5 flex flex-col w-lg bg-white">
            <div className="flex flex-col items-start  px-5 py-3">
              <h1 className="text-lg font-bold">Progress Tracker</h1>
              <p className="text-sm text-start text-gray-500 pt-1">
                Stay On Course: Effortlessly Monitor Your Journey with Our
                Progress Tracker Feature
              </p>
            </div>
            <div className="w-full flex justify-center">
              <Image
                src={"/images/progress-tracker.png"}
                alt="Wide range pool of problems"
                width={800}
                height={800}
                className="rounded-lg mt-2 "
              />
            </div>
          </div>
          <div>
            <div className="relative border-2 border-green-100 rounded-lg px-5 pt-5 flex flex-col w-lg bg-white mt-6">
              <div className="flex flex-col items-start  px-5 py-3">
                <h1 className="text-lg font-bold">Contest Ratings</h1>
                <p className="text-sm text-gray-500 text-start pt-1">
                  Evaluate and Excel: Harness the Power of Contest Ratings for
                  Continuous Improvement.
                </p>
              </div>
              <div className="w-full flex justify-center">
                <Image
                  src={"/images/contest-ratings.png"}
                  alt="Wide range pool of problems"
                  width={800}
                  height={800}
                  className="rounded-lg mt-2 "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LevelUp;
