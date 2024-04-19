import { promises as fs } from 'fs';
import path from 'path';
import PokemonInterface from '../models/pokemons.Interface';

const pokemonDataFilePath = path.join('../server', 'data', 'pokemon.json');

// 전체 포켓몬 불러오기
const getPokemons = async (): Promise<PokemonInterface[]> => {
  const data = await fs.readFile(pokemonDataFilePath, 'utf8');
  try {
    let pokemonsList: PokemonInterface[] = JSON.parse(data);
    return pokemonsList;
  } catch (error) {
    throw new Error('데이터를 불러오는데 실패했습니다.');
  }
};

// 하나의 포켓몬 불러오기
const getOnePokemon = async (number: number): Promise<PokemonInterface | undefined> => {
  try {
    let pokemonList = await getPokemons();
    const onePokemon = pokemonList.find(p => p.number === number);
    console.log(onePokemon);
    return onePokemon || undefined;
  } catch (error) {
    throw new Error('포켓몬 데이터를 불러오지 못했습니다.');
  }
};

//포켓몬 생성하기
const createPokemon = async (newPokemon: PokemonInterface): Promise<PokemonInterface> => {
  try {
    let pokemonList = await getPokemons();
    pokemonList.push(newPokemon);
    pokemonList.sort((a, b) => a.number - b.number);
    await fs.writeFile(pokemonDataFilePath, JSON.stringify(pokemonList, null, 2));
    return newPokemon;
  } catch (error) {
    throw new Error('포켓몬을 등록하는데 실패했습니다.');
  }
};

//포켓몬 업데이트
const updatedPokemon = async (number: number, updatedData: PokemonInterface): Promise<PokemonInterface> => {
  try {
    let pokemonList = await getPokemons();
    const pokemon = pokemonList.findIndex(p => p.number === number);
    if (pokemon === -1) {
      throw new Error('포켓몬을 찾을 수 없습니다.');
    }

    pokemonList[pokemon] = updatedData;

    await fs.writeFile(pokemonDataFilePath, JSON.stringify(pokemonList, null, 2), 'utf8');
    return updatedData;
  } catch (error) {
    throw new Error('데이터를 찾을 수 없습니다.');
  }
};

//모든 포켓몬 삭제하기
const deleteAllPokemon = async (): Promise<void> => {
  try {
    await fs.writeFile(pokemonDataFilePath, JSON.stringify([]), 'utf8');
    console.log('모든 포켓몬 삭제 완료!');
  } catch (error) {
    throw new Error('포켓몬 데이터를 찾을 수 없습니다.');
  }
};

// 하나의 포켓몬 삭제하기
const deleteOnePokemon = async (number: number): Promise<void> => {
  try {
    let pokemonList = await getPokemons();
    const filterdPokemon = pokemonList.filter(p => p.number !== number);
    if (!filterdPokemon) {
      throw new Error('포켓몬을 찾을 수 없습니다.');
    }
    await fs.writeFile(pokemonDataFilePath, JSON.stringify(filterdPokemon), 'utf8');
    console.log(`${number} 번 포켓몬이 삭제되었습니다.`);
  } catch (error) {
    throw new Error('포켓몬을 찾는데 실패 했습니다.');
  }
};

export default { getPokemons, getOnePokemon, createPokemon, updatedPokemon, deleteAllPokemon, deleteOnePokemon };
