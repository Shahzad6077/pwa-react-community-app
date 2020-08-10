import React from "react";
import Post from "./Post";
import UseFirestore from "../Hooks/useFirestore";

const Posts = () => {
  const [loading, postList] = UseFirestore("posts", "createdAt");

  return (
    <div>
      <h1 className="text-4xl text-center">Posts by Firestore.</h1>
      <div className="space-y-6">
        {loading ? (
          <p>Loading....</p>
        ) : (
          postList.map(p => {
            return <Post key={p.docId} {...p} />;
          })
        )}
      </div>
    </div>
  );
};

export default Posts;
