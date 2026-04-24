import { queryData } from "@/components/custom-hooks/queryData";
import useQueryData from "@/components/custom-hooks/useQueryData";
import {
  handleEscape,
  isEmptyItem,
} from "@/components/helpers/functions-general";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FaQuestion } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ButtonSpinner from "../spinners/ButtonSpinner";
import { StoreContext } from "../../store/StoreContext";
import {
  setError,
  setIsDelete,
  setMessage,
  setSuccess,
} from "../../store/StoreAction";

const ModalDeleteAssociated = ({
  mysqlApiAssociated,
  mysqlApiAssociatedKey,
  mysqlApiAssociatedItem = {},
  mysqlApiAssociatedMethod = "get",
  mysqlApiDelete,
  msg,
  successMsg,
  item = "",
  queryKey = "",
  pageLink = null, // direct page to if success query
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isFetching, data: result } = useQueryData(
    mysqlApiAssociated, // endpoint
    mysqlApiAssociatedMethod, // method
    mysqlApiAssociatedKey, // key
    { ...mysqlApiAssociatedItem },
    { ...mysqlApiAssociatedItem },
  );

  const mutation = useMutation({
    mutationFn: (values) => queryData(mysqlApiDelete, "delete", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      if (data.success) {
        dispatch(setSuccess(true));
        dispatch(setMessage(successMsg));
        if (pageLink) {
          setTimeout(() => {
            navigate(pageLink);
          }, 3000);
        }
        dispatch(setIsDelete(false));
      }
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  const handleYes = async () => {
    // mutate data
    mutation.mutate({
      ...item,
      item: item,
    });
  };

  const handleClose = () => {
    dispatch(setIsDelete(false));
  };

  handleEscape(() => handleClose());

  React.useEffect(() => {
    dispatch(setError(false));
  }, []);

  return (
    <>
      <div className="bg-dark/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 bottom-0 left-0 z-99 flex justify-center items-center w-full md:inset-0 max-h-full animate-fadeIn">
        <div className="p-1 w-[350px] animate-slideUp">
          <div className="bg-white p-6 pt-10 text-center rounded-lg min-h-56">
            {result?.count > 0 ? (
              <IoIosWarning className="mb-4 mx-auto h-11 w-11 text-orange-500" />
            ) : (
              <FaQuestion className="my-2 mx-auto animate-bounce h-11 w-11 text-red-700" />
            )}
            {isFetching ? (
              <>
                <h4 className="mt-2 text-sm">Please wait...</h4>
                <div className="w-full max-w-[30rem] h-8 mt-10 grid grid-cols-2 gap-4">
                  <div className="bg-gray-300 h-full w-full rounded-md relative loading-bar overflow-hidden" />
                  <div className="bg-gray-300 h-full w-full rounded-md relative loading-bar overflow-hidden" />
                </div>
              </>
            ) : result?.count > 0 ? (
              <>
                <p className="text-sm">
                  The record is already associated with other module.
                </p>
                <div className="flex items-center gap-1 pt-8">
                  <button
                    type="reset"
                    className="btn-modal-submit"
                    disabled={mutation.isPending}
                    onClick={handleClose}
                    autoFocus
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm">{msg}</p>
                {/* {store.error && <MessageErrorModal />} */}
                <p className="text-sm font-bold ">
                  {isEmptyItem(item?.name, "")}
                </p>
                <div className="flex items-center gap-4 pt-8">
                  <button
                    type="submit"
                    className="btn-modal-submit"
                    disabled={mutation.isPending}
                    onClick={handleYes}
                  >
                    {mutation.isPending ? <ButtonSpinner /> : "Confirm"}
                  </button>
                  <button
                    type="reset"
                    className="btn-modal-cancel"
                    disabled={mutation.isPending}
                    onClick={handleClose}
                    autoFocus
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalDeleteAssociated;
