import React from "react";

const ModalSendingEmailStatus = ({
  queryCount,
  recipientList,
  totalCountItem = null,
  modalMessage = null,
}) => {
  let sucessCount = queryCount;
  let totalCount = totalCountItem ? totalCountItem : recipientList?.length;
  let percentageValue = (sucessCount / totalCount) * 100;

  // console.log(sucessCount / totalCount);

  React.useEffect(() => {
    history.pushState(null, null, location.href);
    window.onpopstate = () => {
      history.go(1);
    };
  }, []);

  React.useEffect(() => {
    window.onbeforeunload = (e) => {
      e.preventDefault();
    };
  }, []);

  return (
    <div className="bg-dark/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 bottom-0 left-0 z-99 flex justify-center items-center w-full md:inset-0 max-h-full ">
      <div className="w-full max-w-sm h-fit relative bg-white rounded-lg shadow mb-[7rem] md:mb-0">
        <div className="p-8 flex flex-col items-center gap-7">
          <span className="text-sm">
            {modalMessage ? modalMessage : `Sending, please wait...`}
          </span>
          {totalCount > 1 && (
            <span className="text-sm">
              {sucessCount} of {totalCount}
            </span>
          )}
          <div className="w-full bg-gray-200 rounded-sm dark:bg-gray-400 h-5 relative">
            <div
              className="bg-green-700 text-xs text-gray-200 font-medium h-full rounded-sm duration-500 ease-linear flex items-center justify-center absolute left-0"
              style={{ width: `${percentageValue}%` }}
            >
              {Math.floor(percentageValue)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSendingEmailStatus;
