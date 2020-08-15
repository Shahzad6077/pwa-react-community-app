import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ isOpen, children, closeHandler }) => {
  const dropletCloseHandler = e => {
    closeHandler();
    e.stopPropagation();
  };
  return (
    <AnimatePresence>
      {/* DROPLET */}
      {isOpen && (
        <motion.div
          className="h-full w-full z-10 fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          onClick={dropletCloseHandler}
        >
          <span
            className="hidden md:inline  absolute top-0 right-0 p-1 z-20 rounded-md hover:bg-gray-600"
            style={{ top: "10%", right: "10%" }}
            onClick={dropletCloseHandler}
          >
            <svg
              fill="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="2.5rem"
              color="#fff"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </span>
          <div
            className="z-30  bg-white w-11/12 sm:w-2/3  rounded-lg py-4 "
            onClick={e => e.stopPropagation()}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
