require("dotenv").config();
const path = require("path");
require("jest-openapi")(
  path.normalize(path.join(__dirname, "./specs/si-client-proxy.yml"))
);
const axios = require("axios");

const apikey = process.env.API_KEY;
const authorization = process.env.TOKEN_CLIENT;
const basepath = "https://illiadev93-eval-test.apigee.net/sicp/api/v1";

describe("Clients", () => {
  describe("DELETE requests", () => {
    describe("delete client", () => {
      let response = null;
      const requestUrl =
        basepath + "/" + "clients" + "/" + process.env.TEST_CLIENT_ID;
      const options = {
        headers: { authorization: process.env.TOKEN_ADMIN, apikey }
      };

      beforeAll(async () => {
        response = await axios.delete(requestUrl, options);
      });

      it("should return a 200 response", () => {
        expect(response.status).toEqual(200);
      });

      it("should satisfy the OpenAPI spec", () => {
        expect(response).toSatisfyApiSpec();
      });
    });
  }); // DELETE requests: /{clientId}
}); // describe Clients
