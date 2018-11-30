const express = require('express');

var app = express();

app.get('/v1/leases', (req, res) => {
	res.send({
		tenants: [
			{ id: 1, name: 'Zoe' },
			{ id: 2, name: 'Andres' },
			{ id: 3, name: 'Pia' }
		]
	});
});

//Generate random dates
function randomDate(start, end) {
	var date = new Date(+start + Math.random() * (end - start));
	return date;
}
//Within the below range
var startRange = new Date(2018, 06, 01);
var endRange = new Date(2019, 01, 20);

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
	return paymentFrequency[Math.round(Math.random() * (800 - 500) + 500)];
}

app.get('/v1/leases/:id', (req, res) => {
	var id = req.params.id;
	res.send({ tenant: { id: id } });
});

app.listen(3000, () => console.log('Listening at port 3000'));
