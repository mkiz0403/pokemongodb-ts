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
const mongoose_1 = __importDefault(require("mongoose"));
const mongodbRepo_1 = __importDefault(require("./services/mongodbRepo"));
const url = mongodbRepo_1.default.url;
const bootStrap = (useMongoDB) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (useMongoDB) {
            yield mongoose_1.default.connect(url);
            console.log(`MongoDB 서버에 연결되었습니다.`);
        }
        else {
            console.log(`FileSystem 서버에 연결되었습니다.`);
        }
    }
    catch (error) {
        console.log(`서버 연결에 실패했습니다.`);
        throw new Error('서버 연결 실패');
    }
});
exports.default = bootStrap;
