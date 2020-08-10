import React, { useState, useEffect } from "react";

import HeartIcon from "./../assests/HeartIcon";
import { useAuth, fbCloudDb, fbFirestore } from "../Hooks/useFirebase";
import { motion } from "framer-motion";
const likeNumberVariants = {
  popup: {
    y: [10, 0]
  },
  popdown: {
    y: [-10, 0]
  }
};
const Post = ({
  docId,
  title,
  description,
  createdAt,
  likes,
  images = [],
  uname
}) => {
  const [isLiked, setLike] = useState(false);
  const {
    user: { uid }
  } = useAuth();
  useEffect(() => {
    setLike(!!likes.find(likedUid => likedUid === uid));
    return () => {};
  }, [likes, uid]);

  const likeHandler = () => {
    const collectionRef = fbCloudDb.collection("posts");
    if (isLiked) {
      collectionRef
        .doc(docId)
        .update({ likes: fbFirestore.FieldValue.arrayRemove(uid) });
    } else {
      collectionRef
        .doc(docId)
        .update({ likes: fbFirestore.FieldValue.arrayUnion(uid) });
    }
  };

  return (
    <div className="mx-auto p-2 md:p-4 md:w-6/12 bg-teal-lighter rounded">
      <div className="flex justify-between items-center">
        <p className="uppercase font-medium">
          Post{title} <small>by</small>
          <span className="capitalize text-gray-300"> {uname}</span>
        </p>
        <div className="flex items-center">
          <motion.p
            className="font-bold font-raleway"
            variants={likeNumberVariants}
            animate={isLiked ? "popup" : "popdown"}
          >
            {likes.length}
          </motion.p>
          <span
            onClick={likeHandler}
            className="ml-1 cursor-pointer rounded-full hover:bg-gray-600 p-1 transition duration-200"
          >
            <HeartIcon isLiked={isLiked} />
          </span>
        </div>
      </div>
      <p>{createdAt?.toDate().toDateString()}</p>
      <p className="text-white mt-2">{description}</p>
      <div
        className="mt-2 c-mx-2 cmd:-mx-4 rdounded-lg overflow-hidden "
        style={{ maxHeight: "350px" }}
      >
        {images.map((src, i) => {
          return (
            <div key={i} className="" style={{ maxHeight: "inherit" }}>
              <img
                className="block w-full max-h-full object-cover object-center"
                src={src}
                alt="asdasd"
                style={{ maxHeight: "inherit" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(Post);
