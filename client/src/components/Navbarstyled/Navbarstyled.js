import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../JS/actions/user";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { BsFillFileEarmarkPostFill, BsSearch } from "react-icons/bs";
import  logo from '../../images/logo2.png' ;
import {
  MobileIcon,
  Nav,
  NavbarContainer,
  NavBtn,
  NavBtnLink,
  NavItem,
  NavLinks,
  NavLogo,
  NavMenu,
  NavSp1,
  NavSp2,
} from "../../common/NavbarElements";
import { FaBars, FaHome } from "react-icons/fa";
import "./Navbarstyled.css";
import { getAllposts, getPostByTitle } from "../../JS/actions/post";
import { useParams } from "react-router";

const Navbarstyled = ({ handleOpen, location }) => {
  const [showInput, setshowInput] = useState(false);
  const [inputText, setInputText] = useState("");
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const params = useParams();
  const handleLogout = () => {
    dispatch(logout());
  };

  const handleShowInput = () => {
    setshowInput(!showInput);
  };

  useEffect(() => {
    if (inputText) {
      dispatch(getPostByTitle(inputText));
    } else dispatch(getAllposts());
  }, [dispatch, inputText, params.title]);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setInputText(e.target.value);
  };

  return (
    <>
      <Nav className="navbar">
        <NavbarContainer>
         
          <NavLogo to="/">
             <img src={logo} style={{width:'55px'}} />
            <NavSp1>Lost</NavSp1>
            <NavSp2> & </NavSp2>
            <NavSp1>Found</NavSp1>
          </NavLogo>
          <MobileIcon onClick={handleOpen}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks to="about">
                <Link to="/">
                <NavLinks to="/">Home</NavLinks>
                </Link>
              </NavLinks>
            </NavItem>
            {location.pathname === "/" && (
              <>
                <NavItem>
                  <NavLinks to="posts">Recent posts</NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks to="services">Services</NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks to="signup">Join us</NavLinks>
                </NavItem>
              </>
            )}
            <>
              <NavLinks to="">
                <Link to="/posts">
                  {isAuth ? (
                    <BsFillFileEarmarkPostFill size={20} />
                  ) : (
                    "All posts"
                  )}
                </Link>
              </NavLinks>
              {isAuth ? (
                <>
                  <NavLinks to="">
                    <Link to="/post/add">
                      <PostAddIcon className="Nav-icons" />
                    </Link>
                  </NavLinks>
                  <NavLinks to="">
                    <Link to="/myprofile">
                      <AccountCircleIcon className="Nav-icons" />
                    </Link>
                  </NavLinks>
                  {user.role === "admin" && (
                    <>
                      <NavLinks to="">
                        <Link to="/admin">
                          <AdminPanelSettingsOutlinedIcon
                            style={{ fontSize: 28 }}
                            className="Nav-icons"
                          />
                        </Link>
                      </NavLinks>
                    </>
                  )}
                  <NavLinks to="">
                    <Link to="/signIn">
                      <ExitToAppIcon
                        className="Nav-icons"
                        onClick={handleLogout}
                      />
                    </Link>
                  </NavLinks>
                </>
              ) : (
                <>
                  <NavBtn>
                    <NavLinks to="">
                      <NavBtnLink to="/signUp">Register</NavBtnLink>
                    </NavLinks>
                    <NavLinks to="">
                      <NavBtnLink to="/signIn">Login</NavBtnLink>
                    </NavLinks>
                  </NavBtn>
                </>
              )}
            </>
            {location.pathname === "/posts" && (
              <div className="search">
                <NavLinks to="">
                  <BsSearch
                    style={{ fontSize: 20 }}
                    className="Nav-icons"
                    onClick={handleShowInput}
                  />
                </NavLinks>
                {showInput && (
                  <input
                    variant="standard"
                    placeholder="Search..."
                    onChange={handleSearchChange}
                    value={inputText}
                    type="text"
                  />
                )}
              </div>
            )}
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbarstyled;
