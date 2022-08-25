export const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

const keyPath = path.join(__dirname, "..", "src/keys/id_rsa_priv.pem");

const PRIV_KEY = fs.readFileSync(keyPath, "utf-8");

function genPassword(password) {
  const salt = crypto.randomBytes(32).toString("hex");
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return { salt, hash: genHash };
}

function validatePassword(password, hash, salt) {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
}

function createJWT(user) {
  let id = user.id;
  const expiresIn = "1d";

  const payload = { sub: id, iat: Math.floor(Date.now() / 1000) };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn,
    algorithm: "RS256",
  });

  return {
    token: signedToken,
    expiresIn,
  };
}
module.exports = { genPassword, validatePassword, createJWT };
