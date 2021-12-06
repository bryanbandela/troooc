import './Footer.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="socials">
        <a href="https://github.com/bryanbandela">
          <i className="gihub">
            <FaGithub size="20" />
          </i>
        </a>
        <a href="https://www.linkedin.com/in/bryan-bandela-180255169/">
          <i className="linkedin">
            <FaLinkedin size="20" />
          </i>
        </a>
      </div>
      <p>Built & Breathed by Bryan Bandela</p>
    </footer>
  );
}

export default Footer;
