import React, { useContext, useEffect, useState } from "react";
import "./Header.css";

import UserMenu from "../UserMenu/UserMenu";

import { Link, NavLink } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import { useSelector } from "react-redux";
import { logout, selectUser } from "../../Features/UserSlice";
import { useDispatch } from "react-redux";
const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log(user?.name);
  const [menuOpened, setMenuOpened] = useState(false);

  const getMenuStype = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: !menuOpened && "-100%" };
    }
  };
  const handleLogout = (e) => {
    dispatch(logout());
  };

  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <Link to="/">
          <img src="./logo-1.png" alt="logo image" className="icon" />
        </Link>
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div className="flexCenter h-menu" style={getMenuStype(menuOpened)}>
            <NavLink to="/properties">All Properties</NavLink>
            {user?.loggedin ? (
              <>
                <NavLink to="/agent" target="_blank">
                  <u>{user?.name}</u>
                </NavLink>

                <NavLink>
                  <button onClick={(e) => handleLogout(e)} className="button">
                    logout
                  </button>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/agent" target="_blank">
                  <u>login as agent?</u>
                </NavLink>

                <NavLink to="/login">
                  <button className="button">login</button>
                </NavLink>
              </>
            )}
          </div>
        </OutsideClickHandler>
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
