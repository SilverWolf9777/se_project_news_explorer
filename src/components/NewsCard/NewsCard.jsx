import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../Contexts/CurrentUserContext";

function NewsCard({ article, onBookmarkClick, onRemoveClick }) {
  const location = useLocation();

  const isSavedNews = location.pathname === "/saved-news";
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
      <a href={article.url} className="card__img_link">
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
                ? "card__removeIcon_hoversign Roboto_medium"
                : !isLoggedIn
                  ? "card__bookmark_hoversign Roboto_medium"
                  : "hidden"
            }
          >
            {isSavedNews ? "Remove from saved" : "Sign in to save articles"}
          </p>

          <button
            onClick={isSavedNews ? onRemoveClick : onBookmarkClick}
            className={
              isBookmarked
                ? "card__bookmark_background_saved"
                : "card__bookmark_background"
            }
          ></button>
        </div>
      </div>
      <div className="card__text">
        <p className="card__date">{formatted}</p>
        <h1 className="card__description RobotoSlab">{article.description}</h1>
        <p className="card__content Roboto">{stripHTML(article.content)}</p>
        <p className="card__footer RobotoSlab_bold text-16">
          {article.source.name}
        </p>
      </div>
    </div>
  );
}
export default NewsCard;
