import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../Contexts/CurrentUserContext";

function NewsCard({ article, onBookmarkClick, onRemoveClick }) {
  const location = useLocation();

  const isSavedNews =
    location.pathname === "/saved-news" ||
    location.pathname === "/se_project_news_explorer/saved-news";
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);
  const date = new Date(article.publishedAt);
  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  function stripHTML(text = "") {
    const doc = new DOMParser().parseFromString(text, "text/html");

    return (doc.body.textContent || "").replace(/\[\+\d+\schars\]/, "");
  }
  const isBookmarked = currentUser?.articles?.some((savedArticle) => {
    return savedArticle.url === article.url;
  });

  return (
    <div className="card">
      <a
        href={article.url}
        className="card__img_link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={article.urlToImage}
          alt="article image"
          className="card__img"
        />
      </a>
      <div className="card__bookmark_position">
        <p className={isSavedNews ? "card__articleSearched" : "hidden"}>
          {article.keyword}
        </p>
        <div className="card__row">
          <p
            className={
              isSavedNews
                ? "card__removeIcon_hoversign"
                : !isLoggedIn
                  ? "card__bookmark_hoversign"
                  : "hidden"
            }
          >
            {isSavedNews ? "Remove from saved" : "Sign in to save articles"}
          </p>

          <button
            onClick={isSavedNews ? onRemoveClick : onBookmarkClick}
            className={
              isSavedNews
                ? "card__remove_background"
                : isBookmarked
                  ? "card__bookmark_background_saved"
                  : "card__bookmark_background"
            }
          ></button>
        </div>
      </div>
      <div className="card__text">
        <p className="card__date">{formatted}</p>
        <h1 className="card__description">{article.description}</h1>
        <p className="card__content">{stripHTML(article.content)}</p>
        <p className="card__footer text-16">{article.source.name}</p>
      </div>
    </div>
  );
}
export default NewsCard;
