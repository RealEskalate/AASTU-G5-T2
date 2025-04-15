import React from 'react'

const Coming = () => {
  return (
    <div className="w-full bg-white flex flex-col justify-center text-center p-3 rounded-xl shadow-lg h-full">
      <div>
        <button className="bg-[#1890FF] shadow-[rgba(0,171,85,0.24)] m-2 font-semibold text-white rounded-full px-4 py-2  hover:shadow-[rgba(0,171,85,0.24)] transition duration-200 ease-in-out">
          Upcoming
        </button>
      </div>
      <div className="font-semibold text-[#212b36]">uytutr</div>
      <div className="font-bold text-xl text-[#007b58]">2d 23h 7m 12s</div>
      <div className='mb-6'>Fri Apr 11 | 05:30 - 08:00</div>
    </div>
  );
}

export default Coming