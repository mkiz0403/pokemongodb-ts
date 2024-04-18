import fileSystemRepo from './fileSystemRepo' 
import {createServer} from 'http'
import cors from 'cors'
import express from 'express'
import PokemonInterface from './interface';

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());


app.get('/pokemons', async (req, res) => {
  try{
    const pokemons = await fileSystemRepo.getPokemons();
    res.status(200).json(pokemons)
  }catch(error) {
    res.status(404).send('불러오기 실패')
  }
})

app.post('/pokemons', async (req,res)=> {
  try{
    const newPokemon = await fileSystemRepo.createPokemon(req.body as PokemonInterface);
    res.status(200).send(newPokemon)
  } catch(error) {
    res.status(400).send('post에 실패했습니다.')
  }
})

app.listen(port, ()=> console.log(`${port}번 포트에 서버접속 완료`))



