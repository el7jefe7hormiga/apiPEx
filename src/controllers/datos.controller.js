import { pool } from "../db.js";

function formatDate(date = new Date()) {
  const year = date.toLocaleString('default', { year: 'numeric' });
  const month = date.toLocaleString('default', { month: '2-digit' });
  const day = date.toLocaleString('default', { day: '2-digit' });

  const hours = date.toLocaleTimeString('default', { hour: '2-digit' });
  const mins = date.toLocaleTimeString('default', { minute: '2-digit' });
  const secs = date.toLocaleTimeString('default', { second: '2-digit' });

  const fecha = [year, month, day].join('-') + ' ' + [hours, mins, secs].join(':')
  return fecha;
}



export const getAbonados = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM datos ORDER BY createdAt");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

export const getAbonado = async (req, res) => {
  try {
    const { telefono } = req.params;
    const [rows] = await pool.query("SELECT * FROM datos WHERE telefono = ?", [
      telefono,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ error: error, message: "Abonado no encontrado!" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

export const deleteAbonado = async (req, res) => {
  try {
    const { telefono } = req.params;
    const [rows] = await pool.query("DELETE FROM datos WHERE telefono = ?", [telefono]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ error: error, message: "Abonado no encontrado!" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

export const createAbonado = async (req, res) => {
  try {
    const { telefono, nombre, direccion, gps, datos_tecnicos, memo, quien, referencias } = req.body;
    const fecha = formatDate(new Date());
    const [rows] = await pool.query(
      "INSERT INTO datos (telefono, nombre, direccion, gps, datos_tecnicos, memo, quien, referencias, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [telefono, nombre, direccion, gps, datos_tecnicos, memo, quien, referencias, fecha, fecha]
    );
    res.status(201).json({ telefono, nombre, direccion, gps, datos_tecnicos, memo, quien, referencias, createdAt });
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

export const updateAbonado = async (req, res) => {
  try {
    const { telefono } = req.params;
    const { nombre, direccion, gps, datos_tecnicos, memo, quien, referencias } = req.body;
    const fecha = formatDate(new Date());
    console.log('updatedAt', fecha);
    const [result] = await pool.query(
      "UPDATE datos SET nombre = IFNULL(?, nombre), direccion = IFNULL(?, direccion), gps = IFNULL(?, gps), datos_tecnicos = IFNULL(?, datos_tecnicos), memo = IFNULL(?, memo), quien = ?, referencias = IFNULL(?, referencias), updatedAt = ? WHERE telefono = ?",
      [nombre, direccion, gps, datos_tecnicos, memo, quien, referencias, fecha, telefono]
    );

    console.log(result);

    if (result.affectedRows === 0)
      return res.status(404).json({ error: error, message: "Abonado no encontrado!" });

    const [rows] = await pool.query("SELECT * FROM datos WHERE telefono = ?", [
      telefono,
    ]);
    //console.log(rows);
    res.json(rows[0]);

  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};
