require("dotenv").config();
const path = require("path");
require("jest-openapi")(path.normalize(path.join(__dirname, "./specs/si-client-proxy.yml")));
const axios = require("axios");

const apikey = process.env.API_KEY;
const authorization = process.env.TOKEN_CLIENT;
const basepath = "https://illiadev93-eval-test.apigee.net/sicp/api/v1";


describe("Clients", () => {
  describe("POST requests", () => {
    describe("add client", () => {
      let response = null;
      const requestUrl = basepath + "/" + "clients";
      const body = { name: "Jest Test" };
      const options = {
        headers: { authorization: process.env.TOKEN_TEST_CLIENT, apikey }
      };

      beforeAll(async () => {
        response = await axios.post(requestUrl, body, options);
      });

      it("should return a 201 response", () => {
        expect(response.status).toEqual(201);
      });

      it("should satisfy the OpenAPI spec", () => {
        expect(response).toSatisfyApiSpec();
      });
    });
  }); // POST request: /{clientId}
};); // describe Clients
