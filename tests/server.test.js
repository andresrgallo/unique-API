const request = require('supertest');
const expect = require('expect');

var { app } = require('../server.js');

describe('Server API', () => {
	describe('get /v1/leases url', () => {
		it('returns an object containing all tenants', done => {
			request(app)
				.get('/v1/leases')
				.expect(200)
				.expect({
					tenants: [
						{ id: 1, name: 'Zoe' },
						{ id: 2, name: 'Andres' },
						{ id: 3, name: 'Pia' }
					]
				})
				.end(done);
		});

		it('returns an object containing the Tenant with id 2 and name Andres', done => {
			request(app)
				.get('/v1/leases')
				.expect(200)
				.expect(res => {
					expect(res.body.tenants).toInclude({
						id: 2,
						name: 'Andres'
					});
				})
				.end(done);
		});

		it('returns an object containing 3 tenants', done => {
			request(app)
				.get('/v1/leases')
				.expect(200)
				.expect(res => {
					expect(res.body.tenants.length).toBe(3);
				})
				.end(done);
		});
	});
});
