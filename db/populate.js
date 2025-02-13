const { Client } = require("pg");
require("dotenv").config();
const bcryptjs = require("bcryptjs");
const { argv } = require("node:process");

const sql = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR( 255 ),
    last_name VARCHAR( 255 ),
    username VARCHAR( 255 ),
    password VARCHAR( 255 ),
    membership_status INTEGER DEFAULT 3
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR( 255 ),
    created_time TIMESTAMP,
    message VARCHAR( 255 ),
    user_id INTEGER
  );

  CREATE TABLE IF NOT EXISTS secret_codes (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    secret_code_for VARCHAR( 255 ),
    secret_code VARCHAR( 255 )
  );

  INSERT INTO secret_codes (secret_code, secret_code_for)
  VALUES ('${bcryptjs.hashSync(
    process.env.ADMIN_PASSWORD,
    10
  )}', 'admin_password'),
    ('${bcryptjs.hashSync(
      process.env.LEADER_PASSWORD,
      10
    )}', 'leader_password');

`;

async function main() {
  console.log("...seeding");
  const client = new Client({
    connectionString: argv[2],
  });
  await client.connect();
  await client.query(sql);
  await client.end();
  console.log("done");
}

main();
