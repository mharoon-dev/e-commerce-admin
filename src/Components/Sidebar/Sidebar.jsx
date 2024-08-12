import "./Sidebar.css";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import TimelineIcon from "@mui/icons-material/Timeline";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import ReportIcon from "@mui/icons-material/Report";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
const Sidebar = ({ open, toggleDrawer }) => {
  const dashboard = [
    {
      name: "Home",
      iconName: <LineStyleIcon className="sidebarIcon" />,
    },
    {
      name: "Analytics",
      iconName: <TimelineIcon className="sidebarIcon" />,
    },
    {
      name: "Sales",
      iconName: <TrendingUpOutlinedIcon className="sidebarIcon" />,
    },
  ];

  const quickMenu = [
    {
      name: "Users",
      iconName: <PermIdentityOutlinedIcon className="sidebarIcon" />,
    },
    {
      name: "Products",
      iconName: <StorefrontOutlinedIcon className="sidebarIcon" />,
    },
    {
      name: "Categoryies",
      iconName: <AttachMoneyOutlinedIcon className="sidebarIcon" />,
    },
  ];

  const notifications = [
    {
      name: "Mail",
      iconName: <MailOutlineOutlinedIcon className="sidebarIcon" />,
    },
    {
      name: "Feedback",
      iconName: <DynamicFeedOutlinedIcon className="sidebarIcon" />,
    },
    {
      name: "Message",
      iconName: <ChatBubbleOutlineOutlinedIcon className="sidebarIcon" />,
    },
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {dashboard.map((obj) => (
          <ListItem key={obj.name} disablePadding>
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
          <ListItem key={obj.name} disablePadding>
            <ListItemButton>
              {obj.iconName}
              <ListItemText primary={obj.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        {notifications.map((obj) => (
          <ListItem key={obj.name} disablePadding>
            <ListItemButton>
              {obj.iconName}
              <ListItemText primary={obj.name} />
            </ListItemButton>
          </ListItem>
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
                <li className="sidebarListItem active">
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
                <li className="sidebarListItem">
                  <PermIdentityOutlinedIcon className="sidebarIcon" />
                  Users
                </li>
              </Link>
              <Link
                to="/products"
                style={{ textDecoration: "none", color: "gray" }}
              >
                <li className="sidebarListItem">
                  <StorefrontOutlinedIcon className="sidebarIcon" />
                  Products
                </li>
              </Link>
              <Link
                to="/categories"
                style={{ textDecoration: "none", color: "gray" }}
              >
                <li className="sidebarListItem">
                  <StorefrontOutlinedIcon className="sidebarIcon" />
                  Categories
                </li>
              </Link>
            </ul>
          </div>

          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Notifications</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem">
                <MailOutlineOutlinedIcon className="sidebarIcon" />
                Mail
              </li>
              <li className="sidebarListItem">
                <DynamicFeedOutlinedIcon className="sidebarIcon" />
                Feedback
              </li>
              <li className="sidebarListItem">
                <ChatBubbleOutlineOutlinedIcon className="sidebarIcon" />
                Messages
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
