import { Router } from "express";
import { UserFamilyDataController } from "../controllers/user-family-data.controller";

const router = Router();
const userFamilyDataController = new UserFamilyDataController();
router.get("/", userFamilyDataController.getFamilyData);
router.post("/", userFamilyDataController.createFamilyData);
router.put("/", userFamilyDataController.updateFamilyData);
router.delete("/", userFamilyDataController.deleteFamilyData);

export default router;
