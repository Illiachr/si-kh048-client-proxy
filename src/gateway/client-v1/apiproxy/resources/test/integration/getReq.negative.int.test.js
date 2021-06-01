require("dotenv").config();
const path = require("path");
require("jest-openapi")(
  path.normalize(path.join(__dirname, "../specs/si-client-proxy.yml"))
);
const axios = require("../axios");

describe("GET requests. Negative case", () => {
  const optionsApiKey = {
    headers: { apikey: process.env.API_KEY }
  };
  const optionsNoPrem = {
    headers: {
      authorization: process.env.TOKEN_CLIENT,
      apikey: process.env.API_KEY
    }
  };
  describe("Catalog Service", () => {
    describe("Base packages: missing ApiKey", () => {
      let response = null;
      const requestUrl = "/catalog/packages/base";

      beforeAll(async () => {
        response = await axios.get(requestUrl).catch((err) => err.response);
      });

      it("should return a 401 response", () => {
        expect(response.status).toEqual(401);
      });

      it("should satisfy the OpenAPI spec", () => {
        expect(response).toSatisfyApiSpec();
      });
    }); //Base packages: missing ApiKey
    describe("Products list: missing ApiKey", () => {
      let response = null;
      const requestUrl = "/catalog/products";

      beforeAll(async () => {
        response = await axios.get(requestUrl).catch((err) => err.response);
      });

      it("should return a 401 response", () => {
        expect(response.status).toEqual(401);
      });

      it("should satisfy the OpenAPI spec", () => {
        expect(response).toSatisfyApiSpec();
      });
    }); // Products list: missing ApiKey
  }); // GET requests
  describe("Clients Service", () => {
    describe("Client by ID", () => {
      describe("Missing API key: 401 Unauthorized", () => {
        let response = null;
        const urlPath = ["clients", process.env.CLIENT_ID];
        const requestUrl = urlPath.join("/");

        beforeAll(async () => {
          response = await axios.get(requestUrl).catch((err) => err.response);
        });

        it("should return a 401 response", () => {
          expect(response.status).toEqual(401);
        });

        it("should satisfy the OpenAPI spec", () => {
          expect(response).toSatisfyApiSpec();
        });
      }); // Missing API key
      describe("Missing access token: 401 Unauthorized", () => {
        let response = null;
        const urlPath = ["clients", process.env.CLIENT_ID];
        const requestUrl = urlPath.join("/");

        beforeAll(async () => {
          response = await axios
            .get(requestUrl, optionsApiKey)
            .catch((err) => err.response);
        });

        it("should return a 401 response", () => {
          expect(response.status).toEqual(401);
        });

        it("should satisfy the OpenAPI spec", () => {
          expect(response).toSatisfyApiSpec();
        });
      }); // Missing access token
      describe("No premission: 403 Forbidden", () => {
        let response = null;
        const urlPath = ["clients", process.env.TEST_CLIENT_ID];
        const requestUrl = urlPath.join("/");

        beforeAll(async () => {
          response = await axios
            .get(requestUrl, optionsNoPrem)
            .catch((err) => err.response);
        });

        it("should return a 401 response", () => {
          expect(response.status).toEqual(403);
        });

        it("should satisfy the OpenAPI spec", () => {
          expect(response).toSatisfyApiSpec();
        });
      }); // No premission
    }); // Client by ID
    describe("Clients List", () => {
      describe("Missing API key: 401 Unauthorized", () => {
        let response = null;
        beforeAll(async () => {
          response = await axios.get("/clients").catch((err) => err.response);
        });

        it("should return a 401 response", () => {
          expect(response.status).toEqual(401);
        });

        it("should satisfy the OpenAPI spec", () => {
          expect(response).toSatisfyApiSpec();
        });
      }); // Missing API key
      describe.only("Missing access token: 401 Unauthorized", () => {
        let response = null;
        beforeAll(async () => {
          response = await axios
            .get("/clients", optionsApiKey)
            .catch((err) => err.response);
        });

        it("should return a 401 response", () => {
          expect(response.status).toEqual(401);
        });

        it("should satisfy the OpenAPI spec", () => {
          expect(response).toSatisfyApiSpec();
        });
      }); // Missing access token
      describe("No premission: 403 Forbidden", () => {
        let response = null;
        beforeAll(async () => {
          response = await axios
            .get("/clients", optionsNoPrem)
            .catch((err) => err.response);
        });

        it("should return a 403 response", () => {
          expect(response.status).toEqual(403);
        });

        it("should satisfy the OpenAPI spec", () => {
          expect(response).toSatisfyApiSpec();
        });
      }); // No premission
    }); // Clients List
  }); // Catalog Service
}); // Catalog
