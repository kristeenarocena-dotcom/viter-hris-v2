import React from "react";
import { handleEscape } from "../../functions/functions-general";

const ModalWrapperCenter = ({
  children,
  handleClose,
  className = "",
  topNone = "top-10 ",
  title = "",
}) => {
  const ref = React.useRef();

  handleEscape(() => handleClose());

  return (
    <>
      <div className="modal__wrapper fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-[52]">
        <div
          className="backdrop w-screen h-screen relative z-[9]"
          onClick={handleClose}
          ref={ref}
        ></div>
        <div className={`modal__main fixed z-10 ${topNone}`}>
          <div
            className={`bg-white border border-gray-200 shadow-xl ${className}`}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalWrapperCenter;
