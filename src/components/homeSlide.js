import React, { useState } from "react";
import { AiOutlineHome, AiOutlineTwitter } from "react-icons/ai";
import { BiBell } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { CiCircleMore } from "react-icons/ci";
import { FaRegEnvelope } from "react-icons/fa";
import { FiLogIn, FiLogOut, FiMoreHorizontal } from "react-icons/fi";
import { HiOutlineUser } from "react-icons/hi";
import { auth } from "../firebase.config";
import img1 from "../img/metamask.png";
import LoginModal from "./loginModal";

export default function HomeSlide({ user }) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      {showLoginModal && (
        <LoginModal showAuth={showLoginModal} setShowAuth={setShowLoginModal} />
      )}
      <div className="h-screen flex flex-col pb-4 relative overflow-auto gap-8 border-r-2 border-gray-500">
        {/* <FaTimes color="white" onClick={() => setShowHomeSlide(!setShowHomeSlide)} /> */}
        <div className="flex gap-8 justify-center">
          <AiOutlineTwitter className="text-black md:text-white" size={80} />
        </div>
        <div className="flex flex-col mx-auto w-fit gap-6">
          <div className="flex items-center gap-3 text-base">
            <AiOutlineHome className="text-black md:text-white" size={25} />
            <h1>Home</h1>
          </div>
          <div className="flex items-center gap-3 text-base">
            <BiBell className="text-black md:text-white" size={25} />
            <h1>Notifications</h1>
          </div>
          <div className="flex items-center gap-3 text-base">
            <FaRegEnvelope className="text-black md:text-white" size={25} />
            <h1>Messages</h1>
          </div>
          <div className="flex items-center gap-3 text-base">
            <BsBookmark className="text-black md:text-white" size={25} />
            <h1>Bookmarks</h1>
          </div>
          <div className="flex items-center gap-3 text-base">
            <AiOutlineTwitter className="text-black md:text-white" size={25} />
            <h1>Twitter Blue</h1>
          </div>
          <div className="flex items-center gap-3 text-base">
            <HiOutlineUser className="text-black md:text-white" size={25} />
            <h1>Profile</h1>
          </div>
          <div className="flex items-center gap-3 text-base">
            <CiCircleMore className="text-black md:text-white" size={25} />
            <h1>Home</h1>
          </div>
          {user && (
            <div className="flex items-center gap-3 text-base">
              <div className="bg-teal-600 text-white text-center w-9/12 h-[30px] rounded-full">
                Tweet
              </div>
            </div>
          )}
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <img
                  src={img1}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-full w-[30px]"
                  alt=""
                />
                <div>
                  <h1>AZ</h1>
                  <h1>@username</h1>
                </div>
              </div>
              <FiMoreHorizontal
                className="text-black md:text-white"
                size={25}
              />
            </div>
          ) : (
            <div
              className="flex items-center gap-3 text-base"
              onClick={() => setShowLoginModal(true)}
            >
              <FiLogIn className="text-black md:text-white" size={25} />
              <h1>Login / SignUp</h1>
            </div>
          )}
        {user && <div
          className="flex items-center gap-3 text-base"
          onClick={() => auth.signOut()}
        >
          <FiLogOut className="text-red-600 rotate-180" size={25} />
          <h1>Logout</h1>
        </div>}
        </div>
      </div>
    </>
  );
}
