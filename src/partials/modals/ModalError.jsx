import React from "react";
import { GetFocus } from "@/components/helpers/functions-general";
import { setError, setSuccess } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";

const ModalError = ({ msg = false }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  GetFocus("btnClose");

  // animate
  const [animate, setAnimate] = React.useState("-translate-y-60");

  const handleClose = () => {
    // remove animation
    setAnimate("-translate-y-60");
    //  delay removing the error toast
    setTimeout(() => {
      dispatch(setError(false));
    }, 200);
  };
  React.useEffect(() => {
    // remove animation
    setAnimate("");
    dispatch(setSuccess(false));

    // setTimeout(() => {
    //   handleClose();
    // }, 3000);
  }, []);

  return (
    <>
      <div className="bg-dark/20 h-screen w-full fixed z-99 top-0 right-0 bottom-0 left-0">
        <div
          className={`fixed z-[53] top-10 left-1/2 -translate-x-1/2 flex items-start w-full max-w-sm p-4 mb-4 text-dark bg-white rounded-lg shadow-custom transform duration-200 ease-in-out ${animate}`}
        >
          <div className="flex items-center">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-100 bg-orange-500 rounded-lg ">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
              </svg>
              <span className="sr-only">Warning icon</span>
            </div>
            <p className="ms-3 me-3 mb-0 text-sm font-normal">
              {msg === false ? store.message : msg}
            </p>
          </div>

          <button
            type="button"
            className="ms-auto -mx-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 "
            id="btnClose"
            onClick={() => handleClose()}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalError;
