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
exports.requestDatasulPessoasPresentes = exports.promissePresentes = void 0;
const api_1 = __importDefault(require("../services/api"));
const brigadista_controller_1 = require("./brigadista.controller");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function requestDatasulPessoasPresentes() {
    (() => __awaiter(this, void 0, void 0, function* () {
        try {
            exports.promissePresentes = yield api_1.default.get("/api/esp/v1/qtdPessoasPresentes", {
                auth: {
                    username: process.env.USERNAMEDATASUL || "user",
                    password: process.env.PASSWORDDATASUL || "password",
                },
            });
        }
        catch (error) {
            console.log(error);
        }
        (0, brigadista_controller_1.updateBrigadista)();
        console.log("Rodei agora: " + Date());
        return exports.promissePresentes;
    }))();
}
exports.requestDatasulPessoasPresentes = requestDatasulPessoasPresentes;
