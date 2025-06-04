import { Button } from '../Button/Button'
import styles from './Error.module.css'

export const Error = ({ error, hasButton, buttonText, onClick }) => {
  return (
    <div className={styles.error}>
      <p>Error: {error}</p>
      {hasButton && <Button onClick={onClick}>{buttonText}</Button>}
    </div>
  )
}