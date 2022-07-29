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

const PokemonTesting = () => {
  const { data: pokemons, isError, isFetching, refetch } = useGetPokemons()
  const [isOpen, setIsOpen] = useState(false)
  // const fetchPokemon = async () => {
  //   const response = await fetch(`http://localhost:3001/pokemon/`)

  //   const poke = await response.json()
  //   return poke
  // }

  // const {
  //   data: pokemons,
  //   isLoading,
  //   isError,
  //   refetch,
  // } = useQuery<PokemonType>(["poke"], fetchPokemon, {
  //   onSuccess: () => toast("Pokemons carregados com sucesso!"),
  //   onError: () => console.log("houve um erro aqui"),
  //   enabled: true,
  //   refetchOnWindowFocus: false,
  //   useErrorBoundary: true,
  //   placeholderData: { results: [{ name: "Nenhum pokemon", url: "link" }] },
  // })

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
      <FetchButton text="Fetch Pokemons" onClick={() => refetch()} />
      {!!pokemons && <PokemonGrid pokemon={pokemons} />}
      <ToastContainer autoClose={2000} />
      <PokemonForm isOpen={isOpen} handleClose={() => setIsOpen(false)}>
        Modal content
      </PokemonForm>
      <AddPokemonButton onClick={() => setIsOpen(true)}>
        Adicionar Pokemon
      </AddPokemonButton>
    </div>
  )
}

export default PokemonTesting
