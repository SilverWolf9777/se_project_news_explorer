import aboutImg from "../../assets/about.jpg";
function About() {
  return (
    <div className="about__container">
      <img src={aboutImg} alt="About Author Photo" className="about__image" />
      <div className="about__column">
        <h1 className="about__title">About the Author</h1>
        <p className="about__content">
          I'm Dylan Woolf, a full-stack developer focused on frontend
          development with React. I enjoy creating clean, responsive user
          interfaces and building full web applications using technologies like
          React, JavaScript, Node.js, Express, and MongoDB.
        </p>
        <p className="about__content">
          I began learning programming through both school and independent
          study, and later expanded my skills through the TripleTen software
          engineering bootcamp. There, I gained hands-on experience building
          full-stack web applications using technologies such as React,
          JavaScript, Node.js, Express, and MongoDB. Through these projects, I
          developed strong problem- solving skills and learned how to create
          responsive, user-friendly applications. I’m excited to use these
          skills to help clients build modern and effective web experiences.
        </p>
      </div>
    </div>
  );
}
export default About;
