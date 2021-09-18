exports.seed = async function(knex) {
	await knex("users_plants").truncate()
	await knex("plants").truncate()
	await knex("species").truncate()
	await knex("users").truncate()
}