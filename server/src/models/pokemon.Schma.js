"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const pokemonSchema = new mongoose_1.default.Schema({
    number: { type: Number, required: true, index: true },
    name: { type: String, required: true },
    types: [{ type: String, required: true }],
    imageUrl: { type: String, required: true },
});
const PokemonModel = mongoose_1.default.model('Pokemon', pokemonSchema);
exports.default = PokemonModel;
