const mongoose = require("mongoose")
const ProviderModel = require("../models/provider.model")

async function connectdb() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("DB Connected")

    await seedProviders()   // run after DB connect

  } catch (error) {
    console.log(error)
  }
}

async function seedProviders() {
  try {
    const count = await ProviderModel.countDocuments()

    if (count > 0) {
      console.log("Providers already exist, skipping seed")
      return
    }

    const providers = [
      { providerNumber: 1, providerName: "Provider 1", monthlyQuota: 10, leadsAssignedCount: 0 },
      { providerNumber: 2, providerName: "Provider 2", monthlyQuota: 10, leadsAssignedCount: 0 },
      { providerNumber: 3, providerName: "Provider 3", monthlyQuota: 10, leadsAssignedCount: 0 },
      { providerNumber: 4, providerName: "Provider 4", monthlyQuota: 10, leadsAssignedCount: 0 },
      { providerNumber: 5, providerName: "Provider 5", monthlyQuota: 10, leadsAssignedCount: 0 },
      { providerNumber: 6, providerName: "Provider 6", monthlyQuota: 10, leadsAssignedCount: 0 },
      { providerNumber: 7, providerName: "Provider 7", monthlyQuota: 10, leadsAssignedCount: 0 },
      { providerNumber: 8, providerName: "Provider 8", monthlyQuota: 10, leadsAssignedCount: 0 }
    ]

    await ProviderModel.insertMany(providers)

    console.log("Providers Seeded Successfully")

  } catch (error) {
    console.log(error)
  }
}

module.exports = connectdb