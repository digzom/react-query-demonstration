import React, { useEffect } from "react"
import styles from "./PokemonForm.module.css"

type FormModalType = {
  children: JSX.Element | string
  isOpen: boolean
  handleClose: () => void
}

const PokemonForm: React.FC<FormModalType> = ({
  children,
  isOpen,
  handleClose,
}) => {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? handleClose() : null
    document.body.addEventListener("keydown", closeOnEscapeKey)
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey)
    }
  }, [handleClose])

  if (!isOpen) return null

  return (
    <div className={styles.modal}>
      <button onClick={handleClose} className="close-btn">
        Close
      </button>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default PokemonForm
