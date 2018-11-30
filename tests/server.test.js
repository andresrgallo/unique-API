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
	describe('get /v1/leases/1 url', () => {
		it('returns an object containing one tenant with and id equal to 1', done => {
			request(app)
				.get('/v1/leases/1')
				.expect(200)
				.expect(res => {
					expect(res.body.tenant.id).toInclude('1');
				})
				.end(done);
		});

		it('returns an object containing one tenant with 6 properties', done => {
			request(app)
				.get('/v1/leases/1')
				.expect(200)
				.expect(res => {
					let { tenant } = res.body;
					let tenantLength = Object.keys(tenant).length;
					expect(tenantLength).toEqual(6);
				})
				.end(done);
		});

		it('returns an object containing a property name rent that is a number', done => {
			request(app)
				.get('/v1/leases/1')
				.expect(200)
				.expect(res => {
					expect(res.body.tenant.rent).toBeA('number');
				})
				.end(done);
		});
	});
});
