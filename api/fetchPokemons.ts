const fetchPokemons = async () => {
  const response = await fetch(`http://localhost:3000/api/pokemons`)

  const poke = await response.json()
  return poke
}

export default fetchPokemons
