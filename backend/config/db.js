const mongoose = require('mongoose');
const connect = async () => {
  try {
    console.log("Bağlantı kuruluyor...");
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb Bağlandı --> ${conn.connection.name}`.blue.inverse);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};


module.exports = connect;