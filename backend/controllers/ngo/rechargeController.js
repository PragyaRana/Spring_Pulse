const RechargeWork = require("../../models/ngo/RechargeWork");


// Add recharge work
exports.addRechargeWork = async (req, res) => {

  try {

    const { springId, workType, description } = req.body;

    const work = await RechargeWork.create({

      springId,
      ngoId: req.user.id,
      workType,
      description

    });

    res.json({
      message: "Recharge work added",
      work
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


// Update work status
exports.updateWorkStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const work = await RechargeWork.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(work);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};