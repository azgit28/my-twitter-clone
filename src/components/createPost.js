import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { AiOutlineGif } from "react-icons/ai";
import { BsEmojiSmile, BsListTask } from "react-icons/bs";
import { FaPlus, FaTimes } from "react-icons/fa";
import { FcGlobe } from "react-icons/fc";
import { HiOutlinePhotograph } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import { TbCalendarTime } from "react-icons/tb";
import { auth, db, storage } from "../firebase.config";
import img1 from "../img/metamask.png";

export default function CreatePost({ showCreateModal, setShowCreateModal, user }) {
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState();

  const post = async (downloadUrl) => {
    await addDoc(collection(db, "tweets"), {
      username: auth.currentUser.displayName,
      userId: auth.currentUser.uid,
      profile_pic_url: auth.currentUser.photoURL,
      mainImage: downloadUrl ?? "",
      caption,
      date: Timestamp.fromDate(new Date()),
    }).catch((err) => {
      console.log(err);
    });
  };

  const tweet = async () => {
    if (!caption) return alert("caption must not be empty");
    setLoading(true);
    if (!selectedImage) {
      await post();
      setLoading(false);
      setShowCreateModal(false);
    } else {
      const metadata = {
        contentType: "image/jpeg",
      };

      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(
        storage,
        "tweets/" + auth.currentUser.uid + "/" + selectedImage.name
      );
      const uploadTask = uploadBytesResumable(
        storageRef,
        selectedImage,
        metadata
      );

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(`uploading... ${progress.toFixed()}%`);
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              console.log(`User doesn't have permission to access the object`);
              break;
            case "storage/canceled":
              // User canceled the upload
              console.log(`User canceled the upload`);
              break;

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              console.log(
                `Unknown error occurred, inspect error.serverResponse`
              );
              break;

            default:
            // do nothing
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // console.log('File available at', downloadURL);
            await post(downloadURL);
            setCaption("");
            setSelectedImage();
            setProgress("");
            setLoading(false);
            setShowCreateModal(false);
          });
        }
      );
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col w-full">
        <div className="md:hidden flex justify-between items-center mb-2">
          <FaTimes
            color="white"
            onClick={() => setShowCreateModal(!showCreateModal)}
          />
          <h1
            className="flex justify-center items-center text-center text-white bg-teal-300 border border-transparent rounded-full w-[80px] h-[30px]"
            onClick={() => {
              !loading && tweet();
            }}
          >
            {loading ? <span className="text-xs">Tweeting...</span> : "Tweet"}
          </h1>
        </div>
        <div className="flex gap-2 mt-2">
          <img
            src={tweet?.photoURL ?? img1}
            layout="fill"
            objectFit="contain"
            className="rounded-full w-[30px] h-[30px]"
            alt=""
          />
          <select
            name=""
            placeholder="Everyone"
            id=""
            className="outline-none text-xs px-4 bg-black border border-white text-white rounded-full"
          >
            <option value="" className="">
              Everyone
            </option>
            <option value="" className="">
              Few
            </option>
            <option value="" className="">
              Some
            </option>
          </select>
        </div>
        <textarea
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Waytin dey sup?"
          className="w-6/12 resize-none outline-none bg-transparent mx-2 my-2 overflow-hidden text-white"
        ></textarea>
        {selectedImage && (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt=""
            className="h-[150px] w-fit mx-auto"
          />
        )}
        <div className="text-center">{progress}</div>
      </div>
      <div className="flex items-center mx-2 gap-2 text-teal-500 border-b border-gray-500 pb-4">
        <FcGlobe size={20} />
        <h1>Everyone can reply</h1>
      </div>

      <div className="flex justify-between py-4">
        <div className="flex gap-2 justify-center items-center  ">
          <label htmlFor="file">
            <HiOutlinePhotograph size={15} color="teal" />
          </label>
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={(e) => {
              // console.log(e.target.files);
              setSelectedImage(e.target.files[0]);
            }}
          />
          <AiOutlineGif size={15} color="teal" />
          <BsListTask size={15} color="teal" />
          <BsEmojiSmile size={15} color="teal" />
          <TbCalendarTime size={15} color="teal" />
          <SlLocationPin size={15} color="teal" />
        </div>
        <div className="flex gap-2 justify-center items-center ">
          <div className="border border-teal-400 bg-transparent rounded-full w-4 h-4 grid place-items-center"></div>
          <div className="border-r border-teal-400 w-2 h-6"></div>
          <div className="flex justify-center items-center text-center border border-teal-400 bg-transparent rounded-full text-teal-400 w-4 h-4">
            <FaPlus size={8} />
          </div>
          <h1 className="hidden md:flex justify-center items-center text-center text-white bg-teal-300 border border-transparent rounded-full w-[80px] h-[30px]">
            Tweet
          </h1>
        </div>
      </div>
    </div>
  );
}
