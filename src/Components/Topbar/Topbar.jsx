import React from "react";
import "./Topbar.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Topbar = ({ open, toggleDrawer }) => {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">Admin</span>
          </Link>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <span className="topbarIconItem">
              <NotificationsNoneIcon />
              <span className="topIconBadge">2</span>
            </span>
            <span className="topbarIconItem">
              <LanguageIcon />
              <span className="topIconBadge">2</span>
            </span>

            <span className="topbarIconItem">
              <SettingsIcon />
            </span>
          </div>
          <MenuIcon className="menuIcon" onClick={toggleDrawer(true)} />

          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
