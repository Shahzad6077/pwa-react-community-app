import React from "react";
import { ReactComponent as PhotosIcon } from "./assests/photo.svg";
import { ReactComponent as TagsIcon } from "./assests/tags.svg";

const MediaBtnGroup = ({ onClick }) => {
  return (
    <div className="px-2 sm:px-4">
      <div className="flex p-2 border border-gray-700 rounded-lg justify-between items-center">
        <p className="cursor-pointer font-bold" onClick={onClick}>
          Add to your post
        </p>
        <div className="flex space-x-2">
          <span className="cursor-pointer hover:bg-gray-700 duration-200 hover:bg-opacity-10 rounded-full p-1">
            <TagsIcon width="26px" height="26px" />
          </span>
          <span className="cursor-pointer hover:bg-gray-700 duration-200 hover:bg-opacity-10 rounded-full p-1">
            <PhotosIcon width="26px" height="26px" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default MediaBtnGroup;
