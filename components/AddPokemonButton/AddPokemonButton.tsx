import React from "react"
import styles from "./AddPokemonButton.module.css"

const AddPokemonButton = ({
  onClick,
  children,
}: {
  onClick: () => void
  children: JSX.Element | string
}) => {
  return (
    <div className={styles.button} onClick={onClick}>
      {children}
    </div>
  )
}

export default AddPokemonButton
