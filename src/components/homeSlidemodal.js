import React from "react";
import HomeSlide from "./homeSlide";

export default function HomeSlidemodal({ user, showHomeSlide, setShowHomeSlide }) {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-50 md:hidden">
      <div
        className="fixed top-0 left-0 w-full h-screen bg-black/5"
        onClick={() => setShowHomeSlide(false)}
      ></div>
      <div className="fixed top-0 left-0 w-[70%] bg-white">
        <HomeSlide
        user={user}
          showHomeSlide={showHomeSlide}
          setShowHomeSlide={showHomeSlide}
        />
      </div>
    </div>
  );
}
