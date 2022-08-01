import { capitalize } from "lodash"
import Link from "next/link"
import { useState } from "react"
import usePostPokemon from "../../hooks/usePostPokemon"
import { PokemonType, PokemonTypeOptions } from "../../types/pokemon-type"
import PokemonEditForm from "../PokemonEditForm"
import styles from "./PokemonGrid.module.css"

type ColorType = { [key in PokemonTypeOptions]: string }

const getColor = (type: PokemonTypeOptions): string => {
  const pokemonType = type
  const options: ColorType = {
    inseto: "#869600",
    sombrio: "#603626",
    dragão: "#5016d7",
    elétrico: "#d6b010",
    fada: "#d0949a",
    lutador: "#C03028",
    fogo: "#F08030",
    voador: "#A890F0",
    fantasma: "#705898",
    planta: "#78C850",
    terrestre: "#E0C068",
    gelo: "#98D8D8",
    normal: "#A8A878",
    venenoso: "#A040A0",
    psíquico: "#F85888",
    pedra: "#B8A038",
    aço: "#B8B8D0",
    água: "#6890F0",
  }

  return options[pokemonType] ?? "black"
}

const PokemonGrid = ({ pokemon }: { pokemon: PokemonType[] }) => {
  const [editIsOpen, setEditIsOpen] = useState<boolean>(false)
  const [selectedPokemonId, setSelectedPokemonId] = useState<PokemonType>()

  return (
    <div className={styles.container}>
      {pokemon?.map((poke) => (
        <div
          key={poke.id}
          onClick={() => {
            setEditIsOpen(true), setSelectedPokemonId(poke)
          }}
        >
          <div className={styles.card}>
            <span className={styles.name}>{capitalize(poke.name)}</span>
            <span
              className={styles.type}
              style={{
                backgroundColor: `${getColor(poke.type)}`,
              }}
            >
              {capitalize(poke.type)}
            </span>
          </div>
        </div>
      ))}
      <PokemonEditForm
        isModalOpen={editIsOpen}
        handleModalClose={() => setEditIsOpen(false)}
        pokemon={selectedPokemonId}
      />
    </div>
  )
}

export default PokemonGrid
