import footerLogo from '../assets/footer-logo.svg';
export const Footer = () => {
  return (
    <footer className="footer">
      <img src={footerLogo} alt="footer-logo" className="footer__logo" />
      <p className="footer__text">
        Designed & Built by{' '}
        <span className="footer__text--bold">Sanberk Türker</span>
      </p>
    </footer>
  );
};
