import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import {
  deletePokemon,
  editPokemon,
  getPokemonWithId,
} from "../../../services/pokemonsService"
import { PokemonType } from "../../../types/pokemon-type"

export const pokemonIdHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "GET") {
    const { id } = req.query
    const pokemonId: number = Number(id)
    try {
      const pokemon = await getPokemonWithId({ id: pokemonId })
      res.status(200).json(pokemon)
    } catch (error) {
      console.log(error)
    }
  }

  if (req.method === "PUT") {
    const { id } = req.query
    const { name, type } = req.body as PokemonType
    const pokemonId = Number(id)
    console.log(name, type, id)

    try {
      const pokemon = await editPokemon({ id: pokemonId, name, type })
      res.status(201).json(pokemon)
    } catch (error) {
      console.log(error)
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.query
    const pokemonId = Number(id)
    try {
      await deletePokemon({ id: pokemonId })
      res.status(204).end()
    } catch (error) {
      console.log(error)
    }
  }
}

export default pokemonIdHandler
