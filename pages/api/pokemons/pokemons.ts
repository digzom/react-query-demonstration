import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import {
  addPokemon,
  getPokemonsService,
} from "../../../services/pokemonsService"
import { PokemonType } from "../../../types/pokemon-type"

const pokemonHandler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const pokemons: PokemonType[] = await getPokemonsService()

    res.status(200).json(pokemons)
  }

  if (req.method === "POST") {
    const { id, name, type } = req.body as PokemonType

    try {
      const pokemon = await addPokemon({ id, name, type })

      res.status(201).json(pokemon)
    } catch (error) {
      console.log(error)
    }
  }
}

export default pokemonHandler
