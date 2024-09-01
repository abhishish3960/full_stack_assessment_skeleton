const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');
const Home = require('./Home');

const UserHomeInterest = sequelize.define('UserHomeInterest', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    references: {
      model: User,
      key: 'username',
    },
  },
  street_address: {
    type: DataTypes.STRING(255),
    references: {
      model: Home,
      key: 'street_address',
    },
  },
}, {
  tableName: 'user_home_interest',
  timestamps: false,
});

// Define associations
User.belongsToMany(Home, { through: UserHomeInterest, foreignKey: 'username' });
Home.belongsToMany(User, { through: UserHomeInterest, foreignKey: 'street_address' });

module.exports = UserHomeInterest;
