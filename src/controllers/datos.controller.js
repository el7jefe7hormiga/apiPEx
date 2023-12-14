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
    //res.status(201).json({ telefono, nombre, direccion, gps, datos_tecnicos, memo, quien, referencias, createdAt });
    res.status(201).json(rows)
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

export const getCercanos = async (req, res) => {
  try {
    const { telefono } = req.params;
    const [rows] = await pool.query("SELECT gps FROM datos WHERE telefono = ?", [
      telefono,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ error: error, message: "Abonado no encontrado!" });
    }

    // tengo las coordenadas del telefono
    const gps = rows[0].gps;

    // si está en blanco el campo ?
    if (gps == "") {
      return res.status(404).json({ message: `Cliente ${telefono} no tiene registradas sus coordenadas GPS.` })
    }

    const userLatitude = gps.substring(0, gps.indexOf(","))
    const userLongitude = gps.substring(gps.indexOf(",") + 1)
    const distanciaMaxima = 100 // distancia max entre los puntos, en metros
    console.log('GPS', 'LATITUD', 'LONGITUD')
    console.log(gps, userLatitude, userLongitude)

    const sqlQuery = `
      SELECT 
          *, 
          ROUND(6371000 * ACOS(
          COS(RADIANS(${userLatitude})) * COS(RADIANS(SUBSTRING_INDEX(gps, ',', 1))) * COS(RADIANS(SUBSTRING_INDEX(gps, ',', -1)) - RADIANS(${userLongitude})) +
          SIN(RADIANS(${userLatitude})) * SIN(RADIANS(SUBSTRING_INDEX(gps, ',', 1)))
          ), 2) AS distancia
      FROM datos
      WHERE 
        6371000 * ACOS(
          COS(RADIANS(${userLatitude})) * COS(RADIANS(SUBSTRING_INDEX(gps, ',', 1))) * COS(RADIANS(SUBSTRING_INDEX(gps, ',', -1)) - RADIANS(${userLongitude})) +
          SIN(RADIANS(${userLatitude})) * SIN(RADIANS(SUBSTRING_INDEX(gps, ',', 1)))
        ) <= ${distanciaMaxima};
    `;
    console.log(sqlQuery)

    const [cercanos] = await pool.query(sqlQuery);
    if (cercanos.length <= 0) {
      return res.status(404).json({ error: error, message: "No hay clientes cercanos al " + telefono });
    }

    res.json(cercanos);

  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :( al buscar telefonos cercanos" });
  }
};
