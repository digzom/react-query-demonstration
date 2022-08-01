import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { postPokemon } from "../api/postPokemon"
import { capitalize } from "lodash"

const usePostPokemon = () => {
  return useMutation(["postPokemon"], postPokemon, {
    onError: async () => toast("Alguma coisa saiu errado. Tente novamente"),
    onSuccess: async (data) =>
      toast(`${capitalize(data?.name)} cadastrado com sucesso!`),
  })
}

export default usePostPokemon
