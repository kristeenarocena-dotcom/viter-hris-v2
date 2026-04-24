import React from "react";
import { FaPlus } from "react-icons/fa";
import { setIsAdd } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import useQueryData from "../../../functions/custom-hooks/useQueryData";
import { apiVersion } from "../../../functions/functions-general";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import Layout from "../Layout";
import EmployeesList from "./EmployeesList";
import ModalAddEmployees from "./ModalAddEmployees";

const Employees = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const {
    isLoading,
    data: dataDepartments,
  } = useQueryData(
    `${apiVersion}/controllers/developers/settings/department/department.php`,
    "get",
    "department",
  );

  const filterArrayActiveDepartments = dataDepartments?.data?.filter(
    (item) => item.department_is_active == 1,
  );

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Layout menu="employees">
        {/* PAGE HEADER */}
        <div className="flex items-center justify-between w-full">
          <h1>Employees</h1>
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
          <EmployeesList itemEdit={itemEdit} setItemEdit={setItemEdit} />
        </div>
      </Layout>

      {store.isAdd && (
        <ModalAddEmployees
          itemEdit={itemEdit}
          filterArrayActiveDepartments={filterArrayActiveDepartments ?? []}
        />
      )}
    </>
  );
};

export default Employees;
