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
    "SELECT id, username, password, first_name, last_name FROM users WHERE username = $1",
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
    "SELECT id, username, first_name, last_name, membership_status FROM users WHERE id = $1",
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
 * you want to show anonymous user if the membership_status of the user == member
 * @returns rows
 */

const readMessages = async () => {
  const { rows } = await pool.query(
    "SELECT t2.id AS message_id, t1.first_name, t1.last_name, t1.id, t1.username, t2.message, t2.title, t2.user_id, t2.created_time FROM users t1 JOIN messages t2 ON t1.id = t2.user_id"
  );
  return rows;
};
/**
 * update membership status to depending on the role if it was an admin then 1 otherwise 2
 * @param {*} param0
 */
const deleteMessage = async ({ messageId }) => {
  await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
};

const updateUserMembershipStatus = async ({
  role,
  id,
  firstName,
  lastName,
  username,
}) => {
  await pool.query(
    "UPDATE users SET membership_status = $1 WHERE id = $2 AND first_name = $3 AND last_name = $4 AND username = $5",
    [role, id, firstName, lastName, username]
  );
};

/**
 * compare secret code
 * @param {*} param0
 * @returns
 */

const getSecretCode = async ({ memberRole }) => {
  const { rows } = await pool.query(
    "SELECT * FROM secret_codes WHERE secret_code_for = $1",
    [memberRole]
  );
  return rows;
};

module.exports = {
  createUser,
  createMessage,
  findUserByUsername,
  findUserById,
  readMessages,
  deleteMessage,
  updateUserMembershipStatus,
  getSecretCode,
};
