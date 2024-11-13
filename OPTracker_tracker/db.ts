import postgres from 'postgres';
import { config } from '../config.ts';
const sql = postgres({
  host: config.DATABASE_HOST,
  port: config.DATABASE_PORT,
  username: config.DATABASE_USER,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE_NAME,
});

const [{ version }] = await sql`SELECT version()`;
console.log(`PostgreSQL version: ${version}`);
export default sql;
