import { FaCogs, FaNewspaper, FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { devNavUrl, urlDeveloper } from "../../functions/functions-general";

export const navList = [
  {
    label: "Dashboard",
    icon: <MdDashboard />,
    menu: "dashboard",
    path: `${devNavUrl}/${urlDeveloper}/dashboard`,
    submenu: "",
  },
  {
    label: "Employees",
    icon: <FaUser />,
    menu: "employees",
    path: `${devNavUrl}/${urlDeveloper}/employees`,
    submenu: "",
  },
  {
    label: "SETTINGS",
    icon: <FaCogs />,
    menu: "settings",
    submenu: "",
    subNavList: [
      {
        label: "Roles",
        path: `${devNavUrl}/${urlDeveloper}/settings/users/roles`,
      },
      {
        label: "users",
        path: `${devNavUrl}/${urlDeveloper}/settings/users`,
      },
      // NEW
      {
        label: "Department",
        path: `${devNavUrl}/${urlDeveloper}/settings/department`,
      },
    ],
  },
  {
    label: "Memo",
    icon: <FaNewspaper />,
    menu: "memo",
    path: `${devNavUrl}/${urlDeveloper}/memo`,
    submenu: "",
  },
];