import styles from "./FetchButton.module.css"

const FetchButton = ({
  text,
  onClick,
}: {
  text: string
  onClick: () => void
}): JSX.Element => {
  return (
    <div className={styles.button} onClick={() => onClick()}>
      {text}
    </div>
  )
}

export default FetchButton
