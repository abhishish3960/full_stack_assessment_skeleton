const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING(50),
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(100),
  },
}, {
  tableName: 'user',
  timestamps: false,
});

module.exports = User;
