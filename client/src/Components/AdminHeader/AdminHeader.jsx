import React,{useState} from 'react'
import './AdminHeader.css'

import { Link, NavLink } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import { useSelector } from "react-redux";
import { logout, selectAdmin } from "../../Features/adminSlice";
import { useDispatch } from "react-redux";
const AdminHeader = () => {
    const dispatch = useDispatch();
  const admin = useSelector(selectAdmin);
  console.log(admin,'wowowowowoowo')
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
    <section className="h-wrapper2">
    <div className="flexCenter paddings innerWidth h-container">
      <Link to="/">
        <img src="../../../../public/logo-1.png" alt="logo image" className="icon" />
      </Link>
      <OutsideClickHandler
        onOutsideClick={() => {
          setMenuOpened(false);
        }}
      >
        <div className="flexCenter h-menu" style={getMenuStype(menuOpened)}>
          <NavLink to="/properties">All Properties</NavLink>
          {admin ? (
            <>
              <NavLink >
               <h4>{admin?.name}</h4>
              </NavLink>

              <NavLink>
                <button onClick={(e) => handleLogout(e)} className="button">
                  logout
                </button>
              </NavLink>
            </>
          ) : (
            <>
              
              <NavLink to="/admin/login">
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
  )
}

export default AdminHeader
