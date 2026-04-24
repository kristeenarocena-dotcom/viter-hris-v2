import React from "react";
import Header from "../../partials/Header";
import { navList } from "./nav-function";
import Navigation from "../../partials/Navigation";
import ModalSuccess from "../../partials/modals/ModalSuccess";
import { StoreContext } from "../../store/StoreContext";

const Layout = ({ children, menu = "", submenu = "" }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  return (
    <>
      {/* HEADER */}
      <Header />

      {/* NAVIGATION */}
      <Navigation menu={menu} submenu={submenu} navigationList={navList} />

      {/* BODY */}
      <div className="wrapper">{children}</div>

      {/* FOOTER */}

      {/* MODAL */}
      {store.success && <ModalSuccess />}
    </>
  );
};

export default Layout;
