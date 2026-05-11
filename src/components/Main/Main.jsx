import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { ApiRequestContext } from "../Contexts/apiRequestContext";
import { CurrentUserContext } from "../Contexts/CurrentUserContext";
import News from "../News/News";
import "./Main.css";

function Main({
  children,
  onSearchClick,
  savedNews,
  onBookmarkClick = () => {},
  onRemoveClick = () => {},
  q,
}) {
  const { apiRequestData, setApiRequestData } = useContext(ApiRequestContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const location = useLocation();

  const isSavedNews = location.pathname === "/saved-news";
  function formatKeywords(keywords = []) {
    keywords = [...new Set(keywords)];
    if (keywords.length === 0) return "";

    if (keywords.length <= 2) {
      return keywords.join(", ");
    }

    const firstTwo = keywords.slice(0, 2).join(", ");
    const othersCount = keywords?.length - 2;

    return `${firstTwo} and ${othersCount} ${othersCount === 1 ? "other" : "others"}`;
  }

  return isSavedNews ? (
    <div className="main__saved-page">
      {children}
      <div className="main__column">
        <p className="main__grey-title Roboto">Saved articles</p>
        <h1 className="main__articles_saved RobotoSlab">
          {currentUser?.name} , you have {currentUser?.articles.length} saved
          articles
        </h1>
        <p className="main__keywords Roboto">
          By keywords:{" "}
          <span className="main__keywords-span Roboto_bold">
            {formatKeywords(
              currentUser?.articles?.map((article) => article.keyword),
            )}
          </span>
        </p>
      </div>
      <News
        cardArray={savedNews || []}
        onRemoveClick={onRemoveClick}
        onBookmarkClick={onBookmarkClick}
      ></News>
    </div>
  ) : (
    <div className="main">
      {children}
      <div className="main__container">
        <h1 className="main__header RobotoSlab">
          What's going on in the world?
        </h1>
        <p className="main__context Roboto">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        {isSavedNews ? (
          <div></div>
        ) : (
          <div className="main__searchbar">
            <input
              id="searchbar__input"
              type="text"
              placeholder="Enter topic"
              className="main__input Roboto"
              value={apiRequestData.q}
              onChange={(e) => {
                setApiRequestData((prev) => ({
                  ...prev,
                  q: e.target.value,
                }));
              }}
            ></input>
            <button
              onClick={onSearchClick}
              className="main__search-btn Roboto_medium"
            >
              Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Main;
