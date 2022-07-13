"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const funcionarios_controller_1 = require("./controllers/funcionarios.controller");
const funcionarios_routes_1 = require("./routes/funcionarios.routes");
const node_cron_1 = __importDefault(require("node-cron"));
(0, funcionarios_controller_1.requestDatasulPessoasPresentes)();
node_cron_1.default.schedule("*/10 * * * *", () => {
    (0, funcionarios_controller_1.requestDatasulPessoasPresentes)();
});
const app = (0, express_1.default)();
app.use((req, res, next) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use((0, cors_1.default)());
    next();
});
app.use(funcionarios_routes_1.funcionariosRoutes);
app.listen(3333, () => console.log("Server On"));
