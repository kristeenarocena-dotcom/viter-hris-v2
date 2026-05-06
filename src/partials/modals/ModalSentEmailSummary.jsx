import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ModalSentEmailSummary = ({
  queryCount,
  recipientList,
  setIsSuccessSendingEmail,
  setQueryCount,
  queryStatus,
  messageSuccessText = null,
}) => {
  let sucessCount = queryCount;
  let totalCount = recipientList?.length;
  let message = queryStatus?.success
    ? messageSuccessText
      ? messageSuccessText
      : "Email successfully sent!"
    : queryStatus?.data.error;

  const handleClose = () => {
    setQueryCount(0);
    setIsSuccessSendingEmail(false);
  };

  return (
    <div className="bg-dark/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 bottom-0 left-0 z-99 flex justify-center items-center w-full md:inset-0 max-h-full ">
      <div className="relative p-4 w-full max-w-sm max-h-full">
        <div className="relative bg-white rounded-lg shadow mb-[7rem] md:mb-0">
          <div className="p-8 flex flex-col items-center gap-7 my-6">
            <div className="inline-flex items-center justify-center flex-shrink-0">
              {queryStatus?.success ? (
                <FaCheckCircle className="fill-[#22c55e] h-16 w-16" />
              ) : (
                <FaTimesCircle className="fill-[#dc2626] h-16 w-16" />
              )}
            </div>

            <span className="text-sm text-center">{message}</span>

            {totalCount > 1 && (
              <span className="text-sm">
                {sucessCount} of {totalCount}
              </span>
            )}
            <button
              className="inline-block rounded-md w-full px-5 py-2 bg-primary text-white"
              onClick={() => handleClose()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSentEmailSummary;
