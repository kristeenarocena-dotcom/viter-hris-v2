import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../../../functions/custom-hooks/queryData";
import { apiVersion } from "../../../../functions/functions-general";
import {
  setIsAdd,
  setSuccess,
  setError,
  setMessage,
} from "../../../../store/StoreAction";
import ModalWrapperSide from "../../../../partials/modals/ModalWrapperSide";
import { FaTimes } from "react-icons/fa";
import { Formik, Form } from "formik";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import {
  InputSelect,
  InputText,
} from "../../../../components/form-input/FormInputs";
import MessageError from "../../../../partials/MessageError";

const ModalAddUsers = ({ itemEdit, filterArrayActiveRoles }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developers/settings/users/users.php?id=${itemEdit.users_aid}` //update records
          : `${apiVersion}/controllers/developers/settings/users/users.php`, //create records`
        itemEdit
          ? "put" //put if update a records and post if create new record
          : "post", // and post if create new record
        values,
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });

      if (data.success) {
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfully ${itemEdit ? "updated" : "added"}`));
        dispatch(setIsAdd(false));
      }
    },
    onError: (error) => {
      if (
        error.message === "User already exist." ||
        error.message === "User already exist" ||
        error.message === "Email already used"
      ) {
        return;
      }
      dispatch(setError(true));
      dispatch(setMessage(error.message || "Something went wrong."));
    },
  });

  const initVal = {
    ...itemEdit,
    users_role_id: itemEdit ? itemEdit.users_role_id : "",
    users_first_name: itemEdit ? itemEdit.users_first_name : "",
    users_last_name: itemEdit ? itemEdit.users_last_name : "",
    users_password: itemEdit ? itemEdit.users_password : "",
    users_email: itemEdit ? itemEdit.users_email : "",
    users_first_name_old: itemEdit ? itemEdit.users_first_name : "",
    users_last_name_old: itemEdit ? itemEdit.users_last_name : "",
    users_email_old: itemEdit ? itemEdit.users_email : "",
  };
  const yupSchema = Yup.object({
    users_role_id: Yup.string().trim().required("required"),
    users_first_name: Yup.string().trim().required("required"),
    users_last_name: Yup.string().trim().required("required"),
    users_email: Yup.string()
      .trim()
      .email("Invalid email")
      .required("required"),
  });
  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  React.useEffect(() => {
    dispatch(setError(false));
  }, []);

  return (
    <>
      <ModalWrapperSide
        handleClose={handleClose}
        className="transition-all ease-in-out transform duration-200"
      >
        {/* header */}
        <div className="modal-header relative mb-4">
          <h3 className="text-dark text-sm">
            {itemEdit ? "Update" : "Add"} Users
          </h3>
          <button
            type="button"
            className="absolute top-0 right-4"
            onClick={handleClose}
          >
            <FaTimes />
          </button>
        </div>
        {/* body */}
        <div className="modal-body">
          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values, { setFieldError, setFieldTouched }) => {
              dispatch(setError(false));
              try {
                await mutation.mutateAsync(values);
              } catch (error) {
                if (
                  error.message === "User already exist." ||
                  error.message === "User already exist"
                ) {
                  setFieldTouched("users_first_name", true, false);
                  setFieldTouched("users_last_name", true, false);
                  setFieldError("users_first_name", "User already exist.");
                  setFieldError("users_last_name", "User already exist.");
                  return;
                }

                if (error.message === "Email already used") {
                  setFieldTouched("users_email", true, false);
                  setFieldError("users_email", "Email already used");
                }
              }
            }}
          >
            {(props) => {
              return (
                <Form className="h-full">
                  <div className="modal-form-container">
                    <div className="modal-container">
                      <div className="relative mb-6">
                        <InputText
                          label="First Name"
                          name="users_first_name"
                          type="text"
                          disabled={mutation.isPending}
                        />
                      </div>

                      <div className="relative mb-6">
                        <InputText
                          label="Last Name"
                          name="users_last_name"
                          type="text"
                          disabled={mutation.isPending}
                        />
                      </div>

                      <div className="relative mb-6">
                        <InputText
                          label="Email"
                          name="users_email"
                          type="text"
                          disabled={mutation.isPending}
                        />
                      </div>

                      <div className="relative mb-6">
                        <InputSelect
                          label="Role"
                          name="users_role_id"
                          type="text"
                          disabled={mutation.isPending}
                        >
                          <optgroup label="Select a role">
                            <option value="" hidden>
                              --
                            </option>
                            {filterArrayActiveRoles.map((item, key) => {
                              return (
                                <option key={key} value={item.role_aid}>
                                  {item.role_name}
                                </option>
                              );
                            })}
                          </optgroup>
                        </InputSelect>
                        {store.error && <MessageError />}
                      </div>
                    </div>
                    <div className="modal-action">
                      <button
                        type="submit"
                        disabled={mutation.isPending || !props.dirty}
                        className="btn-modal-submit"
                      >
                        {mutation.isPending ? (
                          <ButtonSpinner />
                        ) : itemEdit ? (
                          "Save"
                        ) : (
                          "Add"
                        )}
                      </button>
                      <button
                        type="reset"
                        className="btn-modal-cancel"
                        onClick={handleClose}
                        disabled={mutation.isPending}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </ModalWrapperSide>
    </>
  );
};

export default ModalAddUsers;
