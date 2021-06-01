require("dotenv").config();
const path = require("path");
require("jest-openapi")(
  path.normalize(path.join(__dirname, "../specs/si-client-proxy.yml"))
);
const axios = require("axios");

const apikey = process.env.API_KEY;
const authorization = process.env.TOKEN_CLIENT;
const basepath = process.env.BASE_PATH;

describe("GET requests. Positive case", () => {
  describe("Catalog Service", () => {
    const entity = "catalog";
    const options = {
      headers: { apikey }
    };
    describe("Base packages", () => {
      let response = null;
      const urlPath = [basepath, entity, "packages", "base"];
      const requestUrl = urlPath.join("/");

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
      const urlPath = [basepath, entity, "products"];
      const requestUrl = urlPath.join("/");

      beforeAll(async () => {
        response = await axios.get(requestUrl, options);
      });

      it("should return a 200 response", () => {
        expect(response.status).toEqual(200);
      });

      it("should satisfy the OpenAPI spec", () => {
        expect(response).toSatisfyApiSpec();
      });
    }); // Products list
  }); // Catalog Service
  describe("Clients Service", () => {
    describe("Client by ID", () => {
      let response = null;
      const urlPath = [basepath, "clients", process.env.CLIENT_ID];
      const requestUrl = urlPath.join("/");
      const options = {
        headers: { authorization, apikey }
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
    }); // Client by ID
    describe("Positive behavior: Clients List", () => {
      let response = null;
      const urlPath = [basepath, "clients"];
      const requestUrl = urlPath.join("/");
      const options = {
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
    }); // Clients List
  }); // Clients Service
}); // GET requests
