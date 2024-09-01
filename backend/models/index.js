const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('home_db', 'db_user', '6equj5_db_user', {
  host: 'localhost',  // Use 'host.docker.internal' if using Docker
  dialect: 'mysql',
  port: 3306, // or your custom MySQL Docker port
});

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Error: ' + err));

module.exports = sequelize;
