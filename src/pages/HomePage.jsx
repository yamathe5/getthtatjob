import "./home-page.css"

export default function HomePage() {
  return (
    <>
    <header className="header">
      <div className="header__logo">LOGO</div>
      <div className="header__buttons">
        <button className="header__button header__button--signup">SIGN UP</button>
        <button className="header__button header__button--login">LOGIN</button>
      </div>
    </header>

    <main className="main">
      <section className="job-offer">
        <h2 className="job-offer__title">The place where you get that job</h2>
        <p className="job-offer__description">With our Machine Learning algorithm you will get that job in no time. We promise you! Just give us the money and we will take care of it.</p>
        <button className="job-offer__button">create an account now</button>
        <img src="" alt="" className="job-offer__image" />
      </section>

      <section className="job-search">
        <h3 className="job-search__title">Find your next job</h3>
        <p className="job-search__description">Our Machine learning algorithm is so good that it’s even illegal in some countries. Join us to use our barely legal algorithm that is actually a group of interns that work on our basement. We have a job for you, no matter your background or previous experience. Is sending random memes through chat your only skill? That’s ok, we got you, our Rock Star Meme Curator role is here for you.</p>
        <img src="" alt="" className="job-search__image" />
      </section>

      <section className="team">
        <h2 className="team__title">Meet the team</h2>
        <div className="team__members">
        <div className="team-member">
          <img src={""} alt="" className="team-member__image" />
          <h3 className="team-member__name">Nombre</h3>
          <p className="team-member__role">Rol</p>
          <div className="team-member__social-media">
            {/* Map through socialMedia props to display icons */}
          </div>
        </div>
        </div>
      </section>
    </main>
  </>
  )
}
