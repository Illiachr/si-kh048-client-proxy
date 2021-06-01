function joinLink(scheme, host, args) {
  if (!args || !Array.isArray(args) || !args.length) {
    return scheme + "://" + host;
  }
  return scheme + "://" + host + args.join("/");
}

function fixTimeStr(dateTime) {
  var arr = dateTime.split(" ");
  arr[0] = arr[0].split("-").reverse().join("-") + "T";
  return arr.join("") + "Z";
}

function timeToISO(dateTime) {
  const rfcTimePattern =
    /^((?:(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}(?:\.\d+)?))(Z|[+-]\d{2}:\d{2})?)$/gm;
  if (rfcTimePattern.test(dateTime)) {
    return new Date(dateTime).toISOString();
  }

  var fixedTime = fixTimeStr(dateTime);

  if (!Date.parse(fixedTime)) {
    return dateTime;
  }

  return new Date(fixedTime).toISOString();
}

function transform(entity, input, ctx) {
  const pathsuffix = ctx.pathsuffix,
    basepath = ctx.basepath,
    proxyResponse = {};

  if (entity === "catalog") {
    proxyResponse.data = [];
    proxyResponse.links = {
      collection: {
        href: joinLink(ctx.reqScheme, ctx.proxyHost, [basepath]) + pathsuffix
      }
    };
    proxyResponse.total = input.length;

    switch (pathsuffix) {
      case "/catalog/packages/base":
        for (var i = 0; i < input.length; i++) {
          input[i].createdTime = timeToISO(input[i].createdTime);
          proxyResponse.data[i] = input[i];
        }
        break;
      case "/catalog/products":
        for (var j = 0; j < input.length; j++) {
          proxyResponse.data[j] = input[j];
        }
        break;
    } // end switch
  } // end if
  if (entity === "clients" && ctx.reqVerb === "GET") {
    if (pathsuffix === "/clients") {
      proxyResponse.data = [];
      input.forEach((item) =>
        proxyResponse.data.push(assignResponseData(item))
      );
      proxyResponse.links = {
        collection: {
          href: joinLink(ctx.reqScheme, ctx.proxyHost, [basepath, entity])
        }
      };
      proxyResponse.total = input.length;
    } // if GET /clients
    if (pathsuffix !== "/clients" && pathsuffix.includes(ctx.itemId)) {
      proxyResponse.data = assignResponseData(input);
      proxyResponse.links = {
        self: {
          href: joinLink(ctx.reqScheme, ctx.proxyHost, [
            basepath,
            entity,
            ctx.itemId
          ])
        }
      };
    } // if GET /clients/{clientId}
  }

  if (entity === "clients" && ctx.reqVerb === "POST") {
    proxyResponse.links = {
      self: {
        href: joinLink(ctx.reqScheme, ctx.proxyHost, [
          basepath,
          entity,
          ctx.itemId
        ])
      }
    };
  } // if POST /clients

  if (
    entity === "clients" &&
    ctx.reqVerb === "PATCH" &&
    pathsuffix.includes(ctx.itemId)
  ) {
    proxyResponse.data = {};
    Object.keys(input).forEach((key) => (proxyResponse.data[key] = input[key]));
    proxyResponse.links = {
      self: {
        href: joinLink(ctx.reqScheme, ctx.proxyHost, [
          basepath,
          entity,
          ctx.itemId
        ])
      }
    };
  } // if PATCH /clients -> balance, name, package
  return proxyResponse;
}

function assignResponseData(input) {
  const data = {};
  Object.keys(input).forEach((key) => {
    if (input[key]) {
      if (key !== "package") {
        data[key] = input[key];
      } else if (typeof input[key] === "string") {
        data[key] = input[key];
      } else {
        data[key] = {};
        Object.keys(input[key]).forEach((field) => {
          data[key][field] = input[key][field];
          if (field === "createdTime") {
            data[key][field] = timeToISO(input[key][field]);
          }
        });
      }
      if (key === "balance") {
        data[key] = Number(data[key]);
      }
    }
  });
  return data;
}

if (!module) {
  var module = { exports: {} };
}

module.exports.joinLink = joinLink;
module.exports.timeToISO = timeToISO;
module.exports.transform = transform;
