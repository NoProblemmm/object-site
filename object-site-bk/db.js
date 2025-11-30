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
      const startTime = Date.now(); // Отмечаем начало выполнения
      const res = await client.query(text, params);
      const endTime = Date.now(); // Фиксируем завершение

      console.log(`Query execution time: ${endTime - startTime}ms.`); // Показываем время выполнения
      console.log("Query result:", JSON.stringify(res)); // Печатаем полное содержимое результата
      return res.rows;
    } catch (err) {
      console.error("Database Error:", err.stack || err.message); // Подробная трассировка ошибок
      throw err;
    } finally {
      client.release();
    }
  },
};
