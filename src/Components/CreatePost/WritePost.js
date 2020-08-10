import React, { useState, useRef } from "react";
import { withContentRect } from "react-measure";
import { motion } from "framer-motion";

import CloseIconBtn from "./../../UI/CloseIcon";
import {
  useAuth,
  serverTimestamp,
  fbStorage,
  fbCloudDb
} from "../../Hooks/useFirebase";
import FormWrapper from "./FormWrapper";
import MediaWrapper from "./MediaWrapper";

const secondVariant = {
  onFront: {
    x: 0,
    opacity: 1,
    position: "unset"
  },
  onBack: {
    x: "30%",
    position: "absolute",
    opacity: 0
  }
};
const WritePost = ({ isShow, closeHandler, measureRef, ...props }) => {
  const {
    user: { displayName }
  } = useAuth();
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [firstVariantAnimate, setFirstAnimate] = useState(false);
  const [heightTo, setHeight] = useState(0);
  const [formSubmittedLoader, setFormSubmittedLoader] = useState(false);

  const animateHandler = () => {
    setFirstAnimate(p => !p);
  };
  const submitPost = async e => {
    e.preventDefault();
    setFormSubmittedLoader(true);
    const newPostRef = fbCloudDb.collection("posts").doc();
    const data = {
      uname: displayName,
      likes: [],
      images: [],
      description,
      createdAt: serverTimestamp()
    };
    if (url.length > 0) {
      // references
      const storageRef = fbStorage.ref(`1-${newPostRef.id}-1`);

      await storageRef.putString(url, "data_url");
      const cloudUrl = await storageRef.getDownloadURL();
      data.images.push(cloudUrl);
    }
    try {
      await newPostRef.set(data);
      console.log("your post is submitted");
      closeHandler();
    } catch (err) {
      console.log("Post not submited");
    } finally {
      setFormSubmittedLoader(false);
    }
  };

  return (
    <motion.div
      ref={measureRef}
      className="relative overflow-hidden "
      initial={{ height: 0 }}
      animate={{
        height: heightTo
      }}
    >
      <CloseIconBtn
        className="top-0 right-0 mr-4 rounded-full text-black"
        fillColor="#484D50"
        onClick={closeHandler}
      />
      <FormWrapper
        // ref={firstDivRef}
        firstVariantAnimate={firstVariantAnimate}
        setDescription={setDescription}
        displayName={displayName}
        description={description}
        animateHandler={animateHandler}
        setHeight={setHeight}
        submitHandler={submitPost}
        formSubmittedLoader={formSubmittedLoader}
      />
      <MediaWrapper
        // ref={secondDivRef}
        secondVariant={secondVariant}
        firstVariantAnimate={firstVariantAnimate}
        animateHandler={animateHandler}
        setUrl={setUrl}
        url={url}
        setHeight={setHeight}
      />
    </motion.div>
  );
};

export default withContentRect("")(WritePost);
