const dbBrigadista = require("../config/dbBrigada");
import api from "../services/apiLocal";

export async function selectBrigadistas() {
  const conn = await dbBrigadista.connect();
  const [rows] = await conn.query("SELECT * FROM brigadistas;");
  return rows;
}

export async function updateBrigadista() {
  const conn = await dbBrigadista.connect();
  const sql = "UPDATE brigadistas SET online=? WHERE online=?";
  const values = [2, 1];
  await conn.query(sql, values);

  let i = 0;
  let promissesBrigadistasPresentes: any;

  const brigadistas = await selectBrigadistas();
  for (i = 0; i < brigadistas.length; i++) {
    (async () => {
      try {
        promissesBrigadistasPresentes = await api.get(
          "/getFuncsPresentes/" + brigadistas[i].nome,
          {}
        );
        //console.log(promissesBrigadistasPresentes.data.nome);
        const conn = await dbBrigadista.connect();
        const sql = "UPDATE brigadistas SET online=? WHERE nome=?";
        const values = [1, promissesBrigadistasPresentes.data.nome];
        await conn.query(sql, values);
      } catch (error) {
        //console.log(error);
      }
    })();
  }
}
