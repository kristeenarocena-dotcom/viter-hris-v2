import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FaQuestion } from "react-icons/fa";
import { queryData } from "../../functions/custom-hooks/queryData";
import { handleEscape, isEmptyItem } from "../../functions/functions-general";
import {
  setError,
  setIsArchive,
  setMessage,
  setSuccess,
} from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import MessageError from "../MessageError";
import ButtonSpinner from "../spinners/ButtonSpinner";

const ModalArchive = ({
  mysqlApiArchive,
  msg,
  successMsg,
  item,
  dataItem = [],
  queryKey,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) => queryData(mysqlApiArchive, "put", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [queryKey] });

      if (data.success) {
        dispatch(setIsArchive(false));
        dispatch(setSuccess(true));
        dispatch(setMessage(successMsg));
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
      ...dataItem,
      isActive: 0,
    });
  };

  const handleClose = () => {
    dispatch(setIsArchive(false));
  };

  handleEscape(() => handleClose());

  React.useEffect(() => {
    dispatch(setError(false));
  }, []);

  return (
    <>
      <div className="bg-dark/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 bottom-0 left-0 z-99 flex justify-center items-center w-full md:inset-0 max-h-full animate-fadeIn">
        <div className="p-1 w-[350px] animate-slideUp">
          <div className="bg-white p-6 pt-10 text-center rounded-lg">
            <FaQuestion className="my-2 mx-auto animate-bounce h-11 w-11 text-red-700" />
            <p className="text-sm">{msg}</p>
            <p className="text-sm font-bold">{isEmptyItem(item?.name, "")}</p>
            {store.error && <MessageError />}
            <div className="flex items-center gap-1 pt-8">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalArchive;
