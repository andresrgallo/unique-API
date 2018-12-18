const express = require('express');
require('dotenv').config();
var app = express();
const cors = require('cors');

const port = process.env.PORT;

app.use(cors({ origin: '*' }));

app.get('/v1/leases', (req, res) => {
	res.send({
		tenants: [
			{ id: 'lease_1', name: 'Zoe' },
			{ id: 'lease_2', name: 'Andres' },
			{ id: 'lease_3', name: 'Pia' }
		]
	});
});

//Generate random dates
function randomDate(start, end) {
	let date = new Date(+start + Math.random() * (end - start));
	const dd = date.getDate();
	const mm = date.getMonth() + 1;
	const yy = date.getFullYear();
	return (date = yy + '-' + mm + '-' + dd);
}
//Range dates for start of lease
var commencingStartDate = new Date(2018, 02, 01);
var commencingEndDate = new Date(2018, 04, 20);

//Range dates for end of lease
var finishStartDate = new Date(2018, 07, 01);
var finishEndDate = new Date(2019, 01, 20);
//Generate random week days
function randomDay() {
	const weekDays = [
		'monday',
		'tuesday',
		'wednesday',
		'thursday',
		'friday',
		'saturday',
		'sunday'
	];
	return weekDays[Math.round(Math.random() * 6)];
}

//Generate random frequency
function randomFrequency() {
	const paymentFrequency = ['weekly', 'fortnightly', 'monthly'];
	return paymentFrequency[Math.round(Math.random() * 2)];
}

//Generate random rent amount
function randomRent() {
	return Math.round(Math.random() * (800 - 500) + 500);
}

app.get('/lease', (req, res) => {
	res.send('hello');
});

app.get('/v1/leases/:id', (req, res) => {
	var id = req.params.id;
	res.send({
		tenant: {
			id: id,
			start_date: randomDate(commencingStartDate, commencingEndDate),
			end_date: randomDate(finishStartDate, finishEndDate),
			rent: randomRent(),
			frequency: randomFrequency(),
			payment_day: randomDay()
		}
	});
});

app.get('/favicon.ico', (req, res) => res.status(204));

app.listen(port, () => console.log(`Listening at port ${port}`));

module.exports.app = app;
