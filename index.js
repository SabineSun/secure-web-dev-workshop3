const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const locationController = require('./locations/locations.controller');
const userController = require('./user/user.controller');

require('dotenv').config();
const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(locationController);
app.use(userController);

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