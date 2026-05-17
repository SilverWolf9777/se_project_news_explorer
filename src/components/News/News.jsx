import { useState, useContext } from "react";
import NewsCard from "../NewsCard/NewsCard";
import { useLocation } from "react-router-dom";
import { ApiRequestContext } from "../Contexts/ApiRequestContext";
import notFoundIcon from "../../assets/not_found.svg";
import Preloader from "../Preloader/Preloader";
function News({ cardArray = [], onBookmarkClick, onRemoveClick, isLoading }) {
  const location = useLocation();
  const { apiRequestData } = useContext(ApiRequestContext);

  const isSavedNews =
    location.pathname === "/saved-news" ||
    location.pathname === "/se_project_news_explorer/saved-news";
  const [visibleCount, setVisibleCount] = useState(3);
  function handleShowMore() {
    setVisibleCount((prev) => prev + 3);
  }
  return (
    <div className="news__container">
      {isLoading ? (
        <Preloader />
      ) : cardArray.length === 0 ? (
        <div className="news__center">
          <img
            src={notFoundIcon}
            alt="No News Found Icon"
            className="news__not-found-img"
          />

          <h1 className="news__not-found-title">Nothing Found</h1>

          <p className="news__not-found-caption text-18">
            Sorry, but nothing matched your search terms.
          </p>
        </div>
      ) : (
        <>
          <h1 className="news__found">Search results</h1>

          <div className="news__cards-container">
            {(isSavedNews ? cardArray : cardArray.slice(0, visibleCount)).map(
              (article, index) => (
                <NewsCard
                  key={index}
                  article={article}
                  onBookmarkClick={() => onBookmarkClick(article)}
                  onRemoveClick={() => onRemoveClick(article)}
                />
              ),
            )}
          </div>

          {visibleCount < cardArray.length && !isSavedNews && (
            <button onClick={handleShowMore} className="news__showmore-btn">
              Show more
            </button>
          )}
        </>
      )}
    </div>
  );
}
export default News;
