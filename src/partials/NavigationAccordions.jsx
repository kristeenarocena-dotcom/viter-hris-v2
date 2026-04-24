import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavigationAccordions = ({ subNavList = [], item }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  useState(false);
  return (
    <>
      <button
        className="w-full px-4 py-1 hover:bg-gray-50/10 flex item-center justify-between gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {item.icon}
          {item.label}
        </div>
        <FaChevronDown />
      </button>

      {isOpen && (
        <ul className="self-start w-full">
          {subNavList.map((item, key) => {
            return (
              <li key={key} className="w-full">
                <Link
                  to={item.path}
                  className="block pl-10 w-full hover:bg-gray-50/10"
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default NavigationAccordions;
