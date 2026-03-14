const express = require("express");
const router = express.Router();

const auth = require("../../middleware/authMiddleware");

const { registerSpring, submitWeeklyData } =
require("../../controllers/villager/springController");

const {
 getMySprings,
 getSpringDetail,
 getSpringHistory,
 updateSpring,
 deleteSpring
} = require("../../controllers/villager/springQueryController");

const { getAIRisk } =
require("../../controllers/villager/aiController");


// CREATE SPRING
router.post("/register", auth, registerSpring);

// WEEKLY DATA
router.post("/weekly-data", auth, submitWeeklyData);

// GET USER SPRINGS
router.get("/my-springs", auth, getMySprings);

// HISTORY
router.get("/history/:springId", auth, getSpringHistory);

// AI RISK
router.get("/ai-risk/:springId", auth, getAIRisk);

// UPDATE
router.put("/:id", auth, updateSpring);

// DELETE
router.delete("/:id", auth, deleteSpring);

// GET SPRING DETAIL (LAST)
router.get("/:id", auth, getSpringDetail);

module.exports = router;