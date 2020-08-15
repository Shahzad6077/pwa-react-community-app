import React, { useState } from "react";

import { useAuth, serverTimestamp, fbCloudDb } from "../../Hooks/useFirebase";
import ContentEditable from "./../../UI/EditableDiv";

import { ReactComponent as SubmitIcon } from "./assets/SubmitIcon.svg";
import LoadingIcon from "./assets/LoadingIcon";

const CreateComment = ({ postId }) => {
  const {
    user: { uid, displayName }
  } = useAuth();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshField, setRefreshField] = useState(1);
  const onSubmitComment = async () => {
    setLoading(true);
    try {
      await fbCloudDb.collection("comments").add({
        createdAt: serverTimestamp(),
        comment,
        postId,
        uid,
        displayName
      });
      setLoading(false);
      setRefreshField(Math.floor(Math.random() * 94999));
      setComment("");
    } catch (err) {
      setLoading(false);
      alert("There is an some issue, Try again later.");
    }
  };
  return (
    <div className="flex items-center p-2 md:p-4  -mx-2 md:-mx-4 border-gray-600 border-t-2 ">
      <div className="p-2 relative rounded-lg bg-gray-400 bg-opacity-30 w-full focus:bg-opacity-100 focus:text-black focus:outline-none">
        <ContentEditable
          refresh={refreshField}
          setDescription={setComment}
          value={comment}
          placeholder={`Write comment..`}
          placeholderStyle={{ position: "absolute", top: "6px", left: "12px" }}
        />
      </div>
      {loading ? (
        <span className=" p-2  ml-2">
          <LoadingIcon className="animate-spin w-8 h-8" />
        </span>
      ) : (
        <span
          onClick={onSubmitComment}
          className="duration-200 p-2  ml-2 rounded-full hover:bg-gray-600 hover:bg-opacity-30 cursor-pointer"
        >
          <SubmitIcon
            className="w-8 h-8"
            style={{ transform: "rotate(90deg)" }}
          />
        </span>
      )}
    </div>
  );
};

export default CreateComment;
