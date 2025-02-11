const { Client } = require("pg");
require("dotenv").config();

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

  CREATE TABLE IF NOT EXISTS membership_status (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    member_ship_codes VARCHAR( 255 )
  );
`;

async function main() {
  console.log("...seeding");
  const client = new Client({
    connectionString: process.env.LOCAL_DATABASE,
  });
  await client.connect();
  await client.query(sql);
  await client.end();
  console.log("done");
}

main();
