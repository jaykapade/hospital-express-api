import { UserCredentials } from "../entity/user-creds";

const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const fs = require("fs");
const path = require("path");

const keyPath = path.join(__dirname, "..", "/keys/id_rsa_pub.pem");
export const PUB_KEY = fs.readFileSync(keyPath, "utf-8");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

const PassportSrategy = new JwtStrategy(options, function (jwt_payload, done) {
  console.log("🚀 ~ jwt_payload", jwt_payload);
  UserCredentials.findOneBy({ id: jwt_payload.sub })
    .then((user) => {
      if (user) return done(null, user);
      else return done(null, false);
    })
    .catch((err) => done(err, false));
});

export default PassportSrategy;
