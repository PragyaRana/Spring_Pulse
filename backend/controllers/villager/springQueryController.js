const spring = require("../../models/villager/Spring");
const SpringData = require("../../models/villager/SpringData");

//used to get all the springs
exports.getMySprings = async (req, res) => {

 try {

  const springs = await spring.find({ createdBy: req.user.id });

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


// used to update spring
exports.updateSpring = async (req, res) => {

  try {

    const springId = req.params.id

    const springData = await spring.findById(springId)

    if (!springData) {
      return res.status(404).json({ message: "Spring not found" })
    }

    // check owner
    if (springData.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    const updatedSpring = await spring.findByIdAndUpdate(
      springId,
      req.body,
      { new: true }
    )

    res.json(updatedSpring)

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}


// used to delete spring
exports.deleteSpring = async (req, res) => {

  try {

    const springId = req.params.id

    const springData = await spring.findById(springId)

    if (!springData) {
      return res.status(404).json({ message: "Spring not found" })
    }

    if (springData.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    await spring.findByIdAndDelete(springId)

    res.json({ message: "Spring deleted successfully" })

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}