import express from "express";
import cors from "cors";
import { requestDatasulPessoasPresentes } from "./controllers/funcionarios.controller";
import { funcionariosRoutes } from "./routes/funcionarios.routes";
import cron from "node-cron";

requestDatasulPessoasPresentes();
cron.schedule("*/10 * * * *", () => {
  requestDatasulPessoasPresentes();
});

const app = express();

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use(funcionariosRoutes);

app.listen(3333, () => console.log("Server On"));
