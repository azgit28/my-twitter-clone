import React from "react";
import CreatePost from "./createPost";

export default function CreatePostmodal({
  showCreateModal,
  setShowCreateModal,
  user
}) {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-50 bg-black/90">
      {/* <div className="flxed top-0 left-0 w-full h-screen bg-black/90"></div> */}
      <div className="fixed top-0 left-0 w-full">
        <CreatePost
          showCreateModal={showCreateModal}
          setShowCreateModal={setShowCreateModal}
          user={user}
        />
      </div>
    </div>
  );
}
