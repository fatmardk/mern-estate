const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connect = require('./config/db');
const cors = require('cors');
const userRoute = require('./routes/userRoute');


dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api',userRoute)



connect().catch((error) => {
  console.error(`MongoDB bağlantı hatası: ${error.message}`.red);
  process.exit(1);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.magenta.italic);
});
