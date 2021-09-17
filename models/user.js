const db = require("../data/config")
const { get } = require("../routers/plants")

async function add(user) {
	const [id] = await db("users").insert(user)
	return findById(id)
}

function find() {
	return db("users").select("id", "username")
}

function findBy(filter) {
	return db("users")
		.select("id", "username", "phoneNumber", "password")
		.where(filter)
}

function findById(id) {
	return db("users")
		.select("id", "username", "password", "phoneNumber")
		.where({ id })
		.first()
}

async function update(id, data) {
	await db("users").where({ id }).update(data)
	return findById(id)
}


function findPlantsForUser(userID) {
	// query intermediary table to query a many-to-many relationship;
	// then join users and plants tables;
	return db("users_plants as up")
	    // join users (condition->) where the users.id is equal to users_plants.zoo_id
		.join("users as u", "up.user_id", "u.id")
		.join("plants as p", "up.plant_id", "p.id")
		// add a 3rd join to get the species_name, where the species.id column = plants.species_id(column from animals)
		.join("species as s", "p.species_id", "s.id")
		// filter it down
		.where("u.id", userID)
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


module.exports = {
	add,
	find,
	findBy,
	findById,
	update,
	findPlantsForUser,
}