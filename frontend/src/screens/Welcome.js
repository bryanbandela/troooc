import Footer from '../components/Footer';
import './Welcome.css';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <>
      <header className="Welcome_header">
        <a className="home_btn" href="/">
          <h2>troooc</h2>
        </a>
        <nav className="nav_header">
          <ul>
            <li className="feature">
              <a href="#features">Features</a>
            </li>
            <li>
              <Link to="/login">
                <button className="btn login">Login</button>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <button className="btn register">Register</button>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="Welcome_main">
        <div className="Welcome_heading">
          <h1>The simple expense tracker I wish I had at university.</h1>
          <p>
            Join troooc and manage your expense and receive tips from the
            community.
          </p>
          <div className="cta">
            <a href="#features">
              <button className="btn login">Features</button>
            </a>
            <a href="/register">
              <button className="btn register">Register</button>
            </a>
          </div>
        </div>
        <div
          className="Welcome_picture"
          style={{ backgroundImage: "url('/Minimal_living.jpg')" }}
        ></div>
      </main>
      <main className="main_features">
        <div>
          <h3>Minimalist</h3>
          <p>Neat User Interface</p>
        </div>
        <div>
          <h3>Interactive</h3>
          <p>The community is there for you</p>
        </div>
        <div>
          <h3>Safe</h3>
          <p>Delete your account at any time</p>
        </div>
      </main>
      <main
        id="features"
        className="features_section"
        style={{ backgroundImage: "url('/Minimalist_feature.jpg')" }}
      >
        <div className="features">
          <h2>Features</h2>
          <p>
            troooc is the expense tracker I wish I had when I went to
            university. I have designed this app with young students in mind to
            help them grow in their financial habits.
          </p>

          <p>
            troooc 1.0 offers simple but useful tools designed to help you track
            your expenses and grow your financial intelligence.
          </p>
          <ul>
            <li>Log your expenses</li>
            <li>Create a monthly budget and track your performance</li>
            <li>Get tips from the community</li>
            <li>Delete your account at any time</li>
            <li>And it's free</li>
          </ul>
        </div>
      </main>
      <main className="call_to_action">
        <div
          className="cta_picture"
          style={{ backgroundImage: "url('/Minimal_transport.jpg')" }}
        ></div>
        <div className="cta_action">
          <h2>Take action and start the journey</h2>
          <a href="/register">
            <button className="btn register">Register</button>
          </a>
        </div>
      </main>
      <main className="about_me">
        <div>
          <p>
            troooc is my personal project and it is meant as a showcase to
            potential employers. It is free of charge and you do not need to use
            a real email adress to register.
            <br />
            <br />
            If you would like to contact me, you can either visit{' '}
            <a href="www.bryanbandela.com">my portfolio website</a> or send me
            an email at: <span>bryan.bandela@gmail.com</span>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Welcome;
