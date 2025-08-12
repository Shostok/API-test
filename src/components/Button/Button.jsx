// Button.jsx
import styles from './Button.module.css';

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const variantClass = styles[`variant-${variant}`] || '';
  const sizeClass = styles[`size-${size}`] || '';

  return (
    <button
      className={`${styles.button} ${variantClass} ${sizeClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
