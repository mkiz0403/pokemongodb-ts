import { useEffect, useState } from 'react';
import { getPokemons, getOnePokemon, deleteOnePokemon, deleteAllPokemon } from '../../apiServices/pokemonDbApi';
import { PokemonInterface } from '../../models/pokemons.Interface';
import Pokemon from './Pokemon';
import MainHeader from '../../shared/component/Header/MainHeader';
import Menubar from '../../shared/component/Header/Menubar';
import './Allpokemon.css';
import CreatePokemon from './CreatePokemon';

function Allpokemon() {
  const [pokemons, setPokemons] = useState<PokemonInterface[]>([]);
  const [searchedPokemon, setSearchedPokemon] = useState<PokemonInterface | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const data = await getPokemons();
      setPokemons(data);
    } catch (error) {
      console.error('Api 데이터를 불러오는데 실패 했습니다.', error);
    }
  }

  const handleSearch = async (number: number): Promise<void> => {
    if (!number) {
      setSearchedPokemon(null);
      return;
    }

    try {
      const data = await getOnePokemon(number);
      if (data) {
        setSearchedPokemon(data);
      }
    } catch (error) {
      console.log('포켓몬 검색 실패', error);
      setSearchedPokemon(null);
    }
  };

  async function handleAllPokemonDelete() {
    try {
      await deleteAllPokemon();
      setPokemons([]);
    } catch (error) {
      console.log('포켓몬 삭제 실패', error);
    }
  }

  const handleOnePokemonDelete = async (number: number): Promise<void> => {
    try {
      console.log(number);
      await deleteOnePokemon(number);
      setPokemons(pokemons => pokemons.filter(p => p.number !== number));
    } catch (error) {
      throw new Error('포켓몬 삭제 실패');
    }
  };

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
    fetchPokemons();
  };

  return (
    <>
      <div className="form-container">
        <MainHeader />
        <Menubar
          onAllPokemonDelete={() => handleAllPokemonDelete()}
          onSearch={handleSearch}
          onOpenCreateModal={handleOpenCreateModal}
        />
        {isCreateModalOpen && <CreatePokemon onOpen={isCreateModalOpen} onClose={handleCloseCreateModal} />}
      </div>
      <div className="form-item">
        <div className="pokemons-list">
          {searchedPokemon ? (
            <Pokemon
              key={searchedPokemon.number}
              name={searchedPokemon.name}
              number={searchedPokemon.number}
              imageUrl={searchedPokemon.imageUrl}
              types={searchedPokemon.types}
              onOnePokemonDelete={handleOnePokemonDelete}
              refreshPokemons={fetchPokemons}
            />
          ) : pokemons.length > 0 ? (
            pokemons.map(p => (
              <Pokemon
                key={p.number}
                number={p.number}
                name={p.name}
                imageUrl={p.imageUrl}
                types={p.types}
                onOnePokemonDelete={() => handleOnePokemonDelete(p.number)}
                refreshPokemons={fetchPokemons}
              />
            ))
          ) : (
            <img
              style={{ display: 'flex', alignItems: 'center', zIndex: 1000, marginTop: 500 }}
              src="client/public/nonPokemon.png"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Allpokemon;
