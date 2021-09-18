const server = require("./server")

const port = process.env.PORT || 3000

server.get("/", (req, res) => {
	res.send("yoyo");
});

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})

return "broken" 
