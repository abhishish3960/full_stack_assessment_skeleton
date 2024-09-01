const express = require('express');
const cors = require('cors');
const sequelize = require('./models/index');
const userRoutes = require('./routes/userRoutes');
const homeRoutes = require('./routes/homeRoutes');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to match your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/user', userRoutes);
app.use('/home', homeRoutes);

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}).catch(err => {
  console.error('Failed to sync database: ', err);
});
