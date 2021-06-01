require("dotenv").config();
const path = require("path");
require("jest-openapi")(
  path.normalize(path.join(__dirname, "./specs/si-client-proxy.yml"))
);
const axios = require("axios");

const apikey = process.env.API_KEY;
const authorization = process.env.TOKEN_CLIENT;
const basepath = "https://illiadev93-eval-test.apigee.net/sicp/api/v1";

describe("Test requests to Clients Service", () => {
  describe("PATCH requests", () => {
    describe("update client name", () => {
      let response = null;
      const requestUrl =
        basepath + "/" + "clients" + "/" + process.env.TEST_CLIENT_ID;
      const body = { name: "J. Harper Patched By Jest" };
      const options = {
        headers: { authorization: process.env.TOKEN_TEST_CLIENT, apikey }
      };

      beforeAll(async () => {
        response = await axios.patch(requestUrl, body, options);
      });

      it("should return a 200 response", () => {
        expect(response.status).toEqual(200);
      });

      it("should satisfy the OpenAPI spec", () => {
        expect(response).toSatisfyApiSpec();
      });
    }); // /{clientId}
    describe("topup client balance", () => {
      let response = null;
      const requestUrl =
        basepath +
        "/" +
        "clients" +
        "/" +
        process.env.TEST_CLIENT_ID +
        "/" +
        "balance";
      const body = { amount: 5000.789 };
      const options = {
        headers: { authorization: process.env.TOKEN_TEST_CLIENT, apikey }
      };

      beforeAll(async () => {
        response = await axios.patch(requestUrl, body, options);
      });

      it("should return a 200 response", () => {
        expect(response.status).toEqual(200);
      });

      it("should satisfy the OpenAPI spec", () => {
        expect(response).toSatisfyApiSpec();
      });
    }); // /balance
    describe("client buy package", () => {
      let response = null;
      const requestUrl =
        basepath +
        "/" +
        "clients" +
        "/" +
        process.env.TEST_CLIENT_ID +
        "/" +
        "package";
      const body = {
        name: "JEST TEST PACKAGE" + Date.now(),
        description: "JEST TEST PACKAGE",
        productIds: ["fe2aba49-45cd-4096-8150-094dfbd38258"]
      };
      const options = {
        headers: { authorization: process.env.TOKEN_TEST_CLIENT, apikey }
      };

      beforeAll(async () => {
        response = await axios.patch(requestUrl, body, options);
      });

      it("should return a 200 response", () => {
        expect(response.status).toEqual(200);
      });

      it("should satisfy the OpenAPI spec", () => {
        expect(response).toSatisfyApiSpec();
      });
    }); // /package
  }); // PATCH requests
}); // Test requests to Clients Service
