import logo from '../../../assets/homepage-logo.svg';
import illustration from '../../../assets/illustration.svg';

export const Welcome = () => {
  return (
    <section className="welcome-section">
      <img
        src={logo}
        alt="stack organizer logo"
        className="welcome-section__logo"
      />
      <img
        src={illustration}
        alt="web page illustration"
        className="welcome-section__illustration"
      />
      <h2 className="welcome-section__heading">
        Organize all your Stack Overflow questions in one platform!
      </h2>
    </section>
  );
};
