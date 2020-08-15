import React, { useRef, useState, useEffect } from "react";

const ContentEditable = ({
  setDescription,
  placeholder,
  value,
  placeholderStyle,
  refresh
}) => {
  const divRef = useRef();
  const [txtClass, setTxtClass] = useState("text-3xl");
  const [showPlaceholder, setPlaceholder] = useState(true);

  useEffect(() => {
    if (value.length > 0) {
      setPlaceholder(false);
    } else {
      setPlaceholder(true);
    }
    if (value.length > 80) {
      setTxtClass("text-xl");
    } else if (value.length <= 80) {
      setTxtClass("text-3xl");
    }
  }, [value]);

  useEffect(() => {
    divRef.current.innerHTML = "";
  }, [refresh]);
  const changeHandler = e => {
    const value = divRef.current.innerHTML;
    setDescription(value);
    // const inputWidth = divRef.current.clientWidth;
    // const WrapperWidth = txtWrapper.current.clientWidth;
  };

  return (
    <>
      {showPlaceholder && (
        <span
          className="pointer-events-none text-3xl absolute top-0 left-0"
          style={placeholderStyle}
        >
          {placeholder}
        </span>
      )}
      <div
        ref={divRef}
        onInput={changeHandler}
        contentEditable
        suppressContentEditableWarning={true}
        className={`w-full max-w-full overflow-x-hidden overflow-y-auto outline-none focus:outline-none text --break-all break-words ${txtClass}`}
        role="textbox"
      ></div>
    </>
  );
};

export default ContentEditable;
