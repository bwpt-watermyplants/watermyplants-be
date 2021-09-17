const express = require("express")
const Plant = require("../models/plants")

const router = express.Router()

router.get("/plants", async (req, res, next) => {
	try {
		const plants = await Plant.find()
		res.json(plants)
	} catch(err) {
		next(err)
	}
})

router.get("/plants/:id", async (req, res, next) => {
	try {
		const plant = await Plant.findById(req.params.id)
		if (!plant) {
			return res.status(404).json({
				message: "Plant not found",
			})
		}

		res.json(plant)
	} catch(err) {
		next(err)
	}
})

router.post('/plants/:id', async (req, res, next) => {
	try {
		const {nickname, water} = req.body
		if(!nickname){return res.status(401).json({message: "Please input plant's nickname"})}
		if(!water){return res.status(401).json({message: "Please input plat's water frequency."})}
		const newPlant = await Plant.add({ nickname, water: await nickname, water })
		return res.status(201).json(newPlant)
	} catch(err) {
		next(err)
	}
});

router.put("/plants/:id", async (req, res, next) => {
	try {
		const plant = await Plant.update(req.params.id, req.body)
		if (!plant) {
			return res.status(404).json({
				message: "Plant not found",
			})
		}
		
		res.json(plant)
	} catch(err) {
		next(err)
	}
})

router.delete("/plants/:id", async (req, res, next) => {
	try {
		const plant = await Plant.remove(req.params.id)
		if (!plant) {
			return res.status(404).json({
				message: "Plant not found",
			})
		}

		res.status(200).json({
			message: "The plant has been deleted.",
		})
	} catch(err) {
		next(err)
	}
})

module.exports = router