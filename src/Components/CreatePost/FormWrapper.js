import React, { forwardRef, useEffect } from "react";
import { motion } from "framer-motion";
import { withContentRect } from "react-measure";
import MediaBtnGroup from "./MediaBtnGroup";
import ContentEditable from "../../UI/EditableDiv";
const firstVariant = {
  onFront: {
    x: 0,
    opacity: 1,
    position: "unset"
  },
  onBack: {
    x: "-30%",
    position: "absolute",
    opacity: 0
  }
};

const FormWrapper = (
  {
    firstVariantAnimate,
    setDescription,
    displayName,
    description,
    animateHandler,
    measureRef,
    setHeight,
    contentRect,
    submitHandler,
    formSubmittedLoader
  },
  ref
) => {
  useEffect(() => {
    if (!firstVariantAnimate) {
      //   console.log("111");
      setHeight(contentRect.client.height);
    }
  }, [contentRect.client.height, firstVariantAnimate]);
  return (
    <motion.div
      ref={measureRef}
      variants={firstVariant}
      className="flex flex-col text-gray-700"
      animate={firstVariantAnimate ? "onBack" : "onFront"}
    >
      <h1 className="text-2xl md:text-3xl font-bold text-center">
        Create Post
      </h1>
      <div className="w-full my-2 h-1 bg-gray-300" />
      {/* BODY */}
      <form className="flex flex-col" onSubmit={submitHandler}>
        <div
          className="px-2 sm:px-4 mb-2"
          style={{
            minHeight: "200px",
            maxHeight: "320px",
            overflowY: "auto"
          }}
        >
          <div className="p-1  relative max-w-full">
            <ContentEditable
              setDescription={setDescription}
              uName={displayName}
              value={description}
              placeholder={`What's on your mind,  ${displayName
                .charAt(0)
                .toUpperCase() + displayName.slice(1)}`}
            />
          </div>
        </div>
        <MediaBtnGroup onClick={animateHandler} />
        <div className="w-full my-2 h-1 bg-gray-300" />
        {!formSubmittedLoader ? (
          <div className="px-2">
            <button
              type="submit"
              className={`${
                description.length === 0
                  ? "bg-gray-300 cursor-not-allowed "
                  : " bg-teal-light transform duration-200 hover:-translate-y-1 hover:shadow-md "
              } rounded-md text-lg font-bold p-1 w-full w-6/12 mt-2 mx-auto `}
              disabled={description.length === 0}
            >
              Post
            </button>
          </div>
        ) : (
          <span>
            <svg
              className="animate-spin mx-auto w-12"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="24px"
            >
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
          </span>
        )}
      </form>
    </motion.div>
  );
};

const ForwardWrapper = forwardRef(FormWrapper);
export default withContentRect("client")(ForwardWrapper);
