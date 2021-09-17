const express = require("express")
const bcrypt = require("bcryptjs")
const User = require("../models/user")
const { restrict } = require("../middleware/users-middleware")

const router = express.Router()


router.get('/users', restrict(), async (req, res, next) => {
	try {
		const users = await User.find()
		res.json(users)
	} catch(err) {
		next(err)
	}
})

router.post('/register', async (req, res, next) => {
	try {
		const {username, password, phoneNumber} = req.body
		if(!username){return res.status(401).json({message: "Please input username"})}
		if(!password){return res.status(401).json({message: "Please input password"})}
		if(!phoneNumber || phoneNumber.length !== 10){return res.status(401).json({message: "Please input valid 10 digit phone number"})}
		const user = await User.findBy({username}).first()
		if (user){return res.status(409).json({message: "Username already taken"})}
		const newUser = await User.add({username, password: await bcrypt.hash(password, 14), phoneNumber})
		return res.status(201).json(newUser)
	} catch(err) {
		next(err)
	}
});

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body
		const user = await User.findBy({ username }).first()
		
		if (!user) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}

		// compare the plain text password from the request body,
		// to the hashed password we already have in the database
		const passwordValid = await bcrypt.compare(password, user.password)

		if (!passwordValid) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}

		// create a new session for this user
		req.session.user = user
		const token = genToken(user);
		res
			.status(200)
			.json({
			message: `Welcome ${username}`, user, token: token })
			} catch(err) 
				{ next(err)
	}
})

router.get("/users/:id", async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id) //params gives us access to everything in the URL
		if (!user) {
			return res.status(404).json({
				message: "User not found",
			})
		}

		res.json(user)
	} catch(err) {
		next(err)
	}
})

router.put("/users/:id", async (req, res, next) => {
	try {
		const user = await User.update(req.params.id, req.body)
		if (!user) {
			return res.status(404).json({
				message: "User not found",
			})
		}
		
		res.json(user)
	} catch(err) {
		next(err)
	}
})

router.get("/users/:id/plants", async (req, res, next) => {
	try {
		const plants = await User.findPlantsForUser(req.params.id)
		res.json(plants)
	} catch (err) {
		next(err)
	}
})

router.get("/logout", restrict(), async (req, res, next) => {
	try {
		req.session.destroy((err) => {
			if (err) {
				next(err)
			} else {
				res.status(204).end()
			}
		})
	} catch (err) {
		next(err)
	}
})

module.exports = router