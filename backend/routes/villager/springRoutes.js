const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authMiddleware");
const { registerSpring, submitWeeklyData } = require("../../controllers/villager/springController");
const { 
    getMySprings, 
    getSpringDetail, 
    getSpringHistory, 
    updateSpring, 
    deleteSpring 
} = require("../../controllers/villager/springQueryController");
const { getAIRisk } = require("../../controllers/villager/aiController");

router.post("/register", auth, registerSpring);
router.post("/weekly-data", auth, submitWeeklyData);
router.get("/my-springs", auth, getMySprings);
router.get("/:id", auth, getSpringDetail);
router.get("/history/:springId", auth, getSpringHistory);
router.get("/ai-risk/:springId", auth, getAIRisk);
router.put("/:id", auth, updateSpring);
router.delete("/:id", auth, deleteSpring)

module.exports = router;