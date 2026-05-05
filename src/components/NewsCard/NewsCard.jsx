import bookmark from "../../assets/bookmark.svg";
import bookmarked from "../../assets/bookmarked.svg";
function NewsCard({ article }) {
  const date = new Date(article.publishedAt);
  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="card">
      <img src={article.urlToImage} alt="article image" className="card__img" />
      <div className="card__bookmark_background">
        <img src={bookmark} alt="bookmark" className="card__bookmark" />
      </div>
      <p className="date">{formatted}</p>
      <h1 className="card__description">{article.description}</h1>
      <p className="card__content">{article.content}</p>
      <p className="card__footer">{article.source.name}</p>
    </div>
  );
}
export default NewsCard;
