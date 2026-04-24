import React from "react";
import ModalWrapperCenter from "../../../partials/modals/ModalWrapperCenter";

const ModalViewMemo = ({ item, handleClose }) => {
  return (
    <>
      <ModalWrapperCenter
        handleClose={handleClose}
        className="w-[600px] max-h-[80vh] overflow-y-auto rounded-md"
      >
        <div className="p-8">
          {/* Memo Header Details */}
          <table className="w-full text-sm [&_tr]:border-none [&_tr]:hover:bg-transparent">
            <tbody>
              <tr>
                <td className="font-bold w-28 py-1">To:</td>
                <td>{item.memo_to}</td>
              </tr>
              <tr>
                <td className="font-bold py-1">From:</td>
                <td>{item.memo_from}</td>
              </tr>
              <tr>
                <td className="font-bold py-1">Date:</td>
                <td>{item.memo_date}</td>
              </tr>
              <tr>
                <td className="font-bold py-1">Category:</td>
                <td>{item.memo_category}</td>
              </tr>
            </tbody>
          </table>

          {/* Divider */}
          <hr className="my-5 border-gray-300" />

          {/* Memo Body */}
          <div className="text-sm whitespace-pre-wrap leading-relaxed text-justify">
            {item.memo_text}
          </div>

          {/* Footer */}
          <div className="flex justify-end mt-8">
            <button
              type="button"
              className="btn-modal-cancel !w-auto px-6"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </ModalWrapperCenter>
    </>
  );
};

export default ModalViewMemo;