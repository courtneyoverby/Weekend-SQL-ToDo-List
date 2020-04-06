const pg = require("pg");
const Pool = pg.Pool;

const pool = new Pool({
  database: "weekend-to-do-app",
  host: "localhost",
  port: 5432,
  max: 10,
  idleTimeoutMills: 30000,
});

pool.on("connect", () => {
  console.log("Pool connected! Woot!");
});

pool.on("error", (err) => {
  console.log(`There was a pool error: ${err}`);
});

module.exports = pool;
