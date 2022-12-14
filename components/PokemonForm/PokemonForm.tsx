import { UseMutateFunction } from "@tanstack/react-query"
import React, { FormEvent, useEffect } from "react"
import useGetPokemons from "../../hooks/useGetPokemons"
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

const onSubmit = async (
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
  const { mutate, isSuccess } = usePostPokemon()
  const { refetch } = useGetPokemons()

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? handleClose() : null
    document.body.addEventListener("keydown", closeOnEscapeKey)
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey)
    }
  }, [handleClose])

  if (!isOpen) return null
  if (isSuccess === true) {
    refetch()
    handleClose()
  }

  return (
    <div className={styles.modal}>
      <div onClick={handleClose} className={styles.close}>
        fechar
      </div>
      <div className={styles.content}>
        <form onSubmit={(event) => onSubmit(event, mutate)}>
          <CustomInput label="nome" />
          <CustomInput label="tipo" />
          <CustomInput props={{ type: "submit" }} />
        </form>
      </div>
    </div>
  )
}

export default PokemonForm
