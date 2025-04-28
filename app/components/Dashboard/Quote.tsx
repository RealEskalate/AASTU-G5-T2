"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import home1 from "@/public/images/home1.png";
import { fetchProfile } from "@/redux/slices/profileSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

// Define CSS for blinking cursor animation
const animationStyles = `
  @keyframes blink {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`;

export const Quote = () => {
  const dispatch: AppDispatch = useDispatch();
  const { profile, loading, error } = useSelector((state: RootState) => state.profile);

  // State for quote and typing animation
  const [quote, setQuote] = useState({ content: "", author: "" });
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch random quote from Quotable API
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://api.quotable.io/random");
        console.log("response:", response)
        if (!response.ok) throw new Error("Failed to fetch quote");
        const data = await response.json();
        setQuote({ content: data.content, author: data.author });
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        // Fallback quote
        setQuote({
          content: "Words without actions are the assassins of idealism.",
          author: "Herbert Hoover",
        });
        setIsLoading(false);
      }
    };
    fetchQuote();
  }, []);

  // Simulate typing by incrementing visible letters
  useEffect(() => {
    if (isLoading || visibleLetters >= quote.content.length) return;
    const timer = setTimeout(() => {
      setVisibleLetters((prev) => prev + 1);
    }, 50); // Adjust delay for typing speed
    return () => clearTimeout(timer);
  }, [visibleLetters, quote.content, isLoading]);

  // Fetch profile on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchProfile(token));
    }
  }, [dispatch]);

  return (
    <div className="bg-[#C8FACD] m-4 pb-5 rounded-xl">
      {/* Inject CSS keyframes */}
      <style>{animationStyles}</style>
      <div className="text-center h-screen md:h-auto flex flex-col md:flex-row justify-center items-center md:text-left md:px-10">
        <div>
          <div className="mx-5 pt-8 pb-3 font-semibold text-xl text-[rgba(0,0,0,0.9)] md:font-bold md:text-2xl md:mx-0">
            {/* Display typed portion of the quote */}
            <span>{quote.content.slice(0, visibleLetters)}</span>
            {/* Blinking cursor */}
            <span
              className="inline-block h-[1.7em] w-[3px] bg-[rgba(0,0,0,0.5)] translate-y-[5px] animate-[blink_0.7s_step-end_infinite]"
              style={{
                display: "inline-block",
                height: "1.3em",
                width: "3.5px",
                transform: "translateY(5px)",
                background: "rgba(0,0,0,0.5)",
              }}
            />
          </div>
          <div className="text-[rgb(33,43,54)] font-semibold">
            — {quote.author}
          </div>
          <div className="text-[rgb(33,43,54)] pt-4">Welcome back,</div>
          <div className="text-[rgb(33,43,54)] pb-4">{profile?.name}!</div>
          <Link href={"/dashboard/problems"} className="bg-[rgb(0,171,85)] shadow-[rgba(0,171,85,0.24)] font-semibold text-white rounded-lg px-4 py-2 hover:bg-[#007b55] hover:shadow-[rgba(0,171,85,0.24)] transition duration-200 ease-in-out">
            Problems
          </Link>
        </div>
        <div className="w-full flex justify-center items-center pt-5">
          <Image
            src={home1}
            alt="home image"
            width={350}
            height={350}
            className="md:h-32 md:w-auto"
          />
        </div>
      </div>
    </div>
  );
};