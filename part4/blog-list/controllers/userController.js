const User = require("../models/user");
const bcrypt = require("bcryptjs");

const createNew = async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || !password) {
    return response.status(400).json("username and password cannot be null");
  }

  if (password.length < 3) {
    return response
      .status(400)
      .json("password must be at least 3 characters long");
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  return response.status(201).json(savedUser);
};

const getAll = async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  return response.json(users);
};

const userSeeders = async (request, response) => {
  const initialUsers = [
    {
      username: "root",
      name: "admin",
      passwordHash: await bcrypt.hash("vezardiwaw", 10),
    },
    {
      username: "nabilfikrisp",
      name: "nabil fikri",
      passwordHash: await bcrypt.hash("vezardiwaw", 10),
    },
  ];

  User.insertMany(initialUsers);
  return response.json("succesfully seeding user table");
};

module.exports = { createNew, getAll, userSeeders };
