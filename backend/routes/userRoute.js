const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/register", async (req, res) => {
  const newUser = new User(req.body);
  try {
    const user = await newUser.save();
    res.send('User Registered Successfully');
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { employeeId, password } = req.body;

  try {
    const user = await User.findOne({ employeeId, password });

    if (user) {
      const { _id, name, email, employeeId, phoneNumber } = user;
      res.json({ _id, name, email, employeeId, phoneNumber });
    } else {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/getallUsers", async (req, res) => {
  try {
      const users = await User.find()
      res.send(users);
  } catch (error) {
      return res.status(400).json({ error });
  }
});


module.exports = router;