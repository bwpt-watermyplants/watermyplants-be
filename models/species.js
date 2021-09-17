const db = require("../data/config")

function find() {
	return db("species")
}

function findById(id) {
	return db("species")
		.where("id", id)
		.first()
}

module.exports = {
	find,
	findById,
}