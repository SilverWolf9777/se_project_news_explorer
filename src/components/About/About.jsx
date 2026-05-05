import aboutImg from "../../assets/about.jpg";
function About() {
  return (
    <div className="about__container">
      <img src={aboutImg} alt="About Author Photo" className="about__image" />
      <div className="about__column">
        <h1 className="about__title">About the Author</h1>
        <p className="about__content">
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know.
        </p>
        <p className="about__content">
          You can also talk about your experience with TripleTen, what you
          learned there, and how you can help potential customers.
        </p>
      </div>
    </div>
  );
}
export default About;
