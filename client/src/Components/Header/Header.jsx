import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { useAuth0 } from "@auth0/auth0-react";
import UserMenu from "../UserMenu/UserMenu";
import { UserContext } from "../../Context/userContext";
import { useMutation } from "react-query";
import { createUser } from "../../utils/Api";
import { Link, NavLink } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
const Header = () => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const { setUserDetails } = useContext(UserContext);
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: () => createUser(user),
  });
  const [menuOpened, setMenuOpened] = useState(false);
  useEffect(() => {
    console.log(user, "user object"); // Add this line
    if (isAuthenticated && user?.email) {
      mutate();
    }
  }, [isAuthenticated, user, mutate]);
  const getMenuStype = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: !menuOpened && "-100%" };
    }
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

          {!isAuthenticated ? (
            <button className="button" onClick={loginWithRedirect}>
              <a href=""> login</a>
            </button>
          ) : (
            <UserMenu user={user} logout={logout} />
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
