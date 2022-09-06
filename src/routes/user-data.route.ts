import { Router } from "express";
import { UserDataController } from "../controllers/user-data.controller";

const router = Router();
const userDataController = new UserDataController();

router.get("/", userDataController.getUserDetails);
router.post("/", userDataController.createUserDetails);
router.put("/", userDataController.updateUserDetails);
router.delete("/", userDataController.deleteUserDetails);

export default router;
