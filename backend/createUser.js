const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/usermodal');

dotenv.config();

const createUser = async () => {
  await mongoose.connect(process.env.MONGO_URL);

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const user = new User({
    email: 'admin@example.com',
    password: hashedPassword,
  });

  await user.save();
  console.log(' User created:', user);
  mongoose.disconnect();
};

createUser().catch(console.error);
