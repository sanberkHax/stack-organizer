export const Dropdown = ({ items, onClick }) => {
  return (
    <ul className="dropdown">
      {items.map((item) => (
        <li className="dropdown__item" onClick={(e) => onClick(e)}>
          {item}
        </li>
      ))}
    </ul>
  );
};
