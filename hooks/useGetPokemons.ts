import { useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"

import { PokemonType } from "../types/pokemon-type"
import fetchPokemons from "../api/fetchPokemons"

const useGetPokemons = () => {
  return useQuery<PokemonType[]>(["poke"], fetchPokemons, {
    onError: () => console.log("houve um erro aqui"),
    onSuccess: () => toast("Pokemons carregados com sucesso!"),
    enabled: false,
    refetchOnWindowFocus: false,
  })
}

export default useGetPokemons
