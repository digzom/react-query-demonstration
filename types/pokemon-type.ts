export type PokemonType = {
  id?: number
  name: string
  type: PokemonTypeOptions
}

export type PokemonTypeOptions =
  | "inseto"
  | "sombrio"
  | "dragão"
  | "elétrico"
  | "fada"
  | "lutador"
  | "fogo"
  | "voador"
  | "fantasma"
  | "planta"
  | "terrestre"
  | "gelo"
  | "normal"
  | "venenoso"
  | "psíquico"
  | "pedra"
  | "aço"
  | "água"
