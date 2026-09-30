import 'dotenv/config';
import { DataSource } from 'typeorm';

const ssl = process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined;
const isTypeScriptRuntime = __filename.endsWith('.ts');
const sourceRoot = isTypeScriptRuntime ? 'src' : 'dist';
const fileExtension = isTypeScriptRuntime ? 'ts' : 'js';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl,
  entities: [`${sourceRoot}/**/*.entity.${fileExtension}`],
  migrations: [`${sourceRoot}/datasource/migrations/*.${fileExtension}`],
  synchronize: false,
});