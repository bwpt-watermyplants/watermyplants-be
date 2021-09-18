exports.seed = async function(knex) {
	await knex("plants").insert([
		{ nickname: "Money tree", water: "Water when the soil is almost completely dry at top.", species_id: 1 },
		{ nickname: "Fiddle leaf fig", water: "Keep the soil moist, but let at least 1 inch of soil dry out before watering again. During the summer it requires more frequent watering.", species_id: 2 },
		{ nickname: "Rubber plant", water: "Try watering it about 1 to 2 times a week (yellow leaves = lay off the water). Let the soil dry on top before watering. Make sure to really keep it moist during the summer, which is when it thrives.", species_id: 3 },
		{ nickname: "Giant bird of paradise", water: "Keep soil moist. In colder months, let the soil dry out more before watering.", species_id: 3 },
		{ nickname: "Madagascar dragon tree", water: "Water when soil dries out at top. Leaves will turn black if overwatered.", species_id: 4 },
		{ nickname: "Dracaena corn plant", water: "Water when soil becomes slightly dry at the top. Be sure not to overwater because the tips will turn brown.", species_id: 5 },
		{ nickname: "Bamboo palm", water: "Keep soil moist, but be sure to have drainage for the plant. It doesn’t like too much water.", species_id: 6 },
		{ nickname: "Heartleaf philodendron", water: "Keep soil moist at all times.", species_id: 1 },
		{ nickname: "Monstera", water: "Water whenever the soil starts to dry out.", species_id: 4 },
		{ nickname: "Polka dot plant", water: "Well-drained and moist soil.", species_id: 7 },
		{ nickname: "Calathea beauty star", water:"Water it weekly, and allow soil to almost completely dry between waterings.", species_id: 8 },
	])
}