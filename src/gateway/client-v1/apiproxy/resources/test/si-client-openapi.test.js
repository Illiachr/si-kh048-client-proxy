const path = require("path");
const jestOpenAPI = require("jest-openapi");
const axios = require("axios");

// eslint-disable-next-line no-undef
const openApiFilePath = path.normalize(path.join(__dirname, "./specs/si-client-proxy.yml"));

jestOpenAPI(openApiFilePath);

const apikey = "Rhb0BLsayLw7hcJpKPUbiuxGNBry7ZfY";
const authorization = "Bearer YTzGKJR4C37a6d9PJuAmMAgfmK6P";
const basepath = "https://illiadev93-eval-test.apigee.net/sicp/api/v1";

describe("Catalog", () => {
  const options = { 
    headers: { apikey }
  };
  describe("GET requests", () => {
    describe("Base packages: valid response", () => {
      let response = null;
      const requestUrl = basepath + "/catalog/packages/base";
			
      beforeAll(async() => {
        response = await axios.get(requestUrl, options);
      });
			
      it("should return a 200 response", () => {
        expect(response.status).toEqual(200);
      });
			
      it("should satisfy the OpenAPI spec", () => {
        expect(response).toSatisfyApiSpec();
      });
    }); // describe Base packages: valid response
    describe("Products list", () => {
      let response = null;
      const requestUrl = basepath + "/catalog/products";
			
      beforeAll(async() => {
        response = await axios.get(requestUrl, options);
      });
			
      it("should return a 200 response", () => {
        expect(response.status).toEqual(200);
      });
			
      it("should satisfy the OpenAPI spec", () => {
        expect(response).toSatisfyApiSpec();
      });
    }); // describe Products list
  }); // describe GET requests
}); // describe Catalog

describe("Clients", () => {
  describe("GET requests", () => {
    describe("Client by ID", () => {
      let response = null;
      const id = "ccaab0f7-3bd3-4417-8a9f-a2843f422917";      
      const requestUrl = "https://illiadev93-eval-test.apigee.net/sicp/api/v1/clients" + "/" + id;
      const options = { 
        headers: { authorization, apikey }
      };

      beforeAll(async() => {
        response = await axios.get(requestUrl, options);
      });
			
      it("should return a 200 response", () => {
        expect(response.status).toEqual(200);
      });
			
      it("should satisfy the OpenAPI spec", () => {
        expect(response).toSatisfyApiSpec();
      });
    }); // describe Client by ID
  }); // describe GET requests
}); // describe Clients