const leadmodel = require('../models/lead.model')

async function dashboard(req, res) {
  try {

    const solve = await leadmodel.find({ iscomplete: "completed" })
    const pending = await leadmodel.find({ iscomplete: "pending" })

    res.status(200).json({
      solve,
      pending
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = dashboard