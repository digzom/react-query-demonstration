import { UseMutateFunction } from "@tanstack/react-query"
import React, { FormEvent, useEffect } from "react"
import useEditPokemon from "../../hooks/useEditPokemon"
import useGetPokemons from "../../hooks/useGetPokemons"
import { PokemonType, PokemonTypeOptions } from "../../types/pokemon-type"
import CustomInput from "../CustomInput"
import styles from "./PokemonForm.module.css"

type FormModalType = {
  isModalOpen: boolean
  handleModalClose: () => void
  pokemon: PokemonType | undefined
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
  editPokemonMutation: PostPokemonMutateType,
  pokemonId?: number
) => {
  event.preventDefault()

  const { nome, tipo } = event.currentTarget.elements as FormElements

  editPokemonMutation({
    id: pokemonId,
    name: nome.value,
    type: tipo.value as PokemonTypeOptions,
  })
}

const PokemonEditForm: React.FC<FormModalType> = ({
  isModalOpen,
  handleModalClose,
  pokemon,
}) => {
  const { mutate, isSuccess } = useEditPokemon()
  const { refetch } = useGetPokemons()

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? handleModalClose() : null
    document.body.addEventListener("keydown", closeOnEscapeKey)

    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey)
    }
  }, [handleModalClose])

  if (!isModalOpen) return null
  if (isSuccess) {
    refetch()
    handleModalClose()
  }

  return (
    <div className={styles.modal}>
      <div onClick={handleModalClose} className={styles.close}>
        fechar
      </div>
      <div className={styles.content}>
        <form onSubmit={(event) => onSubmit(event, mutate, pokemon?.id)}>
          <CustomInput label="nome" props={{ defaultValue: pokemon?.name }} />
          <CustomInput label="tipo" props={{ defaultValue: pokemon?.type }} />
          <CustomInput props={{ type: "submit" }} />
        </form>
      </div>
    </div>
  )
}

export default PokemonEditForm
