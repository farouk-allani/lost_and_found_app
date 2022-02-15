import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../JS/actions/user";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import {
  CloseIcon,
  Icon,
  SidebarContainer,
  SidebarLink,
  SidebarMenu,
  SidebarWrapper,
} from "../../common/SidebarElements";
import "./Sidebar.css";
import { FaHome } from "react-icons/fa";

const Sidebar = ({ isOpen, handleOpen, location }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const user = useSelector((state) => state.userReducer.user);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <SidebarContainer isOpen={isOpen} onClick={handleOpen} className="sidebar">
      <Icon onClick={handleOpen}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="" onClick={handleOpen}>
            <Link to="/">
              <FaHome className="home-icon" />
            </Link>
          </SidebarLink>

          {location.pathname === "/" && (
            <>
              <SidebarLink to="posts" onClick={handleOpen}>
                View recent posts
              </SidebarLink>
              <SidebarLink to="services" onClick={handleOpen}>
                Services
              </SidebarLink>
              <SidebarLink to="signup" onClick={handleOpen}>
                Join us
              </SidebarLink>
            </>
          )}
          <Link to="/posts">
            {isAuth ? <BsFillFileEarmarkPostFill size={20} /> : "All posts"}
          </Link>
          {isAuth ? (
            <>
              <Link to="/post/add">
                <PostAddIcon style={{ fontSize: 25 }} className="side-icons" />
              </Link>

              <Link to="/myprofile">
                <AccountCircleIcon className="side-icons" />
              </Link>
              {user.role === "admin" && (
                <>
                  <Link to="/admin">
                    <AdminPanelSettingsOutlinedIcon
                      style={{ fontSize: 28 }}
                      className="side-icons"
                    />
                  </Link>
                </>
              )}
              <Link to="/signIn">
                <ExitToAppIcon className="side-icons" onClick={handleLogout} />
              </Link>
            </>
          ) : (
            <>
              <Link to="/signUp">Register</Link>
              <Link to="/signIn">Login</Link>
            </>
          )}
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
