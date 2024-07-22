const dotenv = require("dotenv");
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");
dotenv.config();

// post request for oAuth(to handle google authorization)..
exports.oAuthService = async (req, res) => {
  // set headers to handle cors
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  //   redirect url
  const redirectUrl = "http://127.0.0.1:3000/oauth";

  //   oAuth configuration
  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET, 
    redirectUrl
  );

  //   generate url
  const authorizedUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/userinfo.profile openid",
    prompt: "consent",
  });

  res.status(200).send({ status: "success", url: authorizedUrl });
};

// get user data from google
exports.getUserData = async (access_token) => {
  // handle fetch request
  await axios
    .get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`
    )
    .then((res) => {
      // return response
      return res;
    })
    .catch((err) => console.log(err));
};

// get token and set credentials from google
exports.getToken = async (req, res) => {
  const code = req.query.code;

  try {
    // redirect url
    const redirectUrl = "http://127.0.0.1:3000/oauth";

    // oAuth configuration
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );

    // get tokens
    const { tokens } = await oAuth2Client.getToken(code);
    // set tokens
    oAuth2Client.setCredentials(tokens);
    console.log("Tokens acquired");

    // return callback response
    const userData = await this.getUserData(tokens.access_token);
    console.log("credentials", userData);
  } catch (err) {
    // handle error
    console.log(err.message);
    res.status(400).send({
      status: "failed",
      error: "Encountered an error signing in with google",
      err,
    });
  }
};


