import React from "react";
import Layout from "../../Layout";
import DepartmentList from "./DepartmentList";
import { StoreContext } from "../../../../store/StoreContext";
import { setIsAdd } from "../../../../store/StoreAction";
import { FaPlus } from "react-icons/fa";
import ModalAddDepartment from "./ModalAddDepartment";

const Department = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Layout menu="Settings" submenu="department">
        {/* PAGE HEADER */}
        <div className="flex items-center justify-between w-full">
          <h1>Department</h1>
          <div>
            <button
              type="button"
              className="flex items-center gap-1 hover:underline"
              onClick={handleAdd}
            >
              <FaPlus className="text-primary" />
              Add
            </button>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div>
          <DepartmentList itemEdit={itemEdit} setItemEdit={setItemEdit} />
        </div>
      </Layout>

      {store.isAdd && <ModalAddDepartment itemEdit={itemEdit} />}
    </>
  );
};

export default Department;