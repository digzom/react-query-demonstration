import { PokemonType } from "../types/pokemon-type"

export const postPokemon = async ({
  name,
  type,
}: PokemonType): Promise<PokemonType | Error | undefined> => {
  try {
    const response = await fetch(`http://localhost:3000/api/pokemons`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name, type }),
    })

    const pokemon = await response.json()

    return pokemon
  } catch (error) {
    if (error instanceof Error) return error
  }
}
