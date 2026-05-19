const providermodel = require("../models/provider.model")
const leadmodel = require("../models/lead.model")
const Assignment = require("../models/assign.model")
const mandatoryMap = {
  "Service 1": ["Provider 1"],
  "Service 2": ["Provider 5"],
  "Service 3": ["Provider 1", "Provider 4"]
}

async function postquery(req, res) {
  try {

    const { name, phone, city, service, description } = req.body

    const check = await leadmodel.findOne({ phone, service })
    if (check) {
      return res.status(409).json({
        message: "Lead already exists for this service"
      })
    }

    // STEP 1: get mandatory providers
    let mandatoryProviders = await providermodel.find({
      providerName: { $in: mandatoryMap[service] || [] },
      leadsAssignedCount: { $lt: 10 }
    })

    // STEP 2: get extra providers if needed
    let extraProviders = await providermodel.find({
      leadsAssignedCount: { $lt: 10 },
      providerName: { $nin: mandatoryMap[service] || [] }
    }).sort({ leadsAssignedCount: 1 })

    // STEP 3: combine
    let finalProviders = [...mandatoryProviders, ...extraProviders].slice(0, 3)

    if (finalProviders.length < 3) {
      return res.status(404).json({
        message: "Not enough providers available"
      })
    }

    // STEP 4: create lead
    const lead = await leadmodel.create({
      name,
      phone,
      city,
      service,
      description
    })

    // STEP 5: assignments + update count
    for (let p of finalProviders) {
      await Assignment.create({
        leadId: lead._id,
        providerId: p._id
      })

      await providermodel.findByIdAndUpdate(p._id, {
        $inc: { leadsAssignedCount: 1 }
      })
    }

    res.status(200).json({
      message: "Query submitted successfully",
      lead
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

async function totallead(req, res) {
  try {

    const total = await leadmodel.find()

    res.status(200).json({
      total
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}
module.exports = {
  postquery ,
  totallead
}