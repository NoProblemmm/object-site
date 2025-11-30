import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  user: `${process.env.DATA_BASE_USER}`,
  host: `${process.env.DATA_BASE_HOST}`,
  database: `${process.env.DATA_BASE_DB}`,
  password: `${process.env.DATA_BASE_PASSWORD}`,
  port: `${process.env.DATA_BASE_PORT}`,
});

export const db = {
  query: async function (text, params) {
    const client = await pool.connect();
    try {
      const res = await client.query(text, params);
      return res.rows;
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  },
};
