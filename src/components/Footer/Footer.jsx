import { NavLink } from "react-router-dom";
import github_logo from "../../assets/github_logo.svg";
import linkedin_logo from "../../assets/linkedin_logo.svg";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__powered-by">
        @ 2026 Supersite, Powered by NewsAPI
      </div>
      <nav className="footer__nav">
        <NavLink className="footer__navlink" to="/">
          Home
        </NavLink>
        <a href="https://tripleten.com/" className="footer__navlink">
          Triple Ten
        </a>
        <div className="footer__navlink-img-container">
          <a
            href="https://github.com/SilverWolf9777"
            className="footer__navlink"
          >
            <img src={github_logo} alt="" className="footer__navlink-img" />
          </a>
          <a
            href="https://www.linkedin.com/in/dylan-woolf-470804390/"
            className="footer__navlink"
          >
            <img src={linkedin_logo} alt="" className="footer__navlink-img" />
          </a>
        </div>
      </nav>
    </div>
  );
}
export default Footer;
