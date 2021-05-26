require("dotenv").config();
const path = require("path");
const jestOpenAPI = require("jest-openapi");
const { transform } = require("../jsc/utils");

// eslint-disable-next-line no-undef
const openApiFilePath = path.normalize(path.join(__dirname, "./specs/si-client-proxy.yml"));

jestOpenAPI(openApiFilePath);

let envCtx = {};

beforeEach(() => {
  envCtx = {
    reqScheme: "https",
    proxyHost: "illiadev93-eval-test.apigee.net",
    basepath: "/sicp/api/v1"
  };
});

describe("transform response: catalog - base packages", () => {
  it("should satisfy schema in spec", () => {
    
    const entity = "catalog";
    envCtx.pathsuffix = "/catalog/packages/base";
    const { BASE_PACKAGES: input } = require("./mock/response");

    expect(transform(entity, input, envCtx).data[0]).toSatisfySchemaInApiSpec("Package");
  });
});

describe("transform response: catalog - products", () => {
  it("should satisfy schema in spec", () => {
    
    const entity = "catalog";
    envCtx.pathsuffix = "/catalog/products";
    const { PRODUCTS: input } = require("./mock/response");

    expect(transform(entity, input, envCtx).data[0]).toSatisfySchemaInApiSpec("Product");
  });
});

describe("transform response: GET client by ID", () => {
  it("should satisfy schema in spec", () => {
    
    const entity = "clients";
    envCtx.reqVerb = "GET";
    envCtx.itemId = process.env.CLIENT_ID;
    envCtx.pathsuffix = "/clients" + "/" + envCtx.itemId;
    const { CLIENT: input } = require("./mock/response");
    expect(transform(entity, input, envCtx).data).toSatisfySchemaInApiSpec("Client");
  });
});

describe("transform response: GET client info", () => {
  it("should satisfy schema in spec", () => {
    
    const entity = "clients";
    envCtx.reqVerb = "GET";
    envCtx.itemId = process.env.CLIENT_ID;
    envCtx.pathsuffix = "/"+ entity + "/" + envCtx.itemId + "/" + "info";
    const { CLIENT_INFO: input } = require("./mock/response");
    expect(transform(entity, input, envCtx).data).toSatisfySchemaInApiSpec("ClientInfo");
  });
});

describe("transform response: GET /clients", () => {
  it("should satisfy schema in spec", () => {
    
    const entity = "clients";
    envCtx.reqVerb = "GET";
    envCtx.pathsuffix = "/clients";
    const { CLIENTS_LIST: input } = require("./mock/response");

    expect(transform(entity, input, envCtx)).toSatisfySchemaInApiSpec("Client");
  });
});

// POST request: /{clientId}
describe("transform response: POST /clients", () => {
  it("should satisfy schema in spec", () => {
    
    const entity = "clients";
    envCtx.reqVerb = "POST";
    envCtx.pathsuffix = "/clients";

    const input = {};

    expect(transform(entity, input, envCtx).links).toSatisfySchemaInApiSpec("SelfLink");
  });
});
// PATCH request: /{clientId}
describe("transform response: PATCH /clients/:id", () => {
  it("should satisfy schema in spec", () => {
    
    const entity = "clients";
    envCtx.reqVerb = "PATCH";
    envCtx.itemId = process.env.CLIENT_ID;
    envCtx.pathsuffix = "/clients" + "/" + envCtx.itemId;

    const input = { message: "name updated successfully"};

    expect(transform(entity, input, envCtx).data).toSatisfySchemaInApiSpec("PatchResponseData");
    expect(transform(entity, input, envCtx).links).toSatisfySchemaInApiSpec("SelfLink");
  });
});
// PATCH request: /balance
describe("transform response: PATCH /clients/:id/balance", () => {
  it("should satisfy schema in spec", () => {
    
    const entity = "clients";
    envCtx.reqVerb = "PATCH";
    envCtx.itemId = process.env.CLIENT_ID;
    envCtx.pathsuffix = "/clients" + "/" + envCtx.itemId + "/" + "balance";

    const input = { amount: 1648.56 };

    expect(transform(entity, input, envCtx).data).toSatisfySchemaInApiSpec("PatchResponseData");
    expect(transform(entity, input, envCtx).links).toSatisfySchemaInApiSpec("SelfLink");
  });
});
// PATCH request: /package
describe("transform response: PATCH /clients/:id/package", () => {
  it("should satisfy schema in spec", () => {
    
    const entity = "clients";
    envCtx.reqVerb = "PATCH";
    envCtx.itemId = process.env.CLIENT_ID;
    envCtx.pathsuffix = `/${entity}/${envCtx.itemId}/package`;

    const input = { package: "b0fc4281-0e21-46ac-bd85-975edd26b689"};

    expect(transform(entity, input, envCtx).data).toSatisfySchemaInApiSpec("PatchResponseData");
    expect(transform(entity, input, envCtx).links).toSatisfySchemaInApiSpec("SelfLink");
  });
});
// DELETE request: /{clientId}