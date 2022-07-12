import { Router } from "express";
import { promissePresentes } from "../controllers/funcionarios.controller";

const funcionariosRoutes = Router();

funcionariosRoutes.get("/getFuncsPresentes", (req, res) => {
  return res.json(promissePresentes.data);
});

funcionariosRoutes.get("/getFuncsPresentes/:nome", (req, res) => {
  const { nome } = req.params;
  let encontrei = 0;
  for (var j = 0; j < promissePresentes.data.items.length; ++j) {
    if (promissePresentes.data.items[j].nome.match(nome)) {
      encontrei = 1;
      return res.json({ nome: promissePresentes.data.items[j].nome });
    }
  }

  if (encontrei == 0) {
    return res.status(404).send("Usuario não encontrado");
  }
});

export { funcionariosRoutes };
