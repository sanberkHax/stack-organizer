import { Icon } from './Icon';

export const Button = ({
  icon,
  text,
  className = 'btn',
  onClick,
  children,
  ...props
}) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <button className={className} onClick={handleClick} {...props}>
      {icon && <Icon name={icon} className={`${className}__icon`} />}
      {text && <p className={`${className}__text`}>{text}</p>}
      {children}
    </button>
  );
};
