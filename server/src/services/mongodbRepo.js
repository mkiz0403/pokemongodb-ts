"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pokemon_Schma_1 = __importDefault(require("../models/pokemon.Schma"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const username = encodeURIComponent(process.env.USERNAME || '');
const password = encodeURIComponent(process.env.PASSWORD || '');
const dataBase = encodeURIComponent(process.env.DATABASE || '');
const url = `mongodb+srv://${username}:${password}@cluster0.ljagamd.mongodb.net/${dataBase}`;
const getPokemons = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield pokemon_Schma_1.default.find();
});
const getOnePokemon = (number) => __awaiter(void 0, void 0, void 0, function* () {
    return yield pokemon_Schma_1.default.findOne({ number });
});
const createPokemon = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
    const pokemon = new pokemon_Schma_1.default(data);
    return yield pokemon.save();
});
const updatedPokemon = (number, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Updating pokemon with number:', number, 'Data:', data);
        const pokemon = yield pokemon_Schma_1.default.findOneAndUpdate({ number }, data, { new: true });
        if (!pokemon) {
            console.error(`No pokemon found with number: ${number}`);
            throw new Error('일치하는 포켓몬이 없습니다.');
        }
        return pokemon;
    }
    catch (error) {
        console.error('업데이트 실패:', error);
        throw new Error('업데이트 처리 중 서버 오류 !!!!!!!!!!');
    }
});
const deleteAllPokemon = () => __awaiter(void 0, void 0, void 0, function* () {
    yield pokemon_Schma_1.default.deleteMany();
});
const deleteOnePokemon = (number) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pokemon_Schma_1.default.deleteOne({ number });
    if (result.deletedCount === 0) {
        throw new Error('일치하는 포켓몬이 없습니다.');
    }
});
exports.default = { getPokemons, getOnePokemon, createPokemon, updatedPokemon, deleteAllPokemon, deleteOnePokemon, url };
