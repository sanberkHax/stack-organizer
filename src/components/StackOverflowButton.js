export const StackOverflowButton = ({ link }) => {
  return (
    <button className="stack-overflow-btn">
      <a href={link} rel="noreferrer" target="_blank">
        <svg
          className="stack-overflow-btn__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M14 18l10-7.088-10-6.912v3.042s-11.618 2.583-14 12.958c5.072-5.431 14-5.218 14-5.218v3.218z" />
        </svg>
        <p className="stack-overflow-btn__link">View on Stack Overflow</p>
      </a>
    </button>
  );
};
