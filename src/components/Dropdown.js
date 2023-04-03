export const Dropdown = ({ items, onClick }) => {
  return (
    <ul className="dropdown">
      {items.map((item, i) => (
        <li key={i} className="dropdown__item" onClick={(e) => onClick(e)}>
          {item}
        </li>
      ))}
    </ul>
  );
};
