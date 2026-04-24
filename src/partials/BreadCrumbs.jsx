import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setIsSearch } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import { getUserType } from "../helpers/functions-general";

const BreadCrumbs = ({ param = "" }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();
  const link = getUserType();
  let currentLink = "";

  const handleClick = () => {
    sessionStorage.removeItem("resultItem");
    sessionStorage.removeItem("payrunListReport");
    sessionStorage.removeItem("benefitsList");
    sessionStorage.removeItem("loanList");
    sessionStorage.removeItem("salaryHistoryList");
    dispatch(setIsSearch(false));
  };

  const crumbs = location.pathname
    .replace(`${link}`, "")
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, key) => {
      currentLink += `/${crumb}`;
      return (
        crumb !== "settings" &&
        crumb !== "ftw" &&
        crumb !== "ue" &&
        crumb !== "payroll" && (
          <li
            className={` text-primary after:mr-2 after:content-['>'] last:after:hidden last:text-dark last:pointer-events-none ${
              (crumb === "settings" || crumb === "payroll") &&
              "!pointer-events-none"
            } `}
            key={key}
            onClick={handleClick}
          >
            <Link
              to={
                crumb === "settings" ||
                crumb === "payroll" ||
                crumb === "ftw" ||
                crumb === "ue"
                  ? ""
                  : crumb === "employees" || crumb === "my-info"
                    ? `${link}${currentLink}`
                    : `${link}${currentLink}${param}`
              }
              className="mr-2 font-medium hover:text-primary capitalize"
            >
              {crumb
                .replaceAll("-ftw", " ")
                .replaceAll("-ue", " ")
                .replaceAll("ftw-", " ")
                .replaceAll("-", " ")
                .replaceAll("daily time record entries", "time entries")}
            </Link>
          </li>
        )
      );
    });

  return (
    <>
      <div className="mt-1 mb-1 flex items-center gap-5 breadcrumbs ml-8">
        <ul
          className="print:hidden my-2 flex items-center cursor-pointer pl-1 lg:pl-0"
          onClick={() => navigate(-1)}
          title="Back"
        >
          <FaArrowLeft className="h-5 w-5 lg:h-4 lg:w-4" />
        </ul>

        <ul className="items-center xs:flex hidden  cursor-pointer text-[10px]">
          {crumbs.length === 1 ? "" : crumbs}
        </ul>
      </div>
    </>
  );
};

export default BreadCrumbs;
