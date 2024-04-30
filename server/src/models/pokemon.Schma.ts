import mongoose, { Document, Schema } from 'mongoose';
import PokemonInterface from './pokemons.Interface';
interface IpokemonInterface extends Document, PokemonInterface {}

const pokemonSchema: Schema = new mongoose.Schema({
  number: { type: Number, required: true, index: true },
  name: { type: String, required: true },
  types: [{ type: String, required: true }],
  imageUrl: { type: String, required: true },
});

const PokemonModel = mongoose.model<IpokemonInterface>('Pokemon', pokemonSchema);

export default PokemonModel;
