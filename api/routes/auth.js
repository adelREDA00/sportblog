const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


//REGISTER
router.post("/register", async (req, res) => {
  try {
    //encrypte the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const user = await newUser.save();
    res.status(200).json(user);

  } catch (err) {
    res.status(500).json(err);
  }
});


//LOGIN
router.post("/login", async (req, res) => {
    try {
      //getting the user by name
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(400).json("Wrong credentials!");
      }
  
      //comparing the user pw
      const validated = await bcrypt.compare(req.body.password, user.password);
      if (!validated) {
        return res.status(400).json("Wrong credentials!");
      }
  
      //returning the user exept the pw
      const { password, ...others } = user._doc;
      return res.status(200).json(others);
    } catch (err) {
      return res.status(500).json(err);
    }
  });

module.exports = router;