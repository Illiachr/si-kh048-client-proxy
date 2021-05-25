const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const jestOpenAPI = require('jest-openapi');
const axios = require('axios');
const { transform } = require('../gateway/client-v1/apiproxy/resources/jsc/utils');

const openApiFilePath = path.normalize(path.join(__dirname, './specs/si-client-proxy.yml'));

jestOpenAPI(openApiFilePath);

describe('Catalog', () => {
	describe('GET requests', () => {
		describe('Base packages: valid response', () => {
			let response = null;
			const apikey = 'Rhb0BLsayLw7hcJpKPUbiuxGNBry7ZfY';
			const requestUrl = 'https://illiadev93-eval-test.apigee.net/sicp/api/v1/catalog/packages/base';
		const options = { 
				headers: { apikey }
			};
			
			beforeAll(async() => {
				response = await axios.get(requestUrl, options);
			});
			
			it('should return a 200 response', () => {
				expect(response.status).toEqual(200);
			});
			
			it('should satisfy the OpenAPI spec', () => {
				expect(response).toSatisfyApiSpec()
			})
		}); // describe Base packages: valid response
	}); // describe GET requests
}); // describe Catalog
