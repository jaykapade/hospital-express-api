import { Router } from "express";
import userData from "./user-data.route";
import userFamilyData from "./user-family-data.route";
import userAuth from "./user-creds-route";
import { GetUserAuthInfoRequest } from "../interface/get-user-auth";

const passport = require("passport");

const routes = Router();

routes.use("/auth", userAuth);
routes.use("/user", passport.authenticate("jwt", { session: false }), userData);
routes.use(
  "/family",
  passport.authenticate("jwt", { session: false }),
  userFamilyData
);

routes.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req: GetUserAuthInfoRequest, res) => {
    res.json({ message: "Passport jwt verification is working" });
  }
);

export default routes;
