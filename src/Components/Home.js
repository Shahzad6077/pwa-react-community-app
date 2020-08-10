import React, { useState } from "react";
import { useAuth } from "../Hooks/useFirebase";
import Post from "./Post";

const Home = props => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="my-3 uppercase tracking-wider text-lg font-semibold">
        hey! {user?.displayName}
      </h1>
      <h1 className="my-3 uppercase tracking-wider text-lg font-semibold">
        Today Posts
      </h1>
      {/* Post wrapper */}
    </div>
  );
};

export default Home;
