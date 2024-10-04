const planModel = require("../model/planModel");

const planIndex = async (req, res) => {

    const monthly = await planModel.find({ duration_type: 'monthly' });
    const yearly = await planModel.find({ duration_type: 'yearly'});
    return res.status(200).json({
        monthly: monthly,
        yearly: yearly
    });
}

module.exports = {
    planIndex
}