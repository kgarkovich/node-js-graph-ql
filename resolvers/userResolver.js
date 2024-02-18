const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/auth');

const resolvers = {
  Mutation: {
    register: async (req, res) => {
        try {
          const { username, password } = req.body;
          const existingUser = await User.findOne({ username });
    
          if (existingUser) {
            return res.status(400).json({ message: 'User exists' });
          }
    
          const hashedPassword = await bcrypt.hash(password, 10);
    
          const newUser = new User({ username, password: hashedPassword });
    
          await newUser.save();
    
          const token = generateToken(newUser);
    
          res.status(201).json({ message: 'Success', token });
        } catch (error) {
          res.status(500).json({ message: 'Auth error' });
        }
      },
    login: async (req, res) => {
        try {
          const { username, password } = req.body;
          const user = await User.findOne({ username });
    
          if (!user) {
            return res.status(400).json({ message: 'No user' });
          }
    
          const validPassword = await bcrypt.compare(password, user.password);
    
          if (!validPassword) {
            return res.status(400).json({ message: 'Invalid username or password' });
          }
    
          const token = generateToken(user);
    
          res.status(200).json({ message: 'Success', token });
        } catch (error) {
          res.status(500).json({ message: 'Login error' });
        }
    },
  },
};

module.exports = resolvers;