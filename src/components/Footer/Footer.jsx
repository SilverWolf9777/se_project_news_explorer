import { NavLink } from "react-router-dom";
import github_logo from "../../assets/github_logo.svg";
import linkedin_logo from "../../assets/linkedin_logo.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__powered-by">
        @ 2026 Supersite, Powered by NewsAPI
      </div>
      <nav className="footer__nav">
        <div className="footer__column">
          <NavLink className="footer__navlink" to="/">
            Home
          </NavLink>
          <a
            href="https://tripleten.com/"
            className="footer__navlink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Triple Ten
          </a>
        </div>
        <div className="footer__navlink-img-container">
          <a
            href="https://github.com/SilverWolf9777"
            className="footer__navlink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={github_logo}
              alt="GitHub"
              className="footer__navlink-img"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/dylan-woolf-470804390/"
            className="footer__navlink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={linkedin_logo}
              alt="LinkedIn"
              className="footer__navlink-img"
            />
          </a>
        </div>
      </nav>
    </footer>
  );
}
export default Footer;
