import React from "react";

const Status = ({ text = "active" }) => {
  return text === "inactive" || text === "cancelled" ? (
    <span className="inline-flex items-center gap-x-1.5 py-0.5 px-1 rounded-full text-xs font-bold text-gray-400 uppercase">
      {text}
    </span>
  ) : text === "paused" ? (
    <span className="inline-flex items-center gap-x-1.5 py-0.5 px-1 rounded-full text-xs font-bold text-gray-400 uppercase">
      {text}
    </span>
  ) : text === "on-hold" || text === "draft" ? (
    <span className="inline-flex items-center gap-x-1.5 py-0.5 px-1 rounded-full text-xs font-bold text-orange-300 uppercase">
      {text}
    </span>
  ) : text === "failed" ? (
    <span className="inline-flex items-center gap-x-1.5 py-0.5 px-1 rounded-full text-xs font-bold text-red-600 uppercase">
      {text}
    </span>
  ) : text === "ongoing" || text === "processing" ? (
    <span className="inline-flex items-center gap-x-1.5 py-0.5 px-1 rounded-full text-xs font-bold text-orange-400 uppercase">
      {text}
    </span>
  ) : (
    <span className="inline-flex items-center gap-x-1.5 py-0.5 px-1 rounded-full text-xs font-bold text-green-800 uppercase">
      {text}
    </span>
  );
};

export default Status;
