import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../Contexts/CurrentUserContext";
import { NavLink, useLocation } from "react-router-dom";
import logoutIcon from "../../assets/logout.svg";
import logoutIconWhite from "../../assets/logout-white.svg";
import "./Header.css";

function Header({ handleLogout, setOpenedModal }) {
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);
  const location = useLocation();

  const isSavedNews = location.pathname === "/saved-news";
  return (
    <>
      <nav
        className={
          isSavedNews
            ? "header__color-dark header__position"
            : "header__color-light header__position"
        }
      >
        <div className="header__container header__bottom-border">
          <NavLink to="/" className="header__logo RobotoSlab_bold">
            NewsExplorer
          </NavLink>
          <div className="header__row">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "nav__link nav__link_active Roboto_medium"
                  : "nav__link Roboto_medium"
              }
            >
              Home
            </NavLink>
            {!isLoggedIn && (
              <>
                <button
                  className="header__logout-btn"
                  onClick={() => {
                    setOpenedModal("signin");
                  }}
                >
                  Sign in
                </button>
              </>
            )}
            {isLoggedIn && (
              <>
                <NavLink
                  to="/saved-news"
                  className={({ isActive }) =>
                    isActive
                      ? "nav__link nav__link_active Roboto_medium"
                      : "nav__link Roboto_medium"
                  }
                >
                  Saved articles
                </NavLink>
                <button
                  className="header__logout-btn  Roboto_medium"
                  onClick={handleLogout}
                >
                  {currentUser?.name}
                  <img
                    className={
                      isSavedNews
                        ? "header__logout-logo"
                        : "header__logout-logo header__color-change"
                    }
                    src={isSavedNews ? logoutIcon : logoutIconWhite}
                    alt="logout"
                  ></img>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
export default Header;
