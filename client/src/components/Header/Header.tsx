import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

// hooks
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import useWindowDimensions from "../../hooks/useWindowDimensions";

// reducers
import { logoutUser } from "../../store/auth/authSlice";
import { successMessage } from "../../store/alert/alertSlice";

// icons
import { CgMenuLeft } from "react-icons/cg";
import { FiX } from "react-icons/fi";

// components
import Drawer from "../Drawer/Drawer";

const Header = () => {
  const { width } = useWindowDimensions();

  return <>{width <= 768 ? <MobileHeader /> : <DesktopHeader />}</>;
};

export default Header;

const MobileHeader = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((state) => state.auth);
  // state
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  // function
  const handleToggleDrawer = (isOpen: boolean) => {
    setIsDrawerOpen(isOpen);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    await dispatch(successMessage("Logout Successfully"));
  };
  return (
    <div className="header mobile-header">
      <div className="container-xxl h-full flex justify-between items-center">
        <div className="header-brand-contanier flex justify-center items-center">
          <div className="header-menu-icon mr-4">
            <CgMenuLeft onClick={() => handleToggleDrawer(true)} />
          </div>
          <div
            className="header-brand cursor-pointer"
            onClick={() => navigate("/")}
          >
            Brand Name
          </div>
        </div>
      </div>
      <Drawer
        open={isDrawerOpen}
        anchor={"left"}
        onHide={() => handleToggleDrawer(false)}
      >
        <div className="mobile-header-drawer">
          <div className="container-xxl mobile-header-drawer-top flex items-center">
            <div className="mobile-header-drawer-menu-icon mr-4">
              <FiX onClick={() => handleToggleDrawer(false)} />
            </div>
            <div
              className="mobile-header-drawer-brand cursor-pointer"
              onClick={() => {
                navigate("/");
                handleToggleDrawer(false);
              }}
            >
              Brand Name
            </div>
          </div>
          <div className="container-xxl mt-4">
            <div className="mobile-header-drawer-items">
              <div
                className="mobile-header-drawer-item"
                onClick={() => navigate("/")}
              >
                Home
              </div>
              {loggedIn ? (
                <>
                  <div
                    className="mobile-header-drawer-item"
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </div>
                  <div
                    className="mobile-header-drawer-item"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="mobile-header-drawer-item"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

const DesktopHeader = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((state) => state.auth);
  // state

  // function
  const handleLogout = async () => {
    await dispatch(logoutUser());
    dispatch(successMessage("Logout Successfully"));
  };
  return (
    <div className="header desktop-header">
      <div className="container-xxl h-full flex justify-between items-center">
        <div className="header-brand-contanier flex justify-between items-center">
          <div
            className="header-brand cursor-pointer"
            onClick={() => navigate("/")}
          >
            Brand Name
          </div>
        </div>
        <div className="desktop-header-drawer-items">
          <div
            className="desktop-header-drawer-item"
            onClick={() => navigate("/")}
          >
            Home
          </div>
          {loggedIn ? (
            <>
              <div
                className="desktop-header-drawer-item"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </div>
              <div
                className="desktop-header-drawer-item"
                onClick={handleLogout}
              >
                Logout
              </div>
            </>
          ) : (
            <>
              <div
                className="desktop-header-drawer-item"
                onClick={() => navigate("/login")}
              >
                Login
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
