import { promises as fs} from "fs";
import path from "path";
import PokemonInterface from "./interface";

const pokemonDataFilePath = path.join('../server', 'data', 'pokemon.json')


// getPokemons//
const getPokemons = async (): Promise<PokemonInterface[]> => {
  const data = await fs.readFile(pokemonDataFilePath, 'utf8')
  try{
    let pokemonsList : PokemonInterface[] = JSON.parse(data)
    return pokemonsList;
  } catch(error) {
    console.error('')
    console.log('데이터를 불러올 수 없습니다', error)
    throw new Error('데이터를 불러오는데 실패했습니다.');
  }
}

const createPokemon = async( newPokemon : PokemonInterface): Promise<PokemonInterface> => {
  let pokemonList = await getPokemons();
  try{
    pokemonList.push(newPokemon)
    await fs.writeFile(pokemonDataFilePath, JSON.stringify(pokemonList, null, 2))
    return newPokemon
  } catch (error) {
    console.log('post 실패',error)
    throw new Error('포켓몬을 등록하는데 실패했습니다.')
  }
}


export default{ getPokemons, createPokemon };

