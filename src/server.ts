import express from "express";
import { requestDatasulPessoasPresentes } from "./controllers/funcionarios.controller";
import { funcionariosRoutes } from "./routes/funcionarios.routes";
import cron from "node-cron";

requestDatasulPessoasPresentes();
cron.schedule("*/10 * * * *", () => {
  requestDatasulPessoasPresentes();
});

const app = express();

app.use(funcionariosRoutes);

app.listen(3333, () => console.log("Server On"));
