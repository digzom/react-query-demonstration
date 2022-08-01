import { PokemonType } from "../types/pokemon-type"

const baseURL = "http://localhost:3000/api"

export const putPokemon = async ({
  id,
  name,
  type,
}: PokemonType): Promise<PokemonType | Error | undefined> => {
  try {
    const response = await fetch(`${baseURL}/pokemons/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ name, type }),
    })

    const pokemon = await response.json()

    return pokemon
  } catch (error) {
    if (error instanceof Error) return error
  }
}
