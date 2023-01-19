const express = require('express')
const locationController = require('./locations/locations.controller')
const mongoose = require('mongoose');
require('dotenv').config();

const app = express()
const port = 3000

// Middleware



// Routes

app.use(locationController)

app.get('/', (req, res) => {
	return res.status(200).send({
		message:"Hello World",

	});
})

function main(){
	mongoose.connect(process.env.MONGO_URI).then((success) => {
		console.log("Connection is successfull");
	app.listen(port, () => {
		console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
	})
	})
}

main();