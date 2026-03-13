const spring = require("../../models/villager/Spring");
const SpringData = require("../../models/villager/SpringData");

//used to get all the springs
exports.getMySprings = async (req, res) => {

    try{
        const springs = await spring.find({ createdBy: req.user.id });
        if(!springs){
            return res.status(404).json({ message: "No springs found" });
        }
        res.json(springs);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//used to get spring details
exports.getSpringDetail = async (req,res) => {
    
    try {

        const springData = await spring.findById(req.params.id);

        if(!springData) {
            return res.status(404).json({ message: "Spring not found"});
        }
        const history = await SpringData.find({ springId: req.params.id }).sort({ date: -1 });

        res.json({ spring: springData, history });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
};


//used to get spring history
exports.getSpringHistory = async (req, res) => {
    try{
        const springId = req.params.springId;

        const history = await SpringData.find({ springId }).sort({ date: -1 });

        res.json(history);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};