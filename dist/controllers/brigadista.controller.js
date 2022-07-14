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
exports.updateBrigadista = exports.selectBrigadistas = void 0;
const dbBrigadista = require("../config/dbBrigada");
const apiLocal_1 = __importDefault(require("../services/apiLocal"));
function selectBrigadistas() {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield dbBrigadista.connect();
        const [rows] = yield conn.query("SELECT * FROM brigadistas;");
        return rows;
    });
}
exports.selectBrigadistas = selectBrigadistas;
function updateBrigadista() {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield dbBrigadista.connect();
        const sql = "UPDATE brigadistas SET online=? WHERE online=?";
        const values = [2, 1];
        yield conn.query(sql, values);
        let i = 0;
        let promissesBrigadistasPresentes;
        const brigadistas = yield selectBrigadistas();
        for (i = 0; i < brigadistas.length; i++) {
            (() => __awaiter(this, void 0, void 0, function* () {
                try {
                    promissesBrigadistasPresentes = yield apiLocal_1.default.get("/getFuncsPresentes/" + brigadistas[i].nome, {});
                    //console.log(promissesBrigadistasPresentes.data.nome);
                    const conn = yield dbBrigadista.connect();
                    const sql = "UPDATE brigadistas SET online=? WHERE nome=?";
                    const values = [1, promissesBrigadistasPresentes.data.nome];
                    yield conn.query(sql, values);
                }
                catch (error) {
                    //console.log(error);
                }
            }))();
        }
    });
}
exports.updateBrigadista = updateBrigadista;
