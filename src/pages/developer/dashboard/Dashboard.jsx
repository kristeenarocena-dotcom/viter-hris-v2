import React from "react";
import Layout from "../Layout";
import { StoreContext } from "../../../store/StoreContext";
import { setIsAdd } from "../../../store/StoreAction";
import { FaPlus } from "react-icons/fa";

const Dashboard = () => {
  const { store, dispatch } = React.useState(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Layout menu="dashboard">
        {/* PAGE HEADER */}
        <div className="flex items-center justify-between w-full">
          <h1>Dashboard</h1>
          <div>
            <button
              type="button"
              className="flex items-center gap-1 hover:underline"
              //   onClick={handleAdd}
            >
              <FaPlus className="text-primary" />
              Add
            </button>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div>
          {/* <RolesList itemEdit={itemEdit} setItemEdit={setItemEdit} /> */}
        </div>
      </Layout>

      {/* {store.isAdd && <ModalAddRoles itemEdit={itemEdit} />} */}
    </>
  );
};

export default Dashboard;
