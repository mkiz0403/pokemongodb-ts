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
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const pokemonDataFilePath = path_1.default.join('../server', 'data', 'pokemon.json');
// 전체 포켓몬 불러오기
const getPokemons = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fs_1.promises.readFile(pokemonDataFilePath, 'utf8');
    try {
        let pokemonsList = JSON.parse(data);
        return pokemonsList;
    }
    catch (error) {
        throw new Error('데이터를 불러오는데 실패했습니다.');
    }
});
// 하나의 포켓몬 불러오기
const getOnePokemon = (number) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pokemonList = yield getPokemons();
        const onePokemon = pokemonList.find(p => p.number === number);
        console.log(onePokemon);
        return onePokemon || undefined;
    }
    catch (error) {
        throw new Error('포켓몬 데이터를 불러오지 못했습니다.');
    }
});
//포켓몬 생성하기
const createPokemon = (newPokemon) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pokemonList = yield getPokemons();
        pokemonList.push(newPokemon);
        pokemonList.sort((a, b) => a.number - b.number);
        yield fs_1.promises.writeFile(pokemonDataFilePath, JSON.stringify(pokemonList, null, 2));
        return newPokemon;
    }
    catch (error) {
        throw new Error('포켓몬을 등록하는데 실패했습니다.');
    }
});
//포켓몬 업데이트
const updatedPokemon = (number, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pokemonList = yield getPokemons();
        const pokemon = pokemonList.findIndex(p => p.number === number);
        if (pokemon === -1) {
            throw new Error('포켓몬을 찾을 수 없습니다.');
        }
        pokemonList[pokemon] = updatedData;
        yield fs_1.promises.writeFile(pokemonDataFilePath, JSON.stringify(pokemonList, null, 2), 'utf8');
        return updatedData;
    }
    catch (error) {
        throw new Error('데이터를 찾을 수 없습니다.');
    }
});
//모든 포켓몬 삭제하기
const deleteAllPokemon = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs_1.promises.writeFile(pokemonDataFilePath, JSON.stringify([]), 'utf8');
        console.log('모든 포켓몬 삭제 완료!');
    }
    catch (error) {
        throw new Error('포켓몬 데이터를 찾을 수 없습니다.');
    }
});
// 하나의 포켓몬 삭제하기
const deleteOnePokemon = (number) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pokemonList = yield getPokemons();
        const filterdPokemon = pokemonList.filter(p => p.number !== number);
        if (!filterdPokemon) {
            throw new Error('포켓몬을 찾을 수 없습니다.');
        }
        yield fs_1.promises.writeFile(pokemonDataFilePath, JSON.stringify(filterdPokemon), 'utf8');
        console.log(`${number} 번 포켓몬이 삭제되었습니다.`);
    }
    catch (error) {
        throw new Error('포켓몬을 찾는데 실패 했습니다.');
    }
});
exports.default = { getPokemons, getOnePokemon, createPokemon, updatedPokemon, deleteAllPokemon, deleteOnePokemon };
