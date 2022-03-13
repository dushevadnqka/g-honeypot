require("dotenv").config();
import { createPool } from 'mysql';

const mysqlPool = createPool(process.env.MYSQL_DB_STRING);

export default mysqlPool;