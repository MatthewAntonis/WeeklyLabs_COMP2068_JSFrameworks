import { Router } from "express";
import {
    getFeatures,
    getFeature,
    showAddFeatureForm,
    addFeature,
    showEditFeatureForm,
    updateFeature,
    deleteFeature
} from "../controllers/FeaturesController.js";

const router = Router();

router.get("/", getFeatures);
router.get("/new", showAddFeatureForm); 
router.get("/:id", getFeature);
router.get("/:id/edit", showEditFeatureForm); 
router.post("/", addFeature);
router.put("/:id", updateFeature);
router.delete("/:id", deleteFeature);

export default router;
