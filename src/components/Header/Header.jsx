import { useContext, useState } from "react";
import { CurrentUserContext } from "../Contexts/CurrentUserContext";
import { ApiRequestContext } from "../Contexts/ApiRequestContext";
import { ModalContext } from "../Contexts/ModalContext";
import { NavLink, useLocation } from "react-router-dom";
import logoutIcon from "../../assets/logout.svg";
import logoutIconWhite from "../../assets/logout-white.svg";
import closeIcon from "../../assets/close__white.svg";
import rectangleIcon from "../../assets/rectangleIcon.svg";
import rectangleIconBlack from "../../assets/rectangleIconBlack.svg";
import "./Header.css";

function Header({ handleLogout }) {
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);
  const { apiRequestData, setApiRequestData } = useContext(ApiRequestContext);
  const { openedModal, setOpenedModal, handleCloseClick, onSearchClick } =
    useContext(ModalContext);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isSavedNews =
    location.pathname === "/saved-news" ||
    location.pathname === "/se_project_news_explorer/saved-news";
  const isHome =
    location.pathname === "/" ||
    location.pathname === "/se_project_news_explorer" ||
    location.pathname === "/se_project_news_explorer/";
  const isFormOpen = openedModal === "signin" || openedModal === "signup";
  return (
    <header className={`header ${isHome ? "header__home" : ""}`}>
      <nav
        className={`header__nav ${
          isSavedNews ? "header__color-dark" : "header__color-light"
        } ${isMenuOpen ? "header__mobile-open" : ""}`}
      >
        <div className="header__container header__bottom-border">
          <NavLink to="/" className="header__logo">
            NewsExplorer
          </NavLink>
          <div className="header__row">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav__link nav__link_active" : "nav__link"
              }
            >
              Home
            </NavLink>
            {!isLoggedIn && (
              <button
                className="header__logout-btn"
                onClick={() => {
                  setOpenedModal("signin");
                }}
              >
                Sign in
              </button>
            )}
            {isLoggedIn && (
              <>
                <NavLink
                  to="/saved-news"
                  className={({ isActive }) =>
                    isActive ? "nav__link nav__link_active" : "nav__link"
                  }
                >
                  Saved articles
                </NavLink>
                <button
                  className="header__logout-btn"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setOpenedModal(null);
                    handleLogout();
                  }}
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
          <button
            className="header__menu-btn"
            onClick={() => {
              if (isFormOpen) {
                setOpenedModal(null);
                setIsMenuOpen(false);
              } else {
                setOpenedModal("menu");
                setIsMenuOpen((prev) => !prev);
              }
            }}
          >
            {isMenuOpen || isFormOpen ? (
              <img
                src={closeIcon}
                alt="close menu"
                className="header__menu-icon"
              />
            ) : (
              <div className="header__hamburger">
                <span className="header__hamburger-line" />
                <span className="header__hamburger-line" />
              </div>
            )}
          </button>
          {isMenuOpen && (
            <>
              <div
                className="menu-overlay"
                onClick={() => {
                  setIsMenuOpen(false);
                  setOpenedModal(null);
                }}
              />
              <div className="menu-modal">
                <div className="menu-modal__content">
                  <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
                    Home
                  </NavLink>

                  {isLoggedIn && (
                    <NavLink
                      to="/saved-news"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Saved articles
                    </NavLink>
                  )}

                  {!isLoggedIn ? (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setOpenedModal("signin");
                      }}
                    >
                      Sign in
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setOpenedModal(null);
                        handleLogout();
                      }}
                    >
                      Log out
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
      {isHome && (
        <section className="header__hero">
          <div className="header__hero-content">
            <div className="header__hero-copy">
              <h1 className="header__hero-title">
                What's going on in the world?
              </h1>
              <p className="header__hero-text">
                Find the latest news on any topic and save them in your personal
                account.
              </p>
            </div>
            <form
              className="header__search-form"
              onSubmit={(e) => {
                e.preventDefault();
                onSearchClick();
              }}
            >
              <input
                id="searchbar__input"
                type="text"
                placeholder="Enter topic"
                className="header__search-input"
                value={apiRequestData.q}
                onChange={(e) => {
                  setApiRequestData((prev) => ({
                    ...prev,
                    q: e.target.value,
                  }));
                }}
              />
              <button type="submit" className="header__search-btn">
                Search
              </button>
            </form>
          </div>
        </section>
      )}
    </header>
  );
}
export default Header;
