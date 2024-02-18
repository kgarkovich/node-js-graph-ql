const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

const generateToken = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
  
  return token;
};

module.exports = { generateToken };