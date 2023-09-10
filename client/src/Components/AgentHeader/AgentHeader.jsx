import React, { useEffect, useState } from "react";
import "./AgentHeader.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { selectAgent, logout } from "../../Features/agentSlice";
import { Link, NavLink } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
const AgentHeader = () => {
  const dispatch = useDispatch();

  const agent_ = useSelector(selectAgent);
  const [menuOpened, setMenuOpened] = useState(false);

  const getMenuStype = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: !menuOpened && "-100%" };
    }
  };
  const handleLogout = (e) => {
    localStorage.removeItem("AgentToken")
    dispatch(logout());
  };
  return (
    <section className="h-wrapper1">
      <div className="flexCenter paddings innerWidth h-container">
        <Link to="/agent">
          <img
            src="../../../../public/logo-1.png"
            alt="logo image"
            className="icon"
          />
        </Link>
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div className="flexCenter h-menu" style={getMenuStype(menuOpened)}>
          {agent_?.loggedin ? (
              <>
                <NavLink >
                 <h4>{agent_?.name}</h4>
                </NavLink>

                <NavLink>
                  <button onClick={(e) => handleLogout(e)} className="button">
                    logout
                  </button>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/" target="_blank">
                  <u>login as client?</u>
                </NavLink>

                <NavLink to="/agent/login">
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

export default AgentHeader;
