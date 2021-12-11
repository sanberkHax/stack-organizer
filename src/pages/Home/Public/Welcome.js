import logo from '../../../assets/logo.png';
import illustration from '../../../assets/illustration.png';

export const Welcome = () => {
  return (
    <section>
      <img src={logo} alt="stack organizer logo" />
      <img src={illustration} alt="web page illustration" />
      <p>Organize all your Stack Overflow questions in one platform!</p>
    </section>
  );
};
