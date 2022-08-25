import { Router } from "express";
import { UserDataController } from "../controllers/user-data.controller";

const router = Router();
const userDataController = new UserDataController();

router.get("/", userDataController.getUserDetails);
router.post("/", userDataController.createUserDetails);
router.put("/:id", userDataController.updateUserDetails);
router.delete("/:id", userDataController.deleteUserDetails);

export default router;
