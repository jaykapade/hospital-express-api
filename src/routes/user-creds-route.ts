import { Router } from "express";
import { UserCredentialsController } from "../controllers/user-creds-controller";

const passport = require("passport");
const router = Router();
const userCredsController = new UserCredentialsController();

router.post("/login", userCredsController.loginUser);
router.post("/register", userCredsController.registerUser);
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  userCredsController.updateUserCreds
);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  userCredsController.deleteUser
);

export default router;
