import "./home-page.css";
import { useNavigate } from "react-router-dom";
import peopleGroup from "../assets/people_group.png";
import lupa from "../assets/lupa.png";
import person from "../assets/person.png";

export default function HomePage() {
  const navigate = useNavigate(); // Hook para navegar

  // Funciones para manejar clics en los botones
  const handleSignUpClick = () => {
    navigate("/signup"); // Navega a la ruta de registro
  };

  const handleLoginClick = () => {
    navigate("/login"); // Navega a la ruta de inicio de sesión
  };

  return (
    <>
      <header className="header">
        <div className="header__logo">LOGO</div>
        <div className="header__buttons">
          <button
            className="header__button header__button--signup"
            onClick={handleSignUpClick}
          >
            SIGN UP
          </button>
          <button
            className="header__button header__button--login"
            onClick={handleLoginClick}
          >
            LOGIN
          </button>
        </div>
      </header>

      <main className="main">
        <section className="job-offer">
          <h2 className="job-offer__title headline-2">
            The place where you get that job
          </h2>
          <p className="job-offer__description headline-5">
            With our Machine Learning algorithm you will get that job in no
            time. We promise you! Just give us the money and we will take care
            of it.
          </p>
          <button className="job-offer__button" onClick={handleSignUpClick}>Create an account now</button>
          <img
            src={peopleGroup}
            alt="Group of people"
            className="job-offer__image"
          />
        </section>

        <section className="job-search">
          <div>
            <h3 className="job-search__title headline-3">Find your next job</h3>
            <p className="job-search__description headline-5">
              Our Machine learning algorithm is so good that it’s even illegal
              in some countries. Join us to use our barely legal algorithm that
              is actually a group of interns that work on our basement. We have
              a job for you, no matter your background or previous experience.
              Is sending random memes through chat your only skill? That’s ok,
              we got you, our Rock Star Meme Curator role is here for you.
            </p>
          </div>
          <img src={lupa} alt="" className="job-search__image" />
        </section>

        <section className="team">
          <h2 className="team__title headline-3">Meet the team</h2>
          <div className="team__members">
            <div className="team-member">
              <img src={person} alt="" className="team-member__image" />
              <h3 className="team-member__name headline-5">Johan Segura</h3>
              <p className="team-member__role">Frontend & Backend</p>
              <div className="team-member__social-media">
                <a
                  href="https://github.com/yamathe5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/johan-segura/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
