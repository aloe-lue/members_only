const pool = require("./pool");
/**
 * add user into your db
 * @param {*} param0
 */
const createUser = async ({ firstName, lastName, username, password }) => {
  await pool.query(
    "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
    [firstName, lastName, username, password]
  );
};

/**
 * use this function when trying to find existing username
 * @param {*} param0
 * @returns rows
 */
const findUserByUsername = async ({ username }) => {
  const { rows } = await pool.query(
    "SELECT id, username, password FROM users WHERE username = $1",
    [username]
  );
  return rows;
};

/**
 * use this when deserializing
 * @param {*} param0
 * @returns []
 */

const findUserById = async ({ id }) => {
  const { rows } = await pool.query(
    "SELECT id, username, password FROM users WHERE id = $1",
    [id]
  );
  return rows;
};
/**
 * client should be able to create message
 * @param {*} param0
 *
 */

const createMessage = async ({ title, message, createdTime, userId }) => {
  await pool.query(
    "INSERT INTO messages (title, message, created_time, user_id) VALUES ($1, $2, $3, $4)",
    [title, message, createdTime, userId]
  );
};
/**
 * display all messages that the user has created
 * @returns rows
 */
const readMessages = async () => {
  const { rows } = await pool.query(
    "SELECT msg.message, msg.title, msg.create_time, msg.user_id FROM messages msg JOIN users usrs ON msg.user_id = usrs.id"
  );
  return rows;
};

module.exports = {
  createUser,
  createMessage,
  findUserByUsername,
  findUserById,
  readMessages,
};
