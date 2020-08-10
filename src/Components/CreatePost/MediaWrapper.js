import React, { useState, useEffect, forwardRef } from "react";
import { motion } from "framer-motion";
import { withContentRect } from "react-measure";
import BackIconBtn from "./../../UI/BackIconBtn";
import ProgressBar from "./Progressbar";

export const MediaWrapper = (
  {
    secondVariant,
    firstVariantAnimate,
    animateHandler,
    setUrl,
    url,
    setHeight,
    measureRef,
    contentRect
  },
  ref
) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ["image/png", "image/jpeg"];

  useEffect(() => {
    if (firstVariantAnimate) {
      setHeight(contentRect.client.height);
    }
  }, [contentRect.client.height, firstVariantAnimate]);

  // console.log(contentRect, firstVariantAnimate);
  const uploadMedia = e => {
    console.log("sss");
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
    } else {
      setFile(null);
      setError("Please select an Image/video file.");
    }
  };
  return (
    <motion.div
      ref={measureRef}
      initial={secondVariant.onBack}
      variants={secondVariant}
      className="flex flex-col text-gray-700"
      animate={firstVariantAnimate ? "onFront" : "onBack"}
    >
      {!file && (
        <BackIconBtn
          className="top-0 left-0 ml-4 rounded-full "
          fillColor="#484D50"
          onClick={animateHandler}
        />
      )}
      <h1
        onClick={!file && animateHandler}
        className="inline-flex mx-auto text-2xl md:text-3xl font-bold text-center"
      >
        Back To Post
      </h1>
      <div className="w-full my-2 h-1 bg-gray-300" />
      <form className="media-form">
        <label>
          <input type="file" onChange={uploadMedia} />
          <span>+</span>
        </label>
        Upload media
      </form>
      {file && <ProgressBar file={file} setFile={setFile} setUrl={setUrl} />}
      {url && (
        <div className="w-full h-48">
          <img
            src={url}
            alt="uploaded media"
            style={{ height: "inherit" }}
            className="mx-auto"
          />
        </div>
      )}
      <div className="w-full my-2 h-1 bg-gray-300" />
      <div className="px-2">
        <button
          type="submit"
          className={`${
            !file
              ? "bg-gray-300 cursor-not-allowed "
              : " bg-teal-light transform duration-200 hover:-translate-y-1 hover:shadow-md "
          } rounded-md text-lg font-bold p-1 w-full w-6/12 mt-2 mx-auto `}
          disabled={!file}
        >
          Clear
        </button>
      </div>
    </motion.div>
  );
};

const forwardWrapper = forwardRef(MediaWrapper);
export default withContentRect("client")(forwardWrapper);
