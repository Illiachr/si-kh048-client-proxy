require("dotenv").config();
const path = require("path");
const jestOpenAPI = require("jest-openapi");
const axios = require("axios");

// eslint-disable-next-line no-undef
const openApiFilePath = path.normalize(path.join(__dirname, "./specs/si-client-proxy.yml"));

jestOpenAPI(openApiFilePath);

// eslint-disable-next-line no-undef
const apikey = process.env.API_KEY;
// eslint-disable-next-line no-undef
const authorization = process.env.TOKEN_CLIENT;
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
      const requestUrl = basepath + "/" +"clients" + "/" + id;
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
    describe("Clients List", () => {
      let response = null;  
      const requestUrl = basepath + "/" +"clients";
      const options = { 
        // eslint-disable-next-line no-undef
        headers: { authorization: process.env.TOKEN_ADMIN, apikey }
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
    }); // describe Clients List
  }); // describe GET requests
  describe("POST requests", () => {
    // eslint-disable-next-line no-undef
    if (process.env.TEST_CLIENT_ADD) {
      return;
    }
    describe("add client", () => {
      let response = null;  
      const requestUrl = basepath + "/" +"clients";
      const body = { name: "Jest Test"};
      const options = { 
        // eslint-disable-next-line no-undef
        headers: { authorization: process.env.TOKEN_TEST_CLIENT, apikey }
      };

      beforeAll(async() => {
        response = await axios.post(requestUrl, body, options);
      });
			
      it("should return a 200 response", () => {
        expect(response.status).toEqual(200);
      });
			
      it("should satisfy the OpenAPI spec", () => {
        expect(response).toSatisfyApiSpec();
      });
    });
  }); // POST request: /{clientId}
  describe("PATCH requests", () => {
    describe("update client name", () => {
      let response = null;  
      const requestUrl = basepath + "/" +"clients" + "/" + process.env.CLIENT_ID;
      const body = { name: "Jane Patched By Jest Test"};
      const options = { 
        // eslint-disable-next-line no-undef
        headers: { authorization: process.env.TOKEN_CLIENT, apikey }
      };

      beforeAll(async() => {
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
      const requestUrl = basepath + "/" +"clients" + "/" + process.env.CLIENT_ID + "/" + "balance";
      const body = { amount: 5000.789};
      const options = { 
        // eslint-disable-next-line no-undef
        headers: { authorization: process.env.TOKEN_CLIENT, apikey }
      };

      beforeAll(async() => {
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
      const requestUrl = basepath + "/" +"clients" + "/" + process.env.CLIENT_ID + "/" + "package";
      const body = {
        "name": "JEST TEST PACKAGE" + Date.now(),
        "description": "JEST TEST PACKAGE",
        "productIds": [
          "d6f2bc4d-951f-4cdd-8ea0-86544a982cf8"
        ]
      };
      const options = { 
        // eslint-disable-next-line no-undef
        headers: { authorization: process.env.TOKEN_CLIENT, apikey }
      };

      beforeAll(async() => {
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
  describe("DELETE requests", () => {
    // eslint-disable-next-line no-undef
    if (process.env.TEST_CLIENT_ADD) {
      return;
    }
    describe("delete client", () => {
      let response = null;  
      const requestUrl = basepath + "/" +"clients" + "/" + process.env.TEST_CLIENT_ID;
      const options = { 
        // eslint-disable-next-line no-undef
        headers: { authorization: process.env.TOKEN_TEST_CLIENT, apikey }
      };

      beforeAll(async() => {
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
