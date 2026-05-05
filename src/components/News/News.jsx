import NewsCard from "../NewsCard/NewsCard";
function News({ cardArray }) {
  return (
    <div className="news__container">
      <h1 className="news__found">Search results</h1>
      <div className="news__cards-container">
        {cardArray.map((article, index) => (
          <NewsCard key={index} article={article}></NewsCard>
        ))}
      </div>
      <button className="news__showmore-btn">Show more</button>
    </div>
  );
}
export default News;
