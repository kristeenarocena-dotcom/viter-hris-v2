import React from "react";

const TableLoading = ({ count = null, cols = null, className = "h-[7px]" }) => {
  const box = [];
  let i;

  let innerBox = () => {
    while (count % cols !== 0) {
      count++;
    }
    return count;
  };

  for (i = 1; i <= innerBox(); i++) {
    box.push(
      <div
        key={i}
        className={`${className} bg-gray-300 p-1.5 w-full rounded-md relative loading-bar overflow-hidden`}
      ></div>
    );
  }

  if (cols !== 0) {
    return (
      <div
        className="grid p-2 gap-2 md:gap-4"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {box}
      </div>
    );
  }
};

export default TableLoading;
