import mongoose, { Document, Schema } from 'mongoose';
import PokemonInterface from '../src/services/interface';

interface IpokemonInterface extends Document, PokemonInterface {}

const pokemonSchema: Schema = new Schema({
  number: { type: Number, required: true },
  name: { type: String, required: true },
  types: { type: String, required: true },
  imgeUrl: { type: String, required: true },
});

const PokemonModel = mongoose.model<IpokemonInterface>('Pokemon', pokemonSchema);

export default PokemonModel;
