import api from "../services/api";
import { updateBrigadista } from "./brigadista.controller";
import dotenv from "dotenv";

dotenv.config();

export let promissePresentes: any;

export function requestDatasulPessoasPresentes() {
  (async () => {
    try {
      promissePresentes = await api.get("/api/esp/v1/qtdPessoasPresentes", {
        auth: {
          username: process.env.USERNAMEDATASUL || "user",
          password: process.env.PASSWORDDATASUL || "password",
        },
      });
    } catch (error) {
      console.log(error);
    }
    updateBrigadista();
    console.log("Rodei agora: " + Date());
    return promissePresentes;
  })();
}
