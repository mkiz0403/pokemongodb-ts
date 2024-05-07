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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fileSystemRepo_1 = __importDefault(require("./services/fileSystemRepo"));
const mongodbRepo_1 = __importDefault(require("./services/mongodbRepo"));
const bootStrap_1 = __importDefault(require("./bootStrap"));
const app = (0, express_1.default)();
const port = 4000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// DB 선택 ()
const useMongoDB = true;
const pokemonRepository = useMongoDB ? mongodbRepo_1.default : fileSystemRepo_1.default;
app.get('/pokemons', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pokemons = yield pokemonRepository.getPokemons();
        pokemons.sort((a, b) => a.number - b.number);
        res.status(200).json(pokemons);
    }
    catch (error) {
        res.status(404).send('불러오기 실패');
    }
}));
app.get('/pokemons/:number', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { number } = req.params;
    try {
        const pokemon = yield pokemonRepository.getOnePokemon(Number(number));
        if (pokemon) {
            res.status(200).json(pokemon);
        }
        else {
            res.status(404).send('포켓몬을 찾을 수 없습니다.');
        }
    }
    catch (error) {
        res.status(500).send('데이터를 불러올 수 없습니다.');
    }
}));
app.post('/pokemons', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPokemon = yield pokemonRepository.createPokemon(req.body);
        res.status(200).send(newPokemon);
    }
    catch (error) {
        res.status(400).send('post에 실패했습니다.');
    }
}));
app.put('/pokemons/:number', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { number } = req.params;
    try {
        const updatedPokemon = yield pokemonRepository.updatedPokemon(Number(number), req.body);
        if (updatedPokemon) {
            console.log(updatedPokemon);
            res.status(200).json(updatedPokemon);
        }
        else {
            res.status(404).send('포켓몬을 찾을 수 없습니다.');
        }
    }
    catch (error) {
        res.status(500).send('데이터를 불러올 수 없습니다.');
    }
}));
app.delete('/pokemons', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pokemonRepository.deleteAllPokemon();
        res.status(200).send();
    }
    catch (error) {
        throw new Error('데이터를 찾을 수 없습니다.');
    }
}));
app.delete('/pokemons/:number', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { number } = req.params;
    try {
        yield pokemonRepository.deleteOnePokemon(Number(number));
        res.status(200).send();
    }
    catch (error) {
        throw new Error('데이터를 찾을 수 없습니다.');
    }
}));
(0, bootStrap_1.default)(useMongoDB).then(() => {
    app.listen(port, () => console.log(`${port}번 포트에 서버접속 완료`));
});
