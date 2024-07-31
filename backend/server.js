const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connect = require('./config/db');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
// const propertyRoute = require('./routes/propertyRoute');

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', userRoute);
// app.use('/api/properties', propertyRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server and connect to MySQL
const startServer = async () => {
  try {
    await connect();
    console.log('MySQL bağlantısı başarılı'.white.bgBlue);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`.magenta.italic);
    });
  } catch (error) {
    console.error(`MySQL bağlantı hatası: ${error.message}`.red);
    process.exit(1);
  }
};

startServer();
