"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const funcionarios_controller_1 = require("./controllers/funcionarios.controller");
const funcionarios_routes_1 = require("./routes/funcionarios.routes");
const node_cron_1 = __importDefault(require("node-cron"));
(0, funcionarios_controller_1.requestDatasulPessoasPresentes)();
node_cron_1.default.schedule("*/10 * * * *", () => {
    (0, funcionarios_controller_1.requestDatasulPessoasPresentes)();
});
const app = (0, express_1.default)();
app.use(funcionarios_routes_1.funcionariosRoutes);
app.listen(3333, () => console.log("Server On"));
