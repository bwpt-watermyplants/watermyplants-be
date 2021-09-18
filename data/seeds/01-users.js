exports.seed = async function(knex) {
	await knex("users").insert([   
		{ username: "Jane", phoneNumber: "3052256717", password: "testPw1" },
		{ username: "John", phoneNumber: "3053311242", password: "testPw2" },
	])
}