const userModel = require("../models/users.model");
const bcrypt = require("bcrypt");

// signup function... create a new user
exports.signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  // hashed password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    // check for existing email
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      res.status(400).send({ status: "failed", error: "Email has been taken" });
    } else {
      // add new user if no existing email
      await newUser.save();
      res.status(200).send({ status: "success", data: newUser });
    }
  } catch (error) {
    // catch error if any
    res.status(400).send({ status: "failed", error: error.message });
  }
};

//login function... login a user
exports.loginUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userModel.findOne({ $or: [{ email }, { name }] });

  try {
    // check if user exist
    if (!user)
      res
        .status(400)
        .send({ status: "failed", error: "Wrong email or password" });

    // compare password if user exist
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch)
      res
        .status(400)
        .send({ status: "failed", error: "Wrong email or password" });

    // send user data if user exist and the provided password is correct
    if (user && passMatch)
      res.status(200).send({ status: "success", data: user });
  } catch (error) {
    // handle error
    res.status(400).send({ status: "failed", error: error.message });
  }
};

// get users function... get all users
exports.getUsers = async (req, res) => {
  try {
    // gett all users
    const users = await userModel.find();
    res.status(200).send({ status: "success", data: users });
  } catch (error) {
    // handle error
    res.status(400).send({ status: "failed", error: error.message });
  }
};

// get user function... get single user by id
exports.getUser = async (req, res) => {
  try {
    // get user by id
    const user = await userModel.findById(req.params.id);
    res.status(200).send({ status: "success", data: user });
  } catch (error) {
    // handle error
    res.status(400).send({ status: "failed", error: error.message });
  }
};

// delete user function... delete user by id
exports.deleteUser = async (req, res) => {
  try {
    // delete user by id
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ status: "success", data: `user deleted` });
  } catch (error) {
    // handle error
    res.status(400).send({ status: "failed", error: error.message });
  }
};
