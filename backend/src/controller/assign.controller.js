const AssignmentModel = require('../models/assign.model')
const leadmodel = require('../models/lead.model')

async function complete(req, res) {
  try {

    const id = req.params.id

    const check = await AssignmentModel.findOne({  leadId: id})
    if (!check) {
      return res.status(404).json({
        message: "no query for this lead"
      })
    }
    const lead = await leadmodel.findById(check.leadId)
    if (!lead) {
      return res.status(404).json({
        message: "lead not found"
      })
    }
    lead.iscomplete = "solve"
    await lead.save()
    return res.status(200).json({
      message: "query solved successfully"
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}
module.exports = complete