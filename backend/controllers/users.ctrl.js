const userModel = require("../models/users.model");
const bcrypt = require("bcrypt");

// signup function... create a new user
exports.signupUser = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;

  // hashed password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Check for existing email
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .send({ status: "failed", error: "Email already exists" });
    }

    // Check for existing username
    const existingUsername = await userModel.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .send({ status: "failed", error: "Username already exists" });
    }

    // Create new user
    const newUser = new userModel({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });

    // Save new user
    await newUser.save();
    res.status(200).send({ status: "success", data: newUser });
  } catch (error) {
    // catch error if any
    res.status(400).send({ status: "failed", error: error.message });
  }
};

//login function... login a user
exports.loginUser = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({ $or: [{ email }, { username }] });

  try {
    // check if user exist
    if (!user) {
      return res
        .status(400)
        .send({ status: "failed", error: "Wrong email or password" });
    }

    // compare password if user exist
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res
        .status(400)
        .send({ status: "failed", error: "Wrong email or password" });
    }

    // send user data if user exist and the provided password is correct
    if (user && passMatch) {
      return res.status(200).send({ status: "success", data: user });
    }
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
    return res.status(200).send({ status: "success", data: users });
  } catch (error) {
    // handle error
    return res.status(400).send({ status: "failed", error: error.message });
  }
};

// get user function... get single user by id
exports.getUser = async (req, res) => {
  try {
    // get user by id
    const user = await userModel.findById(req.params.id);
    return res.status(200).send({ status: "success", data: user });
  } catch (error) {
    // handle error
    return res.status(400).send({ status: "failed", error: error.message });
    
  }
};

// delete user function... delete user by id
exports.deleteUser = async (req, res) => {
  try {
    // delete user by id
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({ status: "success", data: `user deleted` });
  } catch (error) {
    // handle error
    return res.status(400).send({ status: "failed", error: error.message });
  }
};
