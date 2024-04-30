import PokemonModel from '../models/pokemon.Schma';
import PokemonInterface from '../models/pokemons.Interface';
import dotenv from 'dotenv';

dotenv.config();

const username = encodeURIComponent(process.env.USERNAME || '');
const password = encodeURIComponent(process.env.PASSWORD || '');
const dataBase = encodeURIComponent(process.env.DATABASE || '');

const url: string = `mongodb+srv://${username}:${password}@cluster0.ljagamd.mongodb.net/${dataBase}`;

const getPokemons = async (): Promise<PokemonInterface[]> => {
  return await PokemonModel.find();
};

const getOnePokemon = async (number: number): Promise<PokemonInterface | null> => {
  return await PokemonModel.findOne({ number });
};

const createPokemon = async (data: PokemonInterface): Promise<PokemonInterface> => {
  console.log(data);
  const pokemon = new PokemonModel(data);
  return await pokemon.save();
};

const updatedPokemon = async (number: number, data: PokemonInterface): Promise<PokemonInterface | null> => {
  try {
    console.log('Updating pokemon with number:', number, 'Data:', data);
    const pokemon = await PokemonModel.findOneAndUpdate({ number }, data, { new: true });
    if (!pokemon) {
      console.error(`No pokemon found with number: ${number}`);
      throw new Error('일치하는 포켓몬이 없습니다.');
    }
    return pokemon;
  } catch (error) {
    console.error('업데이트 실패:', error);
    throw new Error('업데이트 처리 중 서버 오류 !!!!!!!!!!');
  }
};

const deleteAllPokemon = async (): Promise<void> => {
  await PokemonModel.deleteMany();
};

const deleteOnePokemon = async (number: number): Promise<void> => {
  const result = await PokemonModel.deleteOne({ number });
  if (result.deletedCount === 0) {
    throw new Error('일치하는 포켓몬이 없습니다.');
  }
};

export default { getPokemons, getOnePokemon, createPokemon, updatedPokemon, deleteAllPokemon, deleteOnePokemon, url };
