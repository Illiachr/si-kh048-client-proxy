require("dotenv").config();
const path = require("path");
require("jest-openapi")(path.normalize(path.join(__dirname, "./specs/si-client-proxy.yml")));
const axios = require("axios");

const apikey = process.env.API_KEY;
const authorization = process.env.TOKEN_CLIENT;
const basepath = "https://illiadev93-eval-test.apigee.net/sicp/api/v1";

describe("Catalog", () => {
  const options = { 
    headers: { apikey }
  };
  describe("GET requests", () => {
    describe("Base packages: missing ApiKey", () => {
      let response = null;
      const requestUrl = basepath + "/catalog/packages/base";
			
      beforeAll(async() => {
        response = await axios.get(requestUrl);
      });
			
      it("should return a 401 response", () => {
        expect(response.status).toEqual(401);
      });
			
      it("should satisfy the OpenAPI spec", () => {
        expect(response).toSatisfyApiSpec();
      });
    }); //Base packages: missing ApiKey
    describe.skip("Products list: missing ApiKey", () => {
      let response = null;
      const requestUrl = basepath + "/catalog/products";
			
      beforeAll(async() => {
        response = await axios.get(requestUrl);
      });
			
      it("should return a 401 response", () => {
        expect(response.status).toEqual(401);
      });
			
      it("should satisfy the OpenAPI spec", () => {
        expect(response).toSatisfyApiSpec();
      });
    }); // Products list: missing ApiKey
  }); // GET requests
}); // Catalog