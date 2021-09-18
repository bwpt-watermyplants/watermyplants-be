exports.seed = async function(knex) {
	await knex("species").insert([
		{ name: "Pachira aquatica" }, 
		{ name: "Ficus lyrata" }, 
		{ name: "Ficus elastica" }, 
		{ name: "Strelitzia nicolai" },
		{ name: "Dracaena marginata" }, 
		{ name: "Dracaena massangeana" }, 
		{ name: "Chamaedorea seifrizii" }, 
		{ name: "Philodendron hederaceum" },
		{ name: "Monstera deliciosa" },
		{ name: "Hypoestes phyllostachya" },
    { name: "Calathea ornata" },
	])
}