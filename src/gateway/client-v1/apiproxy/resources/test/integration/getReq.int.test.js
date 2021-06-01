require("dotenv").config();
const path = require("path");
require("jest-openapi")(
  path.normalize(path.join(__dirname, "./specs/si-client-proxy.yml"))
);
const axios = require("axios");

const apikey = process.env.API_KEY;
const authorization = process.env.TOKEN_CLIENT;
const basepath = "https://illiadev93-eval-test.apigee.net/sicp/api/v1";

describe("Test requests to Catalog Service", () => {
  const options = {
    headers: { apikey }
  };
  describe("GET requests", () => {
    describe.skip("Base packages: valid response", () => {
      let response = null;
      const requestUrl = basepath + "/catalog/packages/base";

      beforeAll(async () => {
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

      beforeAll(async () => {
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
}); // Test requests to Catalog Service

describe("Clients", () => {
  describe("GET requests", () => {
    describe("Client by ID", () => {
      let response = null;
      const id = "ccaab0f7-3bd3-4417-8a9f-a2843f422917";
      const requestUrl =
        basepath + "/" + "clients" + "/" + process.env.TEST_CLIENT_ID;
      const options = {
        headers: { authorization: process.env.TOKEN_TEST_CLIENT, apikey }
      };

      beforeAll(async () => {
        response = await axios.get(requestUrl, options);
      });

      it("should return a 200 response", () => {
        expect(response.status).toEqual(200);
      });

      it("should satisfy the OpenAPI spec", () => {
        expect(response).toSatisfyApiSpec();
      });
    }); // describe Client by ID
    describe("Clients List", () => {
      let response = null;
      const requestUrl = basepath + "/" + "clients";
      const options = {
        // eslint-disable-next-line no-undef
        headers: { authorization: process.env.TOKEN_ADMIN, apikey }
      };

      beforeAll(async () => {
        response = await axios.get(requestUrl, options);
      });

      it("should return a 200 response", () => {
        expect(response.status).toEqual(200);
      });

      it("should satisfy the OpenAPI spec", () => {
        expect(response).toSatisfyApiSpec();
      });
    }); // describe Clients List
  }); // describe GET requests
}); // describe Clients
