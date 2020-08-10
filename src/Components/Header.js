import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../Hooks/useFirebase";
import { useUI } from "../Context/useUiReducer";

const PrivateLinks = props => {
  const { signout } = useAuth();
  const { postModalToggler } = useUI();
  return (
    <div className=" flex space-x-4">
      <Link
        className="p-2 rounded-lg hover:bg-black hover:bg-opacity-10  duration-200 hover:transition-opacity ease-in-out "
        to="/"
      >
        Home
      </Link>
      <Link
        className="p-2 rounded-lg hover:bg-black hover:bg-opacity-10  duration-200 hover:transition-opacity ease-in-out "
        to="#create-post"
        onClick={postModalToggler}
      >
        Write Post
      </Link>
      <Link
        className="p-2 rounded-lg hover:bg-black hover:bg-opacity-10  duration-200 hover:transition-opacity ease-in-out "
        to="/posts"
      >
        Posts
      </Link>
      <button
        onClick={signout}
        className="p-2 rounded-lg hover:bg-black hover:bg-opacity-10  duration-200 hover:transition-opacity ease-in-out"
      >
        <svg
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="28px"
          height="28px"
        >
          <motion.path
            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            // d={pathDefinition}
            initial={{ pathLength: 0, pathOffset: 1 }}
            animate={{ pathLength: 1, pathOffset: 0 }}
            transition={{ duration: 2 }}
          ></motion.path>
        </svg>
      </button>
    </div>
  );
};
const PublicLinks = props => {
  return (
    <div className=" flex space-x-4">
      <Link
        className="p-2 rounded-lg hover:bg-black hover:bg-opacity-10  duration-200 hover:transition-opacity ease-in-out "
        to="/login"
      >
        Login
      </Link>
      <Link
        className="p-2 rounded-lg hover:bg-black hover:bg-opacity-10  duration-200 hover:transition-opacity ease-in-out "
        to="/signup"
      >
        Signup
      </Link>
    </div>
  );
};

const Header = props => {
  const { user } = useAuth();
  return (
    <header className="fixed bottom-0 w-full md:sticky md:top-0 bg-red-200 h-16 text-teal-dark">
      <nav className="h-full container mx-auto flex items-center justify-between px-2 md:px-0 uppercase font-semibold">
        {/* Logo */}
        <div className="flex flex-col  font-bold  text-center font-raleway  justify-center ">
          <p className=" leading-none tracking-widest text-2xl md:text-3xl">
            PWA
          </p>
          <p className="text-xs">Community</p>
        </div>
        {/* Links Wrapper */}
        {user ? <PrivateLinks /> : <PublicLinks />}
      </nav>
    </header>
  );
};

export default Header;
