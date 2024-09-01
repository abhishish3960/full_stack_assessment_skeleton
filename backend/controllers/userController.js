const User = require('../models/User');
const Home = require('../models/Home');
const UserHomeInterest = require('../models/UserHomeInterest');

exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findUsersByHome = async (req, res) => {
  const { street_address } = req.query;
  try {
    const home = await Home.findOne({
      where: { street_address },
      include: User
    });
    if (!home) return res.status(404).json({ error: 'Home not found' });
    res.json(home.Users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
