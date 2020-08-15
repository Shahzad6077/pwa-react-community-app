import React, { useState, useEffect } from "react";
import { fbCloudDb } from "../../Hooks/useFirebase";
import Loader from "./assets/LoadingIcon";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let unsubscribe;
    (() => {
      try {
        setLoading(true);
        unsubscribe = fbCloudDb
          .collection("comments")
          .where("postId", "==", postId)
          .orderBy("createdAt", "desc")
          .onSnapshot(snapshot => {
            const arr = snapshot.docs.map(d => {
              return {
                commentId: d.id,
                ...d.data()
              };
            });
            setComments(arr);
            setLoading(false);
          });
      } catch (err) {
        setLoading(false);
      }
    })();

    return () => unsubscribe();
  }, [postId]);

  return (
    <div className="flex flex-col space-y-2">
      {loading && <Loader className="animate-spin mx-auto w-5 h-5" />}
      {!loading &&
        comments?.map(o => {
          return (
            <div
              key={o.commentId}
              className="py-2 px-4 rounded-pill  bg-gray-600 bg-opacity-30 "
            >
              <span className="font-raleway font-bold text-white">
                {o.displayName}
              </span>
              <div dangerouslySetInnerHTML={{ __html: o.comment }} />
            </div>
          );
        })}
      {!loading && parseInt(comments?.length) === 0 && <div>No Comment</div>}
    </div>
  );
};

export default Comments;
