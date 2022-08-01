import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import {
  addPokemon,
  getPokemonsService,
} from "../../../backendServices/pokemonsService"
import { PokemonType, PokemonTypeOptions } from "../../../types/pokemon-type"

const pokemonHandler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const pokemons: PokemonType[] = await getPokemonsService()

    res.status(200).json(pokemons)
  }

  if (req.method === "POST") {
    const { id, name, type } = req.body as PokemonType
    const pokemonType = type.toLowerCase()

    try {
      const pokemon = await addPokemon({
        id,
        name,
        type: pokemonType as PokemonTypeOptions,
      })

      res.status(201).json(pokemon)
    } catch (error) {
      console.log(error)
    }
  }
}

export default pokemonHandler
