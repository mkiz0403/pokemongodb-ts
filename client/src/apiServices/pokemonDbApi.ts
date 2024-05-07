import axios from 'axios';
import { PokemonInterface } from '../models/pokemons.Interface';

const apiUrl = 'http://ec2-3-34-173-63.ap-northeast-2.compute.amazonaws.com:4000/pokemons';
const pokemonAxios = axios.create({ baseURL: apiUrl });

export async function getPokemons(): Promise<PokemonInterface[]> {
  const { data } = await pokemonAxios.get<PokemonInterface[]>('/');
  return data;
}

export async function getOnePokemon(number: number): Promise<PokemonInterface> {
  try {
    const { data } = await pokemonAxios.get<PokemonInterface>(`/${number}`);
    return data;
  } catch (error) {
    throw new Error('포켓몬을 찾을 수 없습니다.');
  }
}

export async function createPokemon(pokemon: PokemonInterface): Promise<PokemonInterface> {
  try {
    const { data } = await pokemonAxios.post<PokemonInterface>('/', pokemon);
    console.log(pokemon);
    return data;
  } catch (error) {
    throw new Error('포켓몬 등록에 실패 했습니다.');
  }
}

export async function updatePokemon(number: number, pokemon: PokemonInterface): Promise<PokemonInterface> {
  try {
    const { data } = await pokemonAxios.put<PokemonInterface>(`/${number}`, pokemon);
    return data;
  } catch (error) {
    console.error('포켓몬 수정 오류 발생', error);
    throw error;
  }
}

export async function deleteAllPokemon(): Promise<void> {
  await pokemonAxios.delete('/');
}

export async function deleteOnePokemon(number: number): Promise<void> {
  try {
    await pokemonAxios.delete(`/${number}`);
  } catch (error) {
    throw new Error('일치하는 포켓몬이 없습니다.');
  }
}
