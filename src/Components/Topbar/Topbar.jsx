import React from "react";
import "./Topbar.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Topbar = ({ open, toggleDrawer }) => {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">Admin</span>
          </Link>
        </div>
        <div className="topRight">
          <MenuIcon className="menuIcon" onClick={toggleDrawer(true)} />
          <img src={user?.img} alt="" className="topAvatar" />

          <span className="">{user?.username }&nbsp;&nbsp;</span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
