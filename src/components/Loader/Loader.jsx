import styles from './Loader.module.css'

export const Loader = ({ text }) => {
  return (
    <div className={styles.loading}>{text}</div>
  )
}
