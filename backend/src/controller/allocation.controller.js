const ProviderModel = require("../models/provider.model")

async function getdetail(req, res) {
  try {
    const providers = await ProviderModel
      .find({
        leadsAssignedCount: { $lt: 10 }
      })
      .sort({
        leadsAssignedCount: 1
      })

    res.status(200).json({
      providers
    })
  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = getdetail