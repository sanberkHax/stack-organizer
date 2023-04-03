import { Icon } from "../Icon";

export const StackOverflowButton = ({ link }) => {
  return (
    <button className="stack-overflow-btn">
      <a href={link} rel="noreferrer" target="_blank">
        <Icon name="forward" />
        <p className="stack-overflow-btn__link">View on Stack Overflow</p>
      </a>
    </button>
  );
};
