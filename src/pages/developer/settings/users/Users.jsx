import React from "react";
import Layout from "../../Layout";
import UsersList from "./UsersList";
import { StoreContext } from "../../../../store/StoreContext";
import { setIsAdd } from "../../../../store/StoreAction";
import { FaPlus } from "react-icons/fa";
import ModelAddUsers from "./ModalAddUsers";
import useQueryData from "../../../../functions/custom-hooks/useQueryData";
import { apiVersion } from "../../../../functions/functions-general";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";

const Users = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const {
    isLoading,
    data: dataRoles,
  } = useQueryData(
    `${apiVersion}/controllers/developers/settings/roles/roles.php`, //api path file
    "get", //method request(get,post,put,delete)
    "roles", //query key
  );

  const filterArrayActiveRoles = dataRoles?.data.filter(
    (item) => item.role_is_active == 1,
  );

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Layout menu="Settings" submenu="users">
        {/* PAGE HEADER */}
        <div className="flex items-center justify-between w-full">
          <h1>Users</h1>
          <div>
            {isLoading ? (
              <ButtonSpinner />
            ) : (
              <button
                type="button"
                className="flex items-center gap-1 hover:underline"
                onClick={handleAdd}
              >
                <FaPlus className="text-primary" />
                Add
              </button>
            )}
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div>
          <UsersList itemEdit={itemEdit} setItemEdit={setItemEdit} />
        </div>
      </Layout>

      {store.isAdd && (
        <ModelAddUsers
          itemEdit={itemEdit}
          filterArrayActiveRoles={filterArrayActiveRoles}
        />
      )}
    </>
  );
};

export default Users;
