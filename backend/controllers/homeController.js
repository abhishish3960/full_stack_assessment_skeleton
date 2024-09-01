const Home = require('../models/Home');
const User = require('../models/User');
const UserHomeInterest = require('../models/UserHomeInterest');

exports.findHomesByUser = async (req, res) => {
  const { username } = req.query;
  try {
    const user = await User.findOne({
      where: { username },
      include: Home
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user.Homes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUsersForHome = async (req, res) => {
  const { street_address, user_ids } = req.body;
  try {
    // Find the home by street address
    const home = await Home.findOne({ where: { street_address } });
    if (!home) return res.status(404).json({ error: 'Home not found' });

    // Find users by their usernames
    const users = await User.findAll({ where: { username: user_ids } });

    // If any usernames are invalid, handle the error
    if (users.length !== user_ids.length) {
      return res.status(400).json({ error: 'Some users were not found' });
    }

    // Update the users associated with the home
    await home.setUsers(users);

    res.json({ message: 'Users updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
