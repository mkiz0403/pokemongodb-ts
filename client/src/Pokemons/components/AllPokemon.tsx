import { useEffect, useState } from 'react';
import { getPokemons, deleteOnePokemon } from '../../apiServices/pokemonDbApi';
import { PokemonInterface } from '../../models/pokemons.Interface';
import Pokemon from './Pokemon';
import './Allpokemon.css';

export default function Allpokemon() {
  const [pokemons, setPokemons] = useState<PokemonInterface[]>([]);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const data = await getPokemons();
        setPokemons(data);
      } catch (error) {
        console.error('Api 데이터를 불러오는데 실패 했습니다.', error);
      }
    }

    fetchPokemons();
  }, []);

  async function handleOnePokemonDelete(number) {
    try {
      await deleteOnePokemon(number);
      setPokemons(pokemons.filter(p => p.number !== number));
    } catch (error) {
      throw new Error('포켓몬 삭제 실패');
    }
  }

  return (
    <div className="form-item">
      <div>
        {pokemons.length > 0 ? (
          <div className="pokemons-list">
            {pokemons.map(p => (
              <Pokemon
                key={p.number}
                number={p.number}
                name={p.name}
                imageUrl={p.imageUrl}
                types={p.types}
                onDelete={() => handleOnePokemonDelete(p.number)}
              />
            ))}
          </div>
        ) : (
          <p>포켓몬 데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
