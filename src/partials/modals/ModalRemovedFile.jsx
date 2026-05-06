import { GetFocus } from "@/component/helpers/functions-general";
import React from "react";
import { FaQuestion } from "react-icons/fa";

const ModalRemovedFile = ({
  fileData = [],
  itemKey = null,
  itemProps = {},
  msg = "",
  setIsModalShow = () => {},
  setNewFile = () => {},
  setOtherSet = () => {},
  deleteFieldValue = "",
  propsFieldValue = "",
}) => {
  const [show, setShow] = React.useState("show");
  GetFocus("btnClose");

  const handleYes = async () => {
    const oldData = fileData?.filter((item, fileKey) => fileKey == itemKey);
    const newData = fileData?.filter((item, fileKey) => fileKey != itemKey);
    const previousData =
      deleteFieldValue !== ""
        ? itemProps.values[deleteFieldValue]
        : itemProps.values.pendingDeleteFile;
    const previousDelete = [...previousData];
    if (oldData[0]?.id) previousDelete.push(JSON.stringify(oldData));
    if (propsFieldValue !== "" && !oldData[0]?.id) {
      const jsonString = newData?.map((item) =>
        JSON.stringify({
          ...item,
          name: item.name,
          id: item?.id || "",
        })
      );
      itemProps.setFieldValue(propsFieldValue, jsonString);
    }
    itemProps.setFieldValue(
      deleteFieldValue !== "" ? deleteFieldValue : "pendingDeleteFile",
      previousDelete
    );
    setNewFile(newData);
    setOtherSet(newData);
    handleClose();
  };

  const handleClose = () => {
    setShow("");
    setTimeout(() => {
      setIsModalShow(false);
    }, 200);
  };

  return (
    <>
      <div
        className={`modal fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark z-[60] animate-fadeIn ${show}`}
      >
        <div className="p-1 w-[350px] animate-slideUp">
          <div className="bg-white p-6 pt-10 text-center rounded-lg">
            <FaQuestion className="my-2 mx-auto animate-bounce h-11 w-11 text-red-700" />
            <p className="text-sm">{msg}</p>
            <div className="flex items-center gap-4 pt-8">
              <button
                type="button"
                className="btn-modal-submit"
                onClick={() => handleYes()}
              >
                Remove
              </button>
              <button
                type="reset"
                className="btn-modal-cancel"
                onClick={handleClose}
                id="btnClose"
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

export default ModalRemovedFile;
