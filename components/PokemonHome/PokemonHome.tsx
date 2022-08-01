import { BeatLoader } from "react-spinners"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import useGetPokemons from "../../hooks/useGetPokemons"
import PokemonForm from "../PokemonForm"
import FetchButton from "../FetchButton"
import PokemonGrid from "../PokemonGrid/PokemonGrid"
import styles from "./PokemonHome.module.css"
import { useState } from "react"
import AddPokemonButton from "../AddPokemonButton"
import PokemonEditForm from "../PokemonEditForm"

const PokemonTesting = () => {
  const { data: pokemons, isError, isFetching, refetch } = useGetPokemons()
  const [isOpen, setIsOpen] = useState(false)

  if (isError) return <div>houve um erro</div>

  if (isFetching) {
    return (
      <div className={styles.container}>
        <FetchButton text="Fetch Pokemons" onClick={() => refetch()} />
        <BeatLoader />
        <ToastContainer autoClose={2000} />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", columnGap: 20 }}>
        <FetchButton text="Fetch Pokemons" onClick={() => refetch()} />
        <AddPokemonButton onClick={() => setIsOpen(true)}>
          Adicionar Pokemon
        </AddPokemonButton>
      </div>
      {!!pokemons && <PokemonGrid pokemon={pokemons} />}
      <ToastContainer autoClose={2000} />
      <PokemonForm isOpen={isOpen} handleClose={() => setIsOpen(false)} />
    </div>
  )
}

export default PokemonTesting
