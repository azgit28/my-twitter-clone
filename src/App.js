import "./App.css";
import { AiOutlineHome, AiOutlineTwitter } from "react-icons/ai";
import { BiBell } from "react-icons/bi";
import { FaFeatherAlt, FaRegEnvelope } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import img1 from "./img/metamask.png";
import { TfiMicrophone } from "react-icons/tfi";
import img3 from "./img/upload.jpg";
import CreatePost from "./components/createPost";
import CreatePostmodal from "./components/createPostmodal";
import { useEffect, useState } from "react";
import HomeSlide from "./components/homeSlide";
import HomeSlidemodal from "./components/homeSlidemodal";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase.config";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

function App() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showHomeSlide, setShowHomeSlide] = useState(true);
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log(user);
      setUser(user);
    });
  }, []);

  useEffect(() => {
    const collectionRef = collection(db, "tweets");
    const q = query(collectionRef, orderBy("date", "desc"), limit(20));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // console.log(querySnapshot);
      if (!querySnapshot.empty) {
        const list = [];
        querySnapshot.docs.forEach((doc) => {
          var r = { ...doc.data(), id: doc.id };
          r && list.push(r);
        });
        setTweets(list);
      }
      //  && setPosts(querySnapshot.docs)
    });
    return unsubscribe;
  }, []);

  return (
    <>
      {showCreateModal && (
        <CreatePostmodal
          showCreateModal={showCreateModal}
          setShowCreateModal={setShowCreateModal}
          user={user}
        />
      )}
      {showHomeSlide && (
        <HomeSlidemodal
          user={user}
          showHomeSlide={showHomeSlide}
          setShowHomeSlide={setShowHomeSlide}
        />
      )}
      <div className="h-screen md:grid md:grid-cols-[1fr_3fr] w-full bg-black text-white">
        <div className="grid grid-cols-2 p-4 border-b border-gray-500 md:hidden">
          <img
            src={user?.photoURL ?? img1}
            layout="fill"
            objectFit="contain"
            className="rounded-full w-[35px] h-[35px]"
            alt=""
            onClick={() => setShowHomeSlide(!showHomeSlide)}
          />
          <AiOutlineTwitter color="blue" size={25} />
        </div>

        <div className="hidden md:block">
          <HomeSlide user={user} setUser={setUser} />
        </div>

        <div className="h-screen overflow-auto">
          <div className="flex flex-col items-start gap-2 border-b-2 border-gray-500 px">
            <div className="hidden md:block">Home</div>
            <div className="flex justify-between gap-40 items-center px-4">
              <h1 className="hover:border-b-4 border-teal-400">For you</h1>
              <h1 className="hover:border-b-4 border-teal-400">Following</h1>
              <h1 className="hover:border-b-4 border-teal-400 hidden md:block">
                Latest news
              </h1>
            </div>
          </div>

          <div className="hidden md:block">
            <CreatePost user={user} />
          </div>

          <div
            className="md:hidden fixed bottom-10 right-4 bg-blue-500 w-7 h-7 grid place-items-center rounded-full"
            onClick={() => { user ? setShowCreateModal(!showCreateModal) : alert('You have to login first')}}
          >
            <FaFeatherAlt className="text-white text-xs" />
          </div>

          <div className="px-4 md:flex hidden justify-center items-center text-teal-400 text-center border-y border-gray-500 py-2 ">
            Show tweets
          </div>
          {/* postspace */}

          {tweets?.map((tweet) => {
            return (
              <div key={tweet?.id} className="flex gap-5 p-4">
                <img
                  src={tweet?.photoURL ?? img1}
                  alt=""
                  className="rounded-full border w-[35px] md:w-[50px] h-[35px] md:h-[50px]"
                />
                <div>
                  <div className="flex gap-1">
                    <h1 className="font-bold">{tweet?.username}</h1>
                    <h2>@{tweet?.username}</h2>
                  </div>
                  <p className="break-all resize-none outline-none bg-transparent overflow-hidden flex">
                    {tweet?.caption}
                  </p>

                  {tweet?.mainImage && (
                    <div className="border border-gray-500 rounded-lg mt-2">
                      <img
                        src={tweet?.mainImage}
                        alt=""
                        className="rounded-lg w-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* footer */}
        </div>
      </div>
      <div className="flex justify-evenly items-baseline relative z-10 bg-black md:hidden">
        <AiOutlineHome size={20} color="white" />
        <FiSearch size={20} color="white" />
        <TfiMicrophone size={20} color="white" />
        <BiBell size={20} color="white" />
        <FaRegEnvelope size={20} color="white" />
      </div>
    </>
  );
}

export default App;
