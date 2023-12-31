import { pool } from "../db.js";

function formatDate(fechaLocalCliente = new Date()) {

  var año = fechaLocalCliente.getFullYear();
  var mes = ('0' + (fechaLocalCliente.getMonth() + 1)).slice(-2); // Se agrega 1 porque los meses son indexados desde 0
  var dia = ('0' + fechaLocalCliente.getDate()).slice(-2);
  var horas = ('0' + fechaLocalCliente.getHours()).slice(-2);
  var minutos = ('0' + fechaLocalCliente.getMinutes()).slice(-2);
  var segundos = ('0' + fechaLocalCliente.getSeconds()).slice(-2);

  var fechaFormateada = año + '-' + mes + '-' + dia + ' ' + horas + ':' + minutos + ':' + segundos;

  console.log("FECHA DE ACTUALIZACION:", fechaLocalCliente);
  console.log('FECHA FORMATEADA:', fechaFormateada);
  return fechaFormateada;
}


export const getRedes = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM red");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

export const getRed = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM red WHERE id = ?", [id,]);

    if (rows.length <= 0) {
      return res.status(404).json({ error: error, message: "Red no encontrada!" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

export const deleteRed = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM red WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ error: error, message: "Red no encontrada!" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

export const createRed = async (req, res) => {
  try {
    const { tipo, dato, direccion, gps, descripcion } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO red (tipo, dato, direccion, gps, descripcion) VALUES (?, ?, ?, ?, ?)", [tipo, dato, direccion, gps, descripcion]);
    //res.status(201).json({ tipo, dato, direccion, gps, descripcion });
    res.status(201).json(rows)
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

export const updateRed = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo, dato, direccion, gps, descripcion } = req.body;
    const [result] = await pool.query(
      "UPDATE red SET tipo = IFNULL(?, tipo), dato = IFNULL(?, dato), direccion = IFNULL(?, direccion), gps = IFNULL(?, gps), descripcion = IFNULL(?, descripcion) WHERE id = ?",
      [tipo, dato, direccion, gps, descripcion, id]
    );

    console.log(result);

    if (result.affectedRows === 0)
      return res.status(404).json({ error: error, message: "Red no encontrado!" });

    const [rows] = await pool.query("SELECT * FROM red WHERE id = ?", [id]);
    //console.log(rows);
    res.json(rows[0]);

  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};


