import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ApiRequestContext } from "../Contexts/ApiRequestContext";
import { CurrentUserContext } from "../Contexts/CurrentUserContext";
import News from "../News/News";
import About from "../About/About";
import "./Main.css";

function Main({
  onSearchClick,
  savedNews,
  isLoading,
  cardArray,
  hasSearched,
  onBookmarkClick = () => {},
  onRemoveClick = () => {},
}) {
  const { apiRequestData, setApiRequestData } = useContext(ApiRequestContext);
  const { currentUser } = useContext(CurrentUserContext);
  const location = useLocation();

  const isSavedNews =
    location.pathname === "/saved-news" ||
    location.pathname === "/se_project_news_explorer/saved-news";
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
    <main className="main__saved-page">
      <div className="main__column">
        <p className="main__grey-title">Saved articles</p>
        <h1 className="main__articles_saved">
          {currentUser?.name} , you have {currentUser?.articles.length} saved
          articles
        </h1>
        <p className="main__keywords">
          By keywords:{" "}
          <span className="main__keywords-span">
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
        isLoading={isLoading}
      ></News>
    </main>
  ) : (
    <main>
      {hasSearched !== "" && (
        <News
          cardArray={cardArray}
          onRemoveClick={onRemoveClick}
          onBookmarkClick={onBookmarkClick}
          isLoading={isLoading}
        />
      )}
      <About />
    </main>
  );
}
export default Main;
