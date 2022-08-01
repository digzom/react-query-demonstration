import { UseMutateFunction } from "@tanstack/react-query"
import React, { FormEvent, useEffect } from "react"
import usePostPokemon from "../../hooks/usePostPokemon"
import { PokemonType, PokemonTypeOptions } from "../../types/pokemon-type"
import CustomInput from "../CustomInput"
import styles from "./PokemonForm.module.css"

type FormModalType = {
  isOpen: boolean
  handleClose: () => void
}

type PostPokemonMutateType = UseMutateFunction<
  PokemonType | Error | undefined,
  unknown,
  PokemonType,
  unknown
>

interface FormElements extends HTMLFormControlsCollection {
  nome: HTMLInputElement
  tipo: HTMLInputElement
}

const onSubmit = (
  event: FormEvent<HTMLFormElement>,
  postPokemonMutation: PostPokemonMutateType
) => {
  event.preventDefault()

  const { nome, tipo } = event.currentTarget.elements as FormElements

  postPokemonMutation({
    name: nome.value,
    type: tipo.value as PokemonTypeOptions,
  })
}

const PokemonForm: React.FC<FormModalType> = ({ isOpen, handleClose }) => {
  const { mutate } = usePostPokemon()

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
      <div className={styles.content}>
        <form onSubmit={(event) => onSubmit(event, mutate)}>
          <CustomInput label="Nome" />
          <CustomInput label="Tipo" />
          <CustomInput props={{ type: "submit" }} />
        </form>
      </div>
    </div>
  )
}

export default PokemonForm
