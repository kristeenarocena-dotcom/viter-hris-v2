import React from "react";
import { FaTimes } from "react-icons/fa";
import { setError } from "../store/StoreAction";
import { StoreContext } from "../store/StoreContext";

const MessageError = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  // const observer = new IntersectionObserver((entries) =>
  //   entries.forEach((entry) => entry.isIntersecting)
  // );
  const ref = React.useRef(null);

  const handleClose = () => {
    dispatch(setError(false));
  };

  // React.useEffect(() => {
  //   let timeError = setTimeout(() => {
  //     dispatch(setError(false));
  //     dispatch(setMessage(""));
  //   }, 10000);
  //   if (!store.error) clearTimeout(timeError);
  // }, []);

  React.useEffect(() => {
    if (ref) {
      // ref.current.scrollIntoView({ behavior: "smooth" });
      ref.current.scrollIntoView();
    }
  }, [ref]);

  // console.log(ref?.current?.scrollHeight);

  return (
    <>
      <div
        className="bg-red-200 px-4 py-3 mt-4 rounded-sm flex items-center justify-between gap-1"
        ref={ref}
      >
        <span className="text-red-500">{store.message}</span>
        <div>
          <button
            type="button"
            className="rounded-sm p-2 hover:bg-gray-100/20"
            onClick={handleClose}
          >
            <FaTimes />
          </button>
        </div>
      </div>
    </>
  );
};

export default MessageError;
