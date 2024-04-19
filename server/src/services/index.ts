import express from 'express';
import cors from 'cors';
import PokemonInterface from './interface';
import fileSystemRepo from './fileSystemRepo';
import mongodbRepo from './mongodbRepo';
import bootStrap from './bootStrap';

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

// DB 선택 ()
const useMongoDB = true;

const pokemonRepository = useMongoDB ? mongodbRepo : fileSystemRepo;

app.get('/pokemons', async (req, res) => {
  try {
    const pokemons = await pokemonRepository.getPokemons();
    pokemons.sort((a, b) => a.number - b.number);
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(404).send('불러오기 실패');
  }
});

app.get('/pokemons/:number', async (req, res) => {
  const { number } = req.params;
  try {
    const pokemon = await pokemonRepository.getOnePokemon(Number(number));
    if (pokemon) {
      res.status(200).json(pokemon);
    } else {
      res.status(404).send('포켓몬을 찾을 수 없습니다.');
    }
  } catch (error) {
    res.status(500).send('데이터를 불러올 수 없습니다.');
  }
});

app.post('/pokemons', async (req, res) => {
  try {
    const newPokemon = await pokemonRepository.createPokemon(req.body as PokemonInterface);
    res.status(200).send(newPokemon);
  } catch (error) {
    res.status(400).send('post에 실패했습니다.');
  }
});

app.put('/pokemons/:number', async (req, res) => {
  const { number } = req.params;
  try {
    const updatedPokemon = await pokemonRepository.updatedPokemon(Number(number), req.body as PokemonInterface);
    if (updatedPokemon) {
      console.log(updatedPokemon);
      res.status(200).json(updatedPokemon);
    } else {
      res.status(404).send('포켓몬을 찾을 수 없습니다.');
    }
  } catch (error) {
    res.status(500).send('데이터를 불러올 수 없습니다.');
  }
});

app.delete('/pokemons', async (req, res) => {
  try {
    await pokemonRepository.deleteAllPokemon();
    res.status(200).send();
  } catch (error) {
    throw new Error('데이터를 찾을 수 없습니다.');
  }
});

app.delete('/pokemons/:number', async (req, res) => {
  const { number } = req.params;
  try {
    await pokemonRepository.deleteOnePokemon(Number(number));
    res.status(200).send();
  } catch (error) {
    throw new Error('데이터를 찾을 수 없습니다.');
  }
});

bootStrap(useMongoDB).then(() => {
  app.listen(port, () => console.log(`${port}번 포트에 서버접속 완료`));
});
