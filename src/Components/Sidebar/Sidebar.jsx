import React, { useState } from "react";
import "./Sidebar.css";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import TimelineIcon from "@mui/icons-material/Timeline";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

const Sidebar = ({ open, toggleDrawer }) => {
  const [active, setActive] = useState("Home");

  const dashboard = [
    {
      name: "Home",
      iconName: <LineStyleIcon className="sidebarIcon" />,
    },
  ];

  const quickMenu = [
    {
      name: "Users",
      iconName: <PermIdentityOutlinedIcon className="sidebarIcon" />,
      location: "/users",
    },
    {
      name: "Products",
      iconName: <StorefrontOutlinedIcon className="sidebarIcon" />,
      location: "/products",
    },
    {
      name: "Categories",
      iconName: <AttachMoneyOutlinedIcon className="sidebarIcon" />,
      location: "/categories",
    },
    {
      name: "Orders",
      iconName: <DynamicFeedOutlinedIcon className="sidebarIcon" />,
      location: "/orders",
    },
  ];

  const CreateMenu = [
    {
      name: "Create User",
      iconName: <PermIdentityOutlinedIcon className="sidebarIcon" />,
      location: "/newUser",
    },
    {
      name: "Create Products",
      iconName: <StorefrontOutlinedIcon className="sidebarIcon" />,
      location: "/newproduct",
    },
    {
      name: "Create Categories",
      iconName: <AttachMoneyOutlinedIcon className="sidebarIcon" />,
      location: "/newcategory",
    },
  ];

  const handleItemClick = (name) => {
    setActive(name);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {dashboard.map((obj) => (
          <ListItem
            key={obj.name}
            disablePadding
            onClick={() => handleItemClick(obj.name)}
          >
            <ListItemButton>
              {obj.iconName}
              <ListItemText primary={obj.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

      <List>
        {quickMenu.map((obj) => (
          <Link
            to={obj.location}
            style={{ textDecoration: "none", color: "gray" }}
          >
            <ListItem
              key={obj.name}
              disablePadding
              onClick={() => handleItemClick(obj.name)}
            >
              <ListItemButton>
                {obj.iconName}
                <ListItemText primary={obj.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>

      <List>
        {CreateMenu.map((obj) => (
          <Link
            to={obj.location}
            style={{ textDecoration: "none", color: "gray" }}
          >
            <ListItem
              key={obj.name}
              disablePadding
              onClick={() => handleItemClick(obj.name)}
            >
              <ListItemButton>
                {obj.iconName}
                <ListItemText primary={obj.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>

      <Divider />
    </Box>
  );

  return (
    <>
      <div>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>

      <div className="sidebar">
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            <ul className="sidebarList">
              <Link to="/" style={{ textDecoration: "none", color: "gray" }}>
                <li
                  className={`sidebarListItem ${
                    active === "Home" ? "active" : ""
                  }`}
                  onClick={() => handleItemClick("Home")}
                >
                  <LineStyleIcon className="sidebarIcon" />
                  Home
                </li>
              </Link>
            </ul>
          </div>

          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Quick Menu</h3>
            <ul className="sidebarList">
              <Link
                to="/users"
                style={{ textDecoration: "none", color: "gray" }}
              >
                <li
                  className={`sidebarListItem ${
                    active === "Users" ? "active" : ""
                  }`}
                  onClick={() => handleItemClick("Users")}
                >
                  <PermIdentityOutlinedIcon className="sidebarIcon" />
                  Users
                </li>
              </Link>
              <Link
                to="/products"
                style={{ textDecoration: "none", color: "gray" }}
              >
                <li
                  className={`sidebarListItem ${
                    active === "Products" ? "active" : ""
                  }`}
                  onClick={() => handleItemClick("Products")}
                >
                  <StorefrontOutlinedIcon className="sidebarIcon" />
                  Products
                </li>
              </Link>
              <Link
                to="/categories"
                style={{ textDecoration: "none", color: "gray" }}
              >
                <li
                  className={`sidebarListItem ${
                    active === "Categories" ? "active" : ""
                  }`}
                  onClick={() => handleItemClick("Categories")}
                >
                  <StorefrontOutlinedIcon className="sidebarIcon" />
                  Categories
                </li>
              </Link>
              <Link
                to="/orders"
                style={{ textDecoration: "none", color: "gray" }}
              >
                <li
                  className={`sidebarListItem ${
                    active === "Orders" ? "active" : ""
                  }`}
                  onClick={() => handleItemClick("Orders")}
                >
                  <ShoppingCartIcon className="sidebarIcon" />
                  Orders
                </li>
              </Link>
            </ul>
          </div>

          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Create</h3>
            <ul className="sidebarList">
              <Link
                to="/newUser"
                style={{ textDecoration: "none", color: "gray" }}
              >
                <li
                  className={`sidebarListItem ${
                    active === "createUser" ? "active" : ""
                  }`}
                  onClick={() => handleItemClick("createUser")}
                >
                  <PermIdentityOutlinedIcon className="sidebarIcon" />
                  Create User
                </li>
              </Link>
              <Link
                to="/NewProduct"
                style={{ textDecoration: "none", color: "gray" }}
              >
                <li
                  className={`sidebarListItem ${
                    active === "CreateProducts" ? "active" : ""
                  }`}
                  onClick={() => handleItemClick("CreateProducts")}
                >
                  <StorefrontOutlinedIcon className="sidebarIcon" />
                  Create Products
                </li>
              </Link>
              <Link
                to="/newcategory"
                style={{ textDecoration: "none", color: "gray" }}
              >
                <li
                  className={`sidebarListItem ${
                    active === "createCategory" ? "active" : ""
                  }`}
                  onClick={() => handleItemClick("createCategory")}
                >
                  <StorefrontOutlinedIcon className="sidebarIcon" />
                  Create Categories
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
