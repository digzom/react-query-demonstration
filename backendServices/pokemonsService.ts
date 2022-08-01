import { PokemonType } from "../types/pokemon-type"

const baseURL = "http://localhost:3001"

export const getPokemonsService = async () => {
  const response = await fetch(`${baseURL}/pokemon`)

  const poke = await response.json()
  return poke
}

export const addPokemon = async ({
  name,
  type,
}: PokemonType): Promise<PokemonType | Error | undefined> => {
  try {
    const response = await fetch(`${baseURL}/pokemon`, {
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

export const editPokemon = async ({
  id,
  name,
  type,
}: PokemonType): Promise<PokemonType | Error | undefined> => {
  try {
    const response = await fetch(`${baseURL}/pokemon/${id}`, {
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

export const deletePokemon = async ({
  id,
}: Partial<PokemonType>): Promise<PokemonType | Error | undefined> => {
  try {
    const response = await fetch(`${baseURL}/pokemon/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({ id }),
    })

    const returning = await response.json()

    return returning
  } catch (error) {
    if (error instanceof Error) return error
  }
}

export const getPokemonWithId = async ({
  id,
}: Partial<PokemonType>): Promise<PokemonType | Error | undefined> => {
  try {
    const response = await fetch(`${baseURL}/pokemon/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      body: JSON.stringify({ id }),
    })

    const pokemon = await response.json()

    return pokemon
  } catch (error) {
    if (error instanceof Error) return error
  }
}
