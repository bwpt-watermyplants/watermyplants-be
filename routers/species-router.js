const express = require("express")
const Species = require("../models/species")

const router = express.Router()

router.get("/species", async (req, res, next) => {
	try {
		const species = await Species.find()
		res.json(species)
	} catch(err) {
		next(err)
	}
})

router.get("/species/:id", async (req, res, next) => {
	try {
		const species = await Species.findById(req.params.id)
		if (!species) {
			return res.status(404).json({
				message: "Species not found",
			})
		}

		res.json(species)
	} catch(err) {
		next(err)
	}
})

module.exports = router