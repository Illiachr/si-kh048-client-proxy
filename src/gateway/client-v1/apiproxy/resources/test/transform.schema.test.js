const path = require("path");
const jestOpenAPI = require("jest-openapi");
const { transform } = require("../jsc/utils");

// eslint-disable-next-line no-undef
const openApiFilePath = path.normalize(path.join(__dirname, "./specs/si-client-proxy.yml"));

jestOpenAPI(openApiFilePath);

const envCtx = {
  reqScheme: "https",
  proxyHost: "illiadev93-eval-test.apigee.net",
  basepath: "/sicp/api/v1"
};

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
    envCtx.pathsuffix = "/clients/ccaab0f7-3bd3-4417-8a9f-a2843f422917";
    envCtx.itemId = "ccaab0f7-3bd3-4417-8a9f-a2843f422917";
    const { CLIENT: input } = require("./mock/response");

    expect(transform(entity, input, envCtx).data).toSatisfySchemaInApiSpec("Client");
  });
});