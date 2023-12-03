import { pool } from "../db.js";

export const index = (req, res) => res.json({ message: "Bienvenido a mi api" });

export const ping = async (req, res) => {
  const [result] = await pool.query('SELECT "PONG" as result');
  res.json(result[0].result);
};
