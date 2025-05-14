"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  LayoutGrid,
  Rows,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { div } from "framer-motion/client";

type Event = {
  id: string;
  title: string;
  date: Date;
  time?: string;
};

export default function Events() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 26)); // January 26, 2024
  const [viewMode, setViewMode] = useState<
    "grid" | "columns" | "list" | "rows"
  >("grid");

  // Sample events
  const events: Event[] = [
    {
      id: "1",
      title: "DevFest Addis 2023",
      date: new Date(2023, 11, 31), // December 31, 2023
      time: "10a",
    },
    {
      id: "2",
      title: "String Session",
      date: new Date(2024, 0, 26), // January 26, 2024
      time: "12:30p",
    },
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get the days for the current month view
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Get the day of the week for the first day (0-6, where 0 is Sunday)
    const firstDayOfWeek = firstDay.getDay();

    // Calculate days from previous month to show
    const daysFromPrevMonth = firstDayOfWeek;
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const days = [];

    // Add days from previous month
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: isSameDay(date, new Date()),
        events: getEventsForDay(date),
      });
    }

    // Add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: isSameDay(date, new Date()),
        events: getEventsForDay(date),
      });
    }

    // Calculate how many days to show from next month
    const totalDaysToShow = 42; // 6 rows of 7 days
    const daysFromNextMonth = totalDaysToShow - days.length;

    // Add days from next month
    for (let i = 1; i <= daysFromNextMonth; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: isSameDay(date, new Date()),
        events: getEventsForDay(date),
      });
    }

    return days;
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const getEventsForDay = (date: Date) => {
    return events.filter((event) => isSameDay(event.date, date));
  };

  const isCurrentDay = (date: Date) => {
    return isSameDay(date, currentDate);
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  return (
    <div className="px-10 pb-5">
        <div className="py-5 pb-10">
        <h1 className="text-2xl font-bold">Events</h1>
        <p className="text-gray-400">Calender</p>
      </div>
      <div className="w-full border rounded-lg shadow bg-white ">
        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={cn(viewMode === "grid" ? "bg-gray-100" : "")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("columns")}
              className={cn(viewMode === "columns" ? "bg-gray-100" : "")}
            >
              <Rows className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("list")}
              className={cn(viewMode === "list" ? "bg-gray-100" : "")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("rows")}
              className={cn(viewMode === "rows" ? "bg-gray-100" : "")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={goToPreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-medium">
              {formatMonthYear(currentDate)}
            </h2>
            <Button variant="ghost" size="icon" onClick={goToNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Button
            onClick={goToToday}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Today
          </Button>
        </div>

        <div className="grid grid-cols-7 border-b">
          {daysOfWeek.map((day) => (
            <div key={day} className="py-2 text-center font-medium text-sm">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 h-[calc(100vh-12rem)] min-h-[600px]">
          {getDaysInMonth().map((day, index) => (
            <div
              key={index}
              className={cn(
                "border-r border-b p-1 relative",
                !day.isCurrentMonth && "text-gray-400",
                isCurrentDay(day.date) && "bg-gray-100"
              )}
            >
              <div className="p-1 text-sm">{day.date.getDate()}</div>
              {day.events.map((event) => (
                <div
                  key={event.id}
                  className="text-xs p-1 bg-white border rounded mb-1 truncate"
                >
                  {event.time && (
                    <span className="font-medium">{event.time} </span>
                  )}
                  {event.title}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
