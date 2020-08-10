const express = require("express");
const fs = require("fs");
const { count } = require("console");
let counter = 0;

const app = express();

function setCounter(val) {
	//set val value and save val to file
	counter = val;
	fs.writeFile("./counter.txt", counter, function (err) {
		if (err) console.log("error is saving counter value! -> " + err);
		else console.log("Saved Counter: " + counter);
	});
}

function loadCounter() {
	fs.readFile("./counter.txt", function (err, data) {
		if (err) console.log("error is loading counter! " + err);
		else {
			counter = Number(data);
			console.log("loaded counter: " + counter);
		}
	});
}

loadCounter();

app.get("/", function (request, response) {
	// this is a handler
	response.send("Hello, world!");
});

app.get("/counter", function (request, response) {
	setCounter(counter + 1);
	response.send("<h1>I've been veiwed " + counter + " times!</h1>");
});

app.listen(3000, function () {
	console.log("server runing!");
});
