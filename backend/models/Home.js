const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Home = sequelize.define('Home', {
  street_address: {
    type: DataTypes.STRING(255),
    primaryKey: true,
  },
  state: {
    type: DataTypes.STRING(50),
  },
  zip: {
    type: DataTypes.STRING(10),
  },
  sqft: {
    type: DataTypes.DECIMAL(10, 2),
  },
  beds: {
    type: DataTypes.INTEGER,
  },
  baths: {
    type: DataTypes.INTEGER,
  },
  list_price: {
    type: DataTypes.DECIMAL(15, 2),
  },
}, {
  tableName: 'home',
  timestamps: false,
});

module.exports = Home;
