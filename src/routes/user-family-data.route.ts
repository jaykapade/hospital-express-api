import { Router } from "express";
import { UserFamilyDataController } from "../controllers/user-family-data.controller";

const router = Router();
const userFamilyDataController = new UserFamilyDataController();
router.get("/", userFamilyDataController.getFamilyData);
router.post("/", userFamilyDataController.createFamilyData);
router.put("/:id", userFamilyDataController.updateFamilyData);
router.delete("/:id", userFamilyDataController.deleteFamilyData);

export default router;
