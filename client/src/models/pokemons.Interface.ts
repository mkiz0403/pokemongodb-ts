export interface PokemonInterface {
  key?: number;
  number: number;
  name: string;
  types: string[];
  imageUrl: string;
}

export interface PokemonsProps extends PokemonInterface {
  onOnePokemonDelete: (number: number) => Promise<void>;
  refreshPokemons: () => void;
}

export interface UpdatePokemonProps {
  refreshPokemons: () => void;
  onOpen: boolean; // Changed from a function to a boolean
  onClose: () => void; // Simple function without parameters
  pokemonData: PokemonInterface;
}

export interface CreateProps extends Pick<UpdatePokemonProps, 'onOpen' | 'onClose'> {}


export interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmButtonText: string;
}
