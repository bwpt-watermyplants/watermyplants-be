const db = require("../data/config")

async function add({ nickname, water, species_id }) {
	const [id] = await db("plants").insert({ nickname, water, species_id })
	return findById(id)
}


function find() {
	return db("plants as p")
		.join("species as s", "s.id", "p.species_id")
		.select("p.id", "p.nickname", "p.water", "s.name as species_name")
}

function findBy(filter) {
	return db("plants")
		.select("id", "nickname", "water")
		.where(filter)
}

// function findById(id) {
// 	return db("plants as p")
// 		.where("p.id", id)
// 		.join("species as s", "s.id", "p.species_id")
// 		.select("p.id", "p.nickname", "s.name as species_name", "p.water")
// }

function findById(id) {
	return db("users_plants as up")
	    // join users (condition->) where the users.id is equal to users_plants.zoo_id
		.join("users as u", "up.user_id", "u.id")
		.join("plants as p", "up.plant_id", "p.id")
		// add a 3rd join to get the species_name, where the species.id column = plants.species_id(column from animals)
		.join("species as s", "p.species_id", "s.id")
		// filter it down
		.where("u.id", id)
		// .select("p.*")
		// be more specific, since we don't have to view the species.id now that we have access to species_name.
		.select(
			"u.id as user",
			"p.id as plant",
			"p.nickname",
			"s.name as species_name",
			"p.water",
		)
}



async function update(id, data) {
	await db("plants").where({ id }).update(data)
	return findById(id)
}


function remove(id) {
	return db("plants").where({ id }).del()
}



module.exports = {
	add,
	find,
	findBy,
	findById,
	update,
	remove,
}