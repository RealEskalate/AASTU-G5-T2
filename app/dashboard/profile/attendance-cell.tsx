import React from "react";

const colorMap = {
  present: "bg-green-500",
  excused: "bg-yellow-400",
  absent: "bg-red-500",
};

interface AttendanceCellProps {
  status: "present" | "excused" | "absent";
  date: {
    date: string;
    month: string;
    year: string;
  };
  checkIn: string;
  checkOut: string;
  showDetail: boolean;
  index: number;
}

const AttendanceCell: React.FC<AttendanceCellProps> = ({
  status,
  date,
  checkIn,
  checkOut,
  showDetail,
  index,
}) => {
  if (!showDetail) {
    // Compact view: small colored square
    return (
      <div
        className={`w-4 h-4 ${colorMap[status]}`}
        title={`${date.date} ${date.month} ${date.year} - ${status}`}
      />
    );
  }

  // Detailed view: larger cell with date and time
  const checkInTime = checkIn ? `${checkIn}` : "5:15 PM";
  const checkOutTime = checkOut ? `${checkOut}` : "7:45 PM";
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="relative group">
      <div
        className={`${colorMap[status]} w-14 h-14 flex flex-col items-center justify-center text-xs text-black relative`}
      >
        <div className="flex justify-start items-center">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">{date.date}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-md font-semibold">{monthNames[parseInt(date.month) - 1]}</span>
            <span className="text-md font-bold">{date.year.slice(-2)}</span>
          </div>
        </div>
        <div className="mt-2 text-[10px]">
          {index % 2 === 0 ? (
            <span>{checkInTime}</span>
          ) : (
            <span>{checkOutTime}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceCell;