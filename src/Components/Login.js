import React, { useState, useCallback } from "react";
import { useAuth } from "./../Hooks/useFirebase";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Login = props => {
  const { signin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setError] = useState(null);

  const changeHandler = useCallback(event => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
    setError(null);
  }, []);

  const onSubmit = async event => {
    event.preventDefault();

    if (email.length > 0 && password.length > 0) {
      try {
        await signin(email, password);
      } catch (error) {
        const code = error?.code;
        if (code === "auth/user-not-found") {
          setError("Invalid Creds");
        }
      }
    }
  };
  return (
    <div className="my-6">
      <h1 className="font-contrail text-2xl md:text-4xl text-center">LOGIN</h1>
      <form
        className="flex flex-col mx-auto w-11/12 md:w-4/12"
        onSubmit={onSubmit}
        autoComplete="off"
      >
        <input
          className="font-semibold text-lg px-2 py-1 my-2 bg-transparent border-b-2 border-gray-500 focus:outline-none "
          type="email"
          name="email"
          value={email}
          onChange={changeHandler}
          required
          placeholder="email"
        />
        <input
          className="font-semibold text-lg px-2 py-1 my-2 bg-transparent border-b-2 border-gray-500 focus:outline-none "
          type="password"
          name="password"
          value={password}
          onChange={changeHandler}
          required
          placeholder="password"
        />
        <div className="h-4 mb-2a">
          <AnimatePresence>
            {errorMsg && (
              <motion.p
                className="text-red-500 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
              >
                {errorMsg}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <button
          type="submit"
          className="bg-teal-light text-black w-24 text-center rounded-full mx-auto my-3 p-2 transform duration-200 hover:-translate-y-1 "
        >
          SUBMIT
        </button>
      </form>
      <p className="text-center">
        Have no account?{" "}
        <Link className="underline" to="/signup">
          Signup
        </Link>
      </p>
    </div>
  );
};

export default Login;
