import React from "react";
import { VscBracketError } from "react-icons/vsc";

const ServerError = ({ iconSize, textSize }) => {
  let icon =
    iconSize === null || iconSize === undefined
      ? "text-7xl"
      : `${`text-${iconSize}`}`;
  let text =
    textSize === null || textSize === undefined
      ? "text-2xl"
      : `${`text-${textSize}`}`;
  return (
    <>
      <div className="flex justify-center items-center flex-col p-2">
        <span className={`${`${icon} text-gray-400`}`}>
          <VscBracketError />
        </span>
        <span className={`${`font-bold text-gray-300 ${text}`}`}>
          Server Error
        </span>
      </div>
    </>
  );
};

export default ServerError;
