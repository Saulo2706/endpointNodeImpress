"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.funcionariosRoutes = void 0;
const express_1 = require("express");
const funcionarios_controller_1 = require("../controllers/funcionarios.controller");
const funcionariosRoutes = (0, express_1.Router)();
exports.funcionariosRoutes = funcionariosRoutes;
funcionariosRoutes.get("/getFuncsPresentes", (req, res) => {
    return res.json(funcionarios_controller_1.promissePresentes.data);
});
funcionariosRoutes.get("/getFuncsPresentes/:nome", (req, res) => {
    const { nome } = req.params;
    let encontrei = 0;
    for (var j = 0; j < funcionarios_controller_1.promissePresentes.data.items.length; ++j) {
        if (funcionarios_controller_1.promissePresentes.data.items[j].nome.match(nome)) {
            encontrei = 1;
            return res.json({ nome: funcionarios_controller_1.promissePresentes.data.items[j].nome });
        }
    }
    if (encontrei == 0) {
        return res.status(404).send("Usuario não encontrado");
    }
});
