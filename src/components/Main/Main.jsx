import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Main.css";

function Main({ children, onSearchClick, apiRequestData, setApiRequestData }) {
  const location = useLocation();

  const isSavedNews = location.pathname === "/saved-news";
  return (
    <div className={isSavedNews ? "" : "main"}>
      {children}
      <div className="main__container">
        <h1 className="main__header">What's going on in the world?</h1>
        <p className="main__context">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <div className="main__searchbar">
          <input
            id="searchbar__input"
            type="text"
            placeholder="Enter topic"
            className="main__input"
            value={apiRequestData.q}
            onChange={(e) =>
              setApiRequestData((prev) => ({
                ...prev,
                q: e.target.value,
              }))
            }
          ></input>
          <button onClick={onSearchClick} className="main__search-btn">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
export default Main;
