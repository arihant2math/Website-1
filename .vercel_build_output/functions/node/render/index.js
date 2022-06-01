var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key2 of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key2) && key2 !== "default")
        __defProp(target, key2, { get: () => module2[key2], enumerable: !(desc = __getOwnPropDesc(module2, key2)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// node_modules/.pnpm/@sveltejs+kit@1.0.0-next.260_sass@1.49.7+svelte@3.46.4/node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData
});
function _fileName(headerValue) {
  const m2 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m2) {
    return;
  }
  const match = m2[2] || m2[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m3, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body2, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m2 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m2) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser(m2[1] || m2[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new File(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m3 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m3) {
        entryName = m3[2] || m3[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body2) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var import_node_fs, import_node_path, import_node_worker_threads, import_node_http, import_node_https, import_node_zlib, import_node_stream, import_node_util, import_node_url, import_net, s, S, f, F, LF, CR, SPACE, HYPHEN, COLON, A, Z, lower, noop, MultipartParser;
var init_multipart_parser = __esm({
  "node_modules/.pnpm/@sveltejs+kit@1.0.0-next.260_sass@1.49.7+svelte@3.46.4/node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js"() {
    import_node_fs = __toModule(require("fs"));
    import_node_path = __toModule(require("path"));
    import_node_worker_threads = __toModule(require("worker_threads"));
    init_install_fetch();
    import_node_http = __toModule(require("http"));
    import_node_https = __toModule(require("https"));
    import_node_zlib = __toModule(require("zlib"));
    import_node_stream = __toModule(require("stream"));
    import_node_util = __toModule(require("util"));
    import_node_url = __toModule(require("url"));
    import_net = __toModule(require("net"));
    globalThis.DOMException || (() => {
      const port = new import_node_worker_threads.MessageChannel().port1;
      const ab = new ArrayBuffer(0);
      try {
        port.postMessage(ab, [ab, ab]);
      } catch (err) {
        return err.constructor;
      }
    })();
    s = 0;
    S = {
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      END: s++
    };
    f = 1;
    F = {
      PART_BOUNDARY: f,
      LAST_BOUNDARY: f *= 2
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c) => c | 32;
    noop = () => {
    };
    MultipartParser = class {
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i2 = 0; i2 < boundary.length; i2++) {
          ui8a[i2] = boundary.charCodeAt(i2);
          this.boundaryChars[ui8a[i2]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      write(data) {
        let i2 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c;
        let cl;
        const mark = (name) => {
          this[name + "Mark"] = i2;
        };
        const clear = (name) => {
          delete this[name + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name, clear2) => {
          const markSymbol = name + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name, this[markSymbol], i2, data);
            delete this[markSymbol];
          } else {
            callback(name, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i2 = 0; i2 < length_; i2++) {
          c = data[i2];
          switch (state) {
            case S.START_BOUNDARY:
              if (index === boundary.length - 2) {
                if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c !== CR) {
                  return;
                }
                index++;
                break;
              } else if (index - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                  state = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                  index = 0;
                  callback("onPartBegin");
                  state = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index + 2]) {
                index = -2;
              }
              if (c === boundary[index + 2]) {
                index++;
              }
              break;
            case S.HEADER_FIELD_START:
              state = S.HEADER_FIELD;
              mark("onHeaderField");
              index = 0;
            case S.HEADER_FIELD:
              if (c === CR) {
                clear("onHeaderField");
                state = S.HEADERS_ALMOST_DONE;
                break;
              }
              index++;
              if (c === HYPHEN) {
                break;
              }
              if (c === COLON) {
                if (index === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c === SPACE) {
                break;
              }
              mark("onHeaderValue");
              state = S.HEADER_VALUE;
            case S.HEADER_VALUE:
              if (c === CR) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              state = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              callback("onHeadersEnd");
              state = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state = S.PART_DATA;
              mark("onPartData");
            case S.PART_DATA:
              previousIndex = index;
              if (index === 0) {
                i2 += boundaryEnd;
                while (i2 < bufferLength && !(data[i2] in boundaryChars)) {
                  i2 += boundaryLength;
                }
                i2 -= boundaryEnd;
                c = data[i2];
              }
              if (index < boundary.length) {
                if (boundary[index] === c) {
                  if (index === 0) {
                    dataCallback("onPartData", true);
                  }
                  index++;
                } else {
                  index = 0;
                }
              } else if (index === boundary.length) {
                index++;
                if (c === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index = 0;
                }
              } else if (index - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index = 0;
                  if (c === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c === HYPHEN) {
                    callback("onPartEnd");
                    state = S.END;
                    flags = 0;
                  } else {
                    index = 0;
                  }
                } else {
                  index = 0;
                }
              }
              if (index > 0) {
                lookbehind[index - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i2--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// node_modules/.pnpm/@sveltejs+kit@1.0.0-next.260_sass@1.49.7+svelte@3.46.4/node_modules/@sveltejs/kit/dist/install-fetch.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base642 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i2 = 1; i2 < meta.length; i2++) {
    if (meta[i2] === "base64") {
      base642 = true;
    } else {
      typeFull += `;${meta[i2]}`;
      if (meta[i2].indexOf("charset=") === 0) {
        charset = meta[i2].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base642 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
async function* toIterator(parts, clone2 = true) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0;
      while (position !== part.size) {
        const chunk = part.slice(position, Math.min(part.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
function formDataToBlob(F2, B = Blob$1) {
  var b = `${r()}${r()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c = [], p = `--${b}\r
Content-Disposition: form-data; name="`;
  F2.forEach((v, n) => typeof v == "string" ? c.push(p + e(n) + `"\r
\r
${v.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c.push(p + e(n) + `"; filename="${e(v.name, 1)}"\r
Content-Type: ${v.type || "application/octet-stream"}\r
\r
`, v, "\r\n"));
  c.push(`--${b}--`);
  return new B(c, { type: "multipart/form-data; boundary=" + b });
}
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  const { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (!(body instanceof import_node_stream2.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error2 = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error2);
        throw error2;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    const error_ = error2 instanceof FetchBaseError ? error2 : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
function fromRawHeaders(headers = []) {
  return new Headers2(headers.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
function stripURLForUseAsAReferrer(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = (0, import_net2.isIP)(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (/^(.+\.)*localhost$/.test(url.host)) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}
async function fetch2(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request2(url, options_);
    const { parsedURL, options } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dataUriToBuffer(request.url);
      const response2 = new Response2(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? import_node_https2.default : import_node_http2.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof import_node_stream2.default.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL, options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error2) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error2.message}`, "system", error2));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error2) => {
      response.body.destroy(error2);
    });
    if (process.version < "v14") {
      request_.on("socket", (s3) => {
        let endedWithEventsCount;
        s3.prependListener("end", () => {
          endedWithEventsCount = s3._eventsCount;
        });
        s3.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s3._eventsCount && !hadError) {
            const error2 = new Error("Premature close");
            error2.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error2);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              headers.set("Location", locationURL);
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers2(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_node_stream2.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve2(fetch2(new Request2(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = (0, import_node_stream2.pipeline)(response_, new import_node_stream2.PassThrough(), reject);
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_node_zlib2.default.Z_SYNC_FLUSH,
        finishFlush: import_node_zlib2.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createGunzip(zlibOptions), reject);
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_node_stream2.pipeline)(response_, new import_node_stream2.PassThrough(), reject);
        raw.once("data", (chunk) => {
          body = (chunk[0] & 15) === 8 ? (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createInflate(), reject) : (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createInflateRaw(), reject);
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createBrotliDecompress(), reject);
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error2 = new Error("Premature close");
        error2.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error2);
      }
    };
    socket.prependListener("close", onSocketClose);
    request.on("abort", () => {
      socket.removeListener("close", onSocketClose);
    });
    socket.on("data", (buf) => {
      properLastChunkReceived = Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    });
  });
}
function __fetch_polyfill() {
  Object.defineProperties(globalThis, {
    fetch: {
      enumerable: true,
      configurable: true,
      value: fetch2
    },
    Response: {
      enumerable: true,
      configurable: true,
      value: Response2
    },
    Request: {
      enumerable: true,
      configurable: true,
      value: Request2
    },
    Headers: {
      enumerable: true,
      configurable: true,
      value: Headers2
    }
  });
}
var import_node_http2, import_node_https2, import_node_zlib2, import_node_stream2, import_node_util2, import_node_url2, import_net2, commonjsGlobal, ponyfill_es2018, POOL_SIZE$1, POOL_SIZE, _parts, _type, _size, _a, _Blob, Blob, Blob$1, _lastModified, _name, _a2, _File, File, t, i, h, r, m, f2, e, x, _d, _a3, FormData, FetchBaseError, FetchError, NAME, isURLSearchParameters, isBlob, isAbortSignal, INTERNALS$2, Body, clone, getNonSpecFormDataBoundary, extractContentType, getTotalBytes, writeToStream, validateHeaderName, validateHeaderValue, Headers2, redirectStatus, isRedirect, INTERNALS$1, Response2, getSearch, ReferrerPolicy, DEFAULT_REFERRER_POLICY, INTERNALS, isRequest, Request2, getNodeRequestOptions, AbortError, supportedSchemas;
var init_install_fetch = __esm({
  "node_modules/.pnpm/@sveltejs+kit@1.0.0-next.260_sass@1.49.7+svelte@3.46.4/node_modules/@sveltejs/kit/dist/install-fetch.js"() {
    import_node_http2 = __toModule(require("http"));
    import_node_https2 = __toModule(require("https"));
    import_node_zlib2 = __toModule(require("zlib"));
    import_node_stream2 = __toModule(require("stream"));
    import_node_util2 = __toModule(require("util"));
    import_node_url2 = __toModule(require("url"));
    import_net2 = __toModule(require("net"));
    commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    ponyfill_es2018 = { exports: {} };
    (function(module2, exports) {
      (function(global2, factory) {
        factory(exports);
      })(commonjsGlobal, function(exports2) {
        const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
        function noop4() {
          return void 0;
        }
        function getGlobals() {
          if (typeof self !== "undefined") {
            return self;
          } else if (typeof window !== "undefined") {
            return window;
          } else if (typeof commonjsGlobal !== "undefined") {
            return commonjsGlobal;
          }
          return void 0;
        }
        const globals = getGlobals();
        function typeIsObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        const rethrowAssertionErrorRejection = noop4;
        const originalPromise = Promise;
        const originalPromiseThen = Promise.prototype.then;
        const originalPromiseResolve = Promise.resolve.bind(originalPromise);
        const originalPromiseReject = Promise.reject.bind(originalPromise);
        function newPromise(executor) {
          return new originalPromise(executor);
        }
        function promiseResolvedWith(value) {
          return originalPromiseResolve(value);
        }
        function promiseRejectedWith(reason) {
          return originalPromiseReject(reason);
        }
        function PerformPromiseThen(promise, onFulfilled, onRejected) {
          return originalPromiseThen.call(promise, onFulfilled, onRejected);
        }
        function uponPromise(promise, onFulfilled, onRejected) {
          PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
        }
        function uponFulfillment(promise, onFulfilled) {
          uponPromise(promise, onFulfilled);
        }
        function uponRejection(promise, onRejected) {
          uponPromise(promise, void 0, onRejected);
        }
        function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
          return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
        }
        function setPromiseIsHandledToTrue(promise) {
          PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
        }
        const queueMicrotask = (() => {
          const globalQueueMicrotask = globals && globals.queueMicrotask;
          if (typeof globalQueueMicrotask === "function") {
            return globalQueueMicrotask;
          }
          const resolvedPromise = promiseResolvedWith(void 0);
          return (fn) => PerformPromiseThen(resolvedPromise, fn);
        })();
        function reflectCall(F2, V, args) {
          if (typeof F2 !== "function") {
            throw new TypeError("Argument is not a function");
          }
          return Function.prototype.apply.call(F2, V, args);
        }
        function promiseCall(F2, V, args) {
          try {
            return promiseResolvedWith(reflectCall(F2, V, args));
          } catch (value) {
            return promiseRejectedWith(value);
          }
        }
        const QUEUE_MAX_ARRAY_SIZE = 16384;
        class SimpleQueue {
          constructor() {
            this._cursor = 0;
            this._size = 0;
            this._front = {
              _elements: [],
              _next: void 0
            };
            this._back = this._front;
            this._cursor = 0;
            this._size = 0;
          }
          get length() {
            return this._size;
          }
          push(element) {
            const oldBack = this._back;
            let newBack = oldBack;
            if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
              newBack = {
                _elements: [],
                _next: void 0
              };
            }
            oldBack._elements.push(element);
            if (newBack !== oldBack) {
              this._back = newBack;
              oldBack._next = newBack;
            }
            ++this._size;
          }
          shift() {
            const oldFront = this._front;
            let newFront = oldFront;
            const oldCursor = this._cursor;
            let newCursor = oldCursor + 1;
            const elements = oldFront._elements;
            const element = elements[oldCursor];
            if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
              newFront = oldFront._next;
              newCursor = 0;
            }
            --this._size;
            this._cursor = newCursor;
            if (oldFront !== newFront) {
              this._front = newFront;
            }
            elements[oldCursor] = void 0;
            return element;
          }
          forEach(callback) {
            let i2 = this._cursor;
            let node = this._front;
            let elements = node._elements;
            while (i2 !== elements.length || node._next !== void 0) {
              if (i2 === elements.length) {
                node = node._next;
                elements = node._elements;
                i2 = 0;
                if (elements.length === 0) {
                  break;
                }
              }
              callback(elements[i2]);
              ++i2;
            }
          }
          peek() {
            const front = this._front;
            const cursor = this._cursor;
            return front._elements[cursor];
          }
        }
        function ReadableStreamReaderGenericInitialize(reader, stream) {
          reader._ownerReadableStream = stream;
          stream._reader = reader;
          if (stream._state === "readable") {
            defaultReaderClosedPromiseInitialize(reader);
          } else if (stream._state === "closed") {
            defaultReaderClosedPromiseInitializeAsResolved(reader);
          } else {
            defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
          }
        }
        function ReadableStreamReaderGenericCancel(reader, reason) {
          const stream = reader._ownerReadableStream;
          return ReadableStreamCancel(stream, reason);
        }
        function ReadableStreamReaderGenericRelease(reader) {
          if (reader._ownerReadableStream._state === "readable") {
            defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          } else {
            defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          }
          reader._ownerReadableStream._reader = void 0;
          reader._ownerReadableStream = void 0;
        }
        function readerLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released reader");
        }
        function defaultReaderClosedPromiseInitialize(reader) {
          reader._closedPromise = newPromise((resolve2, reject) => {
            reader._closedPromise_resolve = resolve2;
            reader._closedPromise_reject = reject;
          });
        }
        function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseReject(reader, reason);
        }
        function defaultReaderClosedPromiseInitializeAsResolved(reader) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseResolve(reader);
        }
        function defaultReaderClosedPromiseReject(reader, reason) {
          if (reader._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(reader._closedPromise);
          reader._closedPromise_reject(reason);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        function defaultReaderClosedPromiseResetToRejected(reader, reason) {
          defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
        }
        function defaultReaderClosedPromiseResolve(reader) {
          if (reader._closedPromise_resolve === void 0) {
            return;
          }
          reader._closedPromise_resolve(void 0);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
        const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
        const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
        const PullSteps = SymbolPolyfill("[[PullSteps]]");
        const NumberIsFinite = Number.isFinite || function(x2) {
          return typeof x2 === "number" && isFinite(x2);
        };
        const MathTrunc = Math.trunc || function(v) {
          return v < 0 ? Math.ceil(v) : Math.floor(v);
        };
        function isDictionary(x2) {
          return typeof x2 === "object" || typeof x2 === "function";
        }
        function assertDictionary(obj, context) {
          if (obj !== void 0 && !isDictionary(obj)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertFunction(x2, context) {
          if (typeof x2 !== "function") {
            throw new TypeError(`${context} is not a function.`);
          }
        }
        function isObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        function assertObject(x2, context) {
          if (!isObject(x2)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertRequiredArgument(x2, position, context) {
          if (x2 === void 0) {
            throw new TypeError(`Parameter ${position} is required in '${context}'.`);
          }
        }
        function assertRequiredField(x2, field, context) {
          if (x2 === void 0) {
            throw new TypeError(`${field} is required in '${context}'.`);
          }
        }
        function convertUnrestrictedDouble(value) {
          return Number(value);
        }
        function censorNegativeZero(x2) {
          return x2 === 0 ? 0 : x2;
        }
        function integerPart(x2) {
          return censorNegativeZero(MathTrunc(x2));
        }
        function convertUnsignedLongLongWithEnforceRange(value, context) {
          const lowerBound = 0;
          const upperBound = Number.MAX_SAFE_INTEGER;
          let x2 = Number(value);
          x2 = censorNegativeZero(x2);
          if (!NumberIsFinite(x2)) {
            throw new TypeError(`${context} is not a finite number`);
          }
          x2 = integerPart(x2);
          if (x2 < lowerBound || x2 > upperBound) {
            throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
          }
          if (!NumberIsFinite(x2) || x2 === 0) {
            return 0;
          }
          return x2;
        }
        function assertReadableStream(x2, context) {
          if (!IsReadableStream(x2)) {
            throw new TypeError(`${context} is not a ReadableStream.`);
          }
        }
        function AcquireReadableStreamDefaultReader(stream) {
          return new ReadableStreamDefaultReader(stream);
        }
        function ReadableStreamAddReadRequest(stream, readRequest) {
          stream._reader._readRequests.push(readRequest);
        }
        function ReadableStreamFulfillReadRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readRequest = reader._readRequests.shift();
          if (done) {
            readRequest._closeSteps();
          } else {
            readRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadRequests(stream) {
          return stream._reader._readRequests.length;
        }
        function ReadableStreamHasDefaultReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamDefaultReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamDefaultReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("read"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: () => resolvePromise({ value: void 0, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamDefaultReaderRead(this, readRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamDefaultReader(this)) {
              throw defaultReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamDefaultReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultReader",
            configurable: true
          });
        }
        function IsReadableStreamDefaultReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultReader;
        }
        function ReadableStreamDefaultReaderRead(reader, readRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "closed") {
            readRequest._closeSteps();
          } else if (stream._state === "errored") {
            readRequest._errorSteps(stream._storedError);
          } else {
            stream._readableStreamController[PullSteps](readRequest);
          }
        }
        function defaultReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
        }
        const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
        }).prototype);
        class ReadableStreamAsyncIteratorImpl {
          constructor(reader, preventCancel) {
            this._ongoingPromise = void 0;
            this._isFinished = false;
            this._reader = reader;
            this._preventCancel = preventCancel;
          }
          next() {
            const nextSteps = () => this._nextSteps();
            this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
            return this._ongoingPromise;
          }
          return(value) {
            const returnSteps = () => this._returnSteps(value);
            return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
          }
          _nextSteps() {
            if (this._isFinished) {
              return Promise.resolve({ value: void 0, done: true });
            }
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("iterate"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => {
                this._ongoingPromise = void 0;
                queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
              },
              _closeSteps: () => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                resolvePromise({ value: void 0, done: true });
              },
              _errorSteps: (reason) => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                rejectPromise(reason);
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promise;
          }
          _returnSteps(value) {
            if (this._isFinished) {
              return Promise.resolve({ value, done: true });
            }
            this._isFinished = true;
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("finish iterating"));
            }
            if (!this._preventCancel) {
              const result = ReadableStreamReaderGenericCancel(reader, value);
              ReadableStreamReaderGenericRelease(reader);
              return transformPromiseWith(result, () => ({ value, done: true }));
            }
            ReadableStreamReaderGenericRelease(reader);
            return promiseResolvedWith({ value, done: true });
          }
        }
        const ReadableStreamAsyncIteratorPrototype = {
          next() {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
            }
            return this._asyncIteratorImpl.next();
          },
          return(value) {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
            }
            return this._asyncIteratorImpl.return(value);
          }
        };
        if (AsyncIteratorPrototype !== void 0) {
          Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
        }
        function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
          const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
          iterator._asyncIteratorImpl = impl;
          return iterator;
        }
        function IsReadableStreamAsyncIterator(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
            return false;
          }
          try {
            return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
          } catch (_a4) {
            return false;
          }
        }
        function streamAsyncIteratorBrandCheckException(name) {
          return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
        }
        const NumberIsNaN = Number.isNaN || function(x2) {
          return x2 !== x2;
        };
        function CreateArrayFromList(elements) {
          return elements.slice();
        }
        function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
          new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
        }
        function TransferArrayBuffer(O) {
          return O;
        }
        function IsDetachedBuffer(O) {
          return false;
        }
        function ArrayBufferSlice(buffer, begin, end) {
          if (buffer.slice) {
            return buffer.slice(begin, end);
          }
          const length = end - begin;
          const slice = new ArrayBuffer(length);
          CopyDataBlockBytes(slice, 0, buffer, begin, length);
          return slice;
        }
        function IsNonNegativeNumber(v) {
          if (typeof v !== "number") {
            return false;
          }
          if (NumberIsNaN(v)) {
            return false;
          }
          if (v < 0) {
            return false;
          }
          return true;
        }
        function CloneAsUint8Array(O) {
          const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
          return new Uint8Array(buffer);
        }
        function DequeueValue(container) {
          const pair = container._queue.shift();
          container._queueTotalSize -= pair.size;
          if (container._queueTotalSize < 0) {
            container._queueTotalSize = 0;
          }
          return pair.value;
        }
        function EnqueueValueWithSize(container, value, size) {
          if (!IsNonNegativeNumber(size) || size === Infinity) {
            throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
          }
          container._queue.push({ value, size });
          container._queueTotalSize += size;
        }
        function PeekQueueValue(container) {
          const pair = container._queue.peek();
          return pair.value;
        }
        function ResetQueue(container) {
          container._queue = new SimpleQueue();
          container._queueTotalSize = 0;
        }
        class ReadableStreamBYOBRequest {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get view() {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("view");
            }
            return this._view;
          }
          respond(bytesWritten) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respond");
            }
            assertRequiredArgument(bytesWritten, 1, "respond");
            bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(this._view.buffer))
              ;
            ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
          }
          respondWithNewView(view) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respondWithNewView");
            }
            assertRequiredArgument(view, 1, "respondWithNewView");
            if (!ArrayBuffer.isView(view)) {
              throw new TypeError("You can only respond with array buffer views");
            }
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
          }
        }
        Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
          respond: { enumerable: true },
          respondWithNewView: { enumerable: true },
          view: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBRequest",
            configurable: true
          });
        }
        class ReadableByteStreamController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get byobRequest() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("byobRequest");
            }
            return ReadableByteStreamControllerGetBYOBRequest(this);
          }
          get desiredSize() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("desiredSize");
            }
            return ReadableByteStreamControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("close");
            }
            if (this._closeRequested) {
              throw new TypeError("The stream has already been closed; do not close it again!");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
            }
            ReadableByteStreamControllerClose(this);
          }
          enqueue(chunk) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("enqueue");
            }
            assertRequiredArgument(chunk, 1, "enqueue");
            if (!ArrayBuffer.isView(chunk)) {
              throw new TypeError("chunk must be an array buffer view");
            }
            if (chunk.byteLength === 0) {
              throw new TypeError("chunk must have non-zero byteLength");
            }
            if (chunk.buffer.byteLength === 0) {
              throw new TypeError(`chunk's buffer must have non-zero byteLength`);
            }
            if (this._closeRequested) {
              throw new TypeError("stream is closed or draining");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
            }
            ReadableByteStreamControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("error");
            }
            ReadableByteStreamControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ReadableByteStreamControllerClearPendingPullIntos(this);
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableByteStreamControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableByteStream;
            if (this._queueTotalSize > 0) {
              const entry17 = this._queue.shift();
              this._queueTotalSize -= entry17.byteLength;
              ReadableByteStreamControllerHandleQueueDrain(this);
              const view = new Uint8Array(entry17.buffer, entry17.byteOffset, entry17.byteLength);
              readRequest._chunkSteps(view);
              return;
            }
            const autoAllocateChunkSize = this._autoAllocateChunkSize;
            if (autoAllocateChunkSize !== void 0) {
              let buffer;
              try {
                buffer = new ArrayBuffer(autoAllocateChunkSize);
              } catch (bufferE) {
                readRequest._errorSteps(bufferE);
                return;
              }
              const pullIntoDescriptor = {
                buffer,
                bufferByteLength: autoAllocateChunkSize,
                byteOffset: 0,
                byteLength: autoAllocateChunkSize,
                bytesFilled: 0,
                elementSize: 1,
                viewConstructor: Uint8Array,
                readerType: "default"
              };
              this._pendingPullIntos.push(pullIntoDescriptor);
            }
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableByteStreamControllerCallPullIfNeeded(this);
          }
        }
        Object.defineProperties(ReadableByteStreamController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          byobRequest: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableByteStreamController",
            configurable: true
          });
        }
        function IsReadableByteStreamController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
            return false;
          }
          return x2 instanceof ReadableByteStreamController;
        }
        function IsReadableStreamBYOBRequest(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBRequest;
        }
        function ReadableByteStreamControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableByteStreamControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableByteStreamControllerError(controller, e2);
          });
        }
        function ReadableByteStreamControllerClearPendingPullIntos(controller) {
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          controller._pendingPullIntos = new SimpleQueue();
        }
        function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
          let done = false;
          if (stream._state === "closed") {
            done = true;
          }
          const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
          if (pullIntoDescriptor.readerType === "default") {
            ReadableStreamFulfillReadRequest(stream, filledView, done);
          } else {
            ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
          }
        }
        function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
          const bytesFilled = pullIntoDescriptor.bytesFilled;
          const elementSize = pullIntoDescriptor.elementSize;
          return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
        }
        function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
          controller._queue.push({ buffer, byteOffset, byteLength });
          controller._queueTotalSize += byteLength;
        }
        function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
          const elementSize = pullIntoDescriptor.elementSize;
          const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
          const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
          const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
          const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
          let totalBytesToCopyRemaining = maxBytesToCopy;
          let ready = false;
          if (maxAlignedBytes > currentAlignedBytes) {
            totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
            ready = true;
          }
          const queue = controller._queue;
          while (totalBytesToCopyRemaining > 0) {
            const headOfQueue = queue.peek();
            const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
            const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
            if (headOfQueue.byteLength === bytesToCopy) {
              queue.shift();
            } else {
              headOfQueue.byteOffset += bytesToCopy;
              headOfQueue.byteLength -= bytesToCopy;
            }
            controller._queueTotalSize -= bytesToCopy;
            ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
            totalBytesToCopyRemaining -= bytesToCopy;
          }
          return ready;
        }
        function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
          pullIntoDescriptor.bytesFilled += size;
        }
        function ReadableByteStreamControllerHandleQueueDrain(controller) {
          if (controller._queueTotalSize === 0 && controller._closeRequested) {
            ReadableByteStreamControllerClearAlgorithms(controller);
            ReadableStreamClose(controller._controlledReadableByteStream);
          } else {
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
        }
        function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
          if (controller._byobRequest === null) {
            return;
          }
          controller._byobRequest._associatedReadableByteStreamController = void 0;
          controller._byobRequest._view = null;
          controller._byobRequest = null;
        }
        function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
          while (controller._pendingPullIntos.length > 0) {
            if (controller._queueTotalSize === 0) {
              return;
            }
            const pullIntoDescriptor = controller._pendingPullIntos.peek();
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
          const stream = controller._controlledReadableByteStream;
          let elementSize = 1;
          if (view.constructor !== DataView) {
            elementSize = view.constructor.BYTES_PER_ELEMENT;
          }
          const ctor = view.constructor;
          const buffer = TransferArrayBuffer(view.buffer);
          const pullIntoDescriptor = {
            buffer,
            bufferByteLength: buffer.byteLength,
            byteOffset: view.byteOffset,
            byteLength: view.byteLength,
            bytesFilled: 0,
            elementSize,
            viewConstructor: ctor,
            readerType: "byob"
          };
          if (controller._pendingPullIntos.length > 0) {
            controller._pendingPullIntos.push(pullIntoDescriptor);
            ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
            return;
          }
          if (stream._state === "closed") {
            const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
            readIntoRequest._closeSteps(emptyView);
            return;
          }
          if (controller._queueTotalSize > 0) {
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
              ReadableByteStreamControllerHandleQueueDrain(controller);
              readIntoRequest._chunkSteps(filledView);
              return;
            }
            if (controller._closeRequested) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              readIntoRequest._errorSteps(e2);
              return;
            }
          }
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
          const stream = controller._controlledReadableByteStream;
          if (ReadableStreamHasBYOBReader(stream)) {
            while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
              const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
          if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
            return;
          }
          ReadableByteStreamControllerShiftPendingPullInto(controller);
          const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
          if (remainderSize > 0) {
            const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
          }
          pullIntoDescriptor.bytesFilled -= remainderSize;
          ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        }
        function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            ReadableByteStreamControllerRespondInClosedState(controller);
          } else {
            ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerShiftPendingPullInto(controller) {
          const descriptor = controller._pendingPullIntos.shift();
          return descriptor;
        }
        function ReadableByteStreamControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return false;
          }
          if (controller._closeRequested) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableByteStreamControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
        }
        function ReadableByteStreamControllerClose(controller) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          if (controller._queueTotalSize > 0) {
            controller._closeRequested = true;
            return;
          }
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (firstPendingPullInto.bytesFilled > 0) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              throw e2;
            }
          }
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
        function ReadableByteStreamControllerEnqueue(controller, chunk) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          const buffer = chunk.buffer;
          const byteOffset = chunk.byteOffset;
          const byteLength = chunk.byteLength;
          const transferredBuffer = TransferArrayBuffer(buffer);
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (IsDetachedBuffer(firstPendingPullInto.buffer))
              ;
            firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
          }
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          if (ReadableStreamHasDefaultReader(stream)) {
            if (ReadableStreamGetNumReadRequests(stream) === 0) {
              ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            } else {
              if (controller._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerShiftPendingPullInto(controller);
              }
              const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
              ReadableStreamFulfillReadRequest(stream, transferredView, false);
            }
          } else if (ReadableStreamHasBYOBReader(stream)) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
          } else {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerError(controller, e2) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return;
          }
          ReadableByteStreamControllerClearPendingPullIntos(controller);
          ResetQueue(controller);
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableByteStreamControllerGetBYOBRequest(controller) {
          if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
            const firstDescriptor = controller._pendingPullIntos.peek();
            const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
            const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
            SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
            controller._byobRequest = byobRequest;
          }
          return controller._byobRequest;
        }
        function ReadableByteStreamControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableByteStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableByteStreamControllerRespond(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (bytesWritten !== 0) {
              throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
            }
          } else {
            if (bytesWritten === 0) {
              throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
            }
            if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
              throw new RangeError("bytesWritten out of range");
            }
          }
          firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
          ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
        }
        function ReadableByteStreamControllerRespondWithNewView(controller, view) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (view.byteLength !== 0) {
              throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
            }
          } else {
            if (view.byteLength === 0) {
              throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
            }
          }
          if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
            throw new RangeError("The region specified by view does not match byobRequest");
          }
          if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
            throw new RangeError("The buffer of view has different capacity than byobRequest");
          }
          if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
            throw new RangeError("The region specified by view is larger than byobRequest");
          }
          const viewByteLength = view.byteLength;
          firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
          ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
        }
        function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
          controller._controlledReadableByteStream = stream;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._byobRequest = null;
          controller._queue = controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._closeRequested = false;
          controller._started = false;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          controller._autoAllocateChunkSize = autoAllocateChunkSize;
          controller._pendingPullIntos = new SimpleQueue();
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableByteStreamControllerError(controller, r2);
          });
        }
        function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
          const controller = Object.create(ReadableByteStreamController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingByteSource.start !== void 0) {
            startAlgorithm = () => underlyingByteSource.start(controller);
          }
          if (underlyingByteSource.pull !== void 0) {
            pullAlgorithm = () => underlyingByteSource.pull(controller);
          }
          if (underlyingByteSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
          }
          const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
          if (autoAllocateChunkSize === 0) {
            throw new TypeError("autoAllocateChunkSize must be greater than 0");
          }
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
        }
        function SetUpReadableStreamBYOBRequest(request, controller, view) {
          request._associatedReadableByteStreamController = controller;
          request._view = view;
        }
        function byobRequestBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
        }
        function byteStreamControllerBrandCheckException(name) {
          return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
        }
        function AcquireReadableStreamBYOBReader(stream) {
          return new ReadableStreamBYOBReader(stream);
        }
        function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
          stream._reader._readIntoRequests.push(readIntoRequest);
        }
        function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readIntoRequest = reader._readIntoRequests.shift();
          if (done) {
            readIntoRequest._closeSteps(chunk);
          } else {
            readIntoRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadIntoRequests(stream) {
          return stream._reader._readIntoRequests.length;
        }
        function ReadableStreamHasBYOBReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamBYOBReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamBYOBReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            if (!IsReadableByteStreamController(stream._readableStreamController)) {
              throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readIntoRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read(view) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("read"));
            }
            if (!ArrayBuffer.isView(view)) {
              return promiseRejectedWith(new TypeError("view must be an array buffer view"));
            }
            if (view.byteLength === 0) {
              return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
            }
            if (view.buffer.byteLength === 0) {
              return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readIntoRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamBYOBReader(this)) {
              throw byobReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readIntoRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamBYOBReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBReader",
            configurable: true
          });
        }
        function IsReadableStreamBYOBReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBReader;
        }
        function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "errored") {
            readIntoRequest._errorSteps(stream._storedError);
          } else {
            ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
          }
        }
        function byobReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
        }
        function ExtractHighWaterMark(strategy, defaultHWM) {
          const { highWaterMark } = strategy;
          if (highWaterMark === void 0) {
            return defaultHWM;
          }
          if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
            throw new RangeError("Invalid highWaterMark");
          }
          return highWaterMark;
        }
        function ExtractSizeAlgorithm(strategy) {
          const { size } = strategy;
          if (!size) {
            return () => 1;
          }
          return size;
        }
        function convertQueuingStrategy(init2, context) {
          assertDictionary(init2, context);
          const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          const size = init2 === null || init2 === void 0 ? void 0 : init2.size;
          return {
            highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
            size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
          };
        }
        function convertQueuingStrategySize(fn, context) {
          assertFunction(fn, context);
          return (chunk) => convertUnrestrictedDouble(fn(chunk));
        }
        function convertUnderlyingSink(original, context) {
          assertDictionary(original, context);
          const abort = original === null || original === void 0 ? void 0 : original.abort;
          const close = original === null || original === void 0 ? void 0 : original.close;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          const write = original === null || original === void 0 ? void 0 : original.write;
          return {
            abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
            close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
            write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
            type
          };
        }
        function convertUnderlyingSinkAbortCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSinkCloseCallback(fn, original, context) {
          assertFunction(fn, context);
          return () => promiseCall(fn, original, []);
        }
        function convertUnderlyingSinkStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertUnderlyingSinkWriteCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        function assertWritableStream(x2, context) {
          if (!IsWritableStream(x2)) {
            throw new TypeError(`${context} is not a WritableStream.`);
          }
        }
        function isAbortSignal2(value) {
          if (typeof value !== "object" || value === null) {
            return false;
          }
          try {
            return typeof value.aborted === "boolean";
          } catch (_a4) {
            return false;
          }
        }
        const supportsAbortController = typeof AbortController === "function";
        function createAbortController() {
          if (supportsAbortController) {
            return new AbortController();
          }
          return void 0;
        }
        class WritableStream {
          constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
            if (rawUnderlyingSink === void 0) {
              rawUnderlyingSink = null;
            } else {
              assertObject(rawUnderlyingSink, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
            InitializeWritableStream(this);
            const type = underlyingSink.type;
            if (type !== void 0) {
              throw new RangeError("Invalid type is specified");
            }
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
          }
          get locked() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("locked");
            }
            return IsWritableStreamLocked(this);
          }
          abort(reason = void 0) {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("abort"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
            }
            return WritableStreamAbort(this, reason);
          }
          close() {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("close"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
            }
            if (WritableStreamCloseQueuedOrInFlight(this)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamClose(this);
          }
          getWriter() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("getWriter");
            }
            return AcquireWritableStreamDefaultWriter(this);
          }
        }
        Object.defineProperties(WritableStream.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          getWriter: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStream",
            configurable: true
          });
        }
        function AcquireWritableStreamDefaultWriter(stream) {
          return new WritableStreamDefaultWriter(stream);
        }
        function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(WritableStream.prototype);
          InitializeWritableStream(stream);
          const controller = Object.create(WritableStreamDefaultController.prototype);
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function InitializeWritableStream(stream) {
          stream._state = "writable";
          stream._storedError = void 0;
          stream._writer = void 0;
          stream._writableStreamController = void 0;
          stream._writeRequests = new SimpleQueue();
          stream._inFlightWriteRequest = void 0;
          stream._closeRequest = void 0;
          stream._inFlightCloseRequest = void 0;
          stream._pendingAbortRequest = void 0;
          stream._backpressure = false;
        }
        function IsWritableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
            return false;
          }
          return x2 instanceof WritableStream;
        }
        function IsWritableStreamLocked(stream) {
          if (stream._writer === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamAbort(stream, reason) {
          var _a4;
          if (stream._state === "closed" || stream._state === "errored") {
            return promiseResolvedWith(void 0);
          }
          stream._writableStreamController._abortReason = reason;
          (_a4 = stream._writableStreamController._abortController) === null || _a4 === void 0 ? void 0 : _a4.abort();
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseResolvedWith(void 0);
          }
          if (stream._pendingAbortRequest !== void 0) {
            return stream._pendingAbortRequest._promise;
          }
          let wasAlreadyErroring = false;
          if (state === "erroring") {
            wasAlreadyErroring = true;
            reason = void 0;
          }
          const promise = newPromise((resolve2, reject) => {
            stream._pendingAbortRequest = {
              _promise: void 0,
              _resolve: resolve2,
              _reject: reject,
              _reason: reason,
              _wasAlreadyErroring: wasAlreadyErroring
            };
          });
          stream._pendingAbortRequest._promise = promise;
          if (!wasAlreadyErroring) {
            WritableStreamStartErroring(stream, reason);
          }
          return promise;
        }
        function WritableStreamClose(stream) {
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
          }
          const promise = newPromise((resolve2, reject) => {
            const closeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._closeRequest = closeRequest;
          });
          const writer = stream._writer;
          if (writer !== void 0 && stream._backpressure && state === "writable") {
            defaultWriterReadyPromiseResolve(writer);
          }
          WritableStreamDefaultControllerClose(stream._writableStreamController);
          return promise;
        }
        function WritableStreamAddWriteRequest(stream) {
          const promise = newPromise((resolve2, reject) => {
            const writeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._writeRequests.push(writeRequest);
          });
          return promise;
        }
        function WritableStreamDealWithRejection(stream, error2) {
          const state = stream._state;
          if (state === "writable") {
            WritableStreamStartErroring(stream, error2);
            return;
          }
          WritableStreamFinishErroring(stream);
        }
        function WritableStreamStartErroring(stream, reason) {
          const controller = stream._writableStreamController;
          stream._state = "erroring";
          stream._storedError = reason;
          const writer = stream._writer;
          if (writer !== void 0) {
            WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
          }
          if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
            WritableStreamFinishErroring(stream);
          }
        }
        function WritableStreamFinishErroring(stream) {
          stream._state = "errored";
          stream._writableStreamController[ErrorSteps]();
          const storedError = stream._storedError;
          stream._writeRequests.forEach((writeRequest) => {
            writeRequest._reject(storedError);
          });
          stream._writeRequests = new SimpleQueue();
          if (stream._pendingAbortRequest === void 0) {
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const abortRequest = stream._pendingAbortRequest;
          stream._pendingAbortRequest = void 0;
          if (abortRequest._wasAlreadyErroring) {
            abortRequest._reject(storedError);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
          uponPromise(promise, () => {
            abortRequest._resolve();
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          }, (reason) => {
            abortRequest._reject(reason);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          });
        }
        function WritableStreamFinishInFlightWrite(stream) {
          stream._inFlightWriteRequest._resolve(void 0);
          stream._inFlightWriteRequest = void 0;
        }
        function WritableStreamFinishInFlightWriteWithError(stream, error2) {
          stream._inFlightWriteRequest._reject(error2);
          stream._inFlightWriteRequest = void 0;
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamFinishInFlightClose(stream) {
          stream._inFlightCloseRequest._resolve(void 0);
          stream._inFlightCloseRequest = void 0;
          const state = stream._state;
          if (state === "erroring") {
            stream._storedError = void 0;
            if (stream._pendingAbortRequest !== void 0) {
              stream._pendingAbortRequest._resolve();
              stream._pendingAbortRequest = void 0;
            }
          }
          stream._state = "closed";
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseResolve(writer);
          }
        }
        function WritableStreamFinishInFlightCloseWithError(stream, error2) {
          stream._inFlightCloseRequest._reject(error2);
          stream._inFlightCloseRequest = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._reject(error2);
            stream._pendingAbortRequest = void 0;
          }
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamCloseQueuedOrInFlight(stream) {
          if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamHasOperationMarkedInFlight(stream) {
          if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamMarkCloseRequestInFlight(stream) {
          stream._inFlightCloseRequest = stream._closeRequest;
          stream._closeRequest = void 0;
        }
        function WritableStreamMarkFirstWriteRequestInFlight(stream) {
          stream._inFlightWriteRequest = stream._writeRequests.shift();
        }
        function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
          if (stream._closeRequest !== void 0) {
            stream._closeRequest._reject(stream._storedError);
            stream._closeRequest = void 0;
          }
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseReject(writer, stream._storedError);
          }
        }
        function WritableStreamUpdateBackpressure(stream, backpressure) {
          const writer = stream._writer;
          if (writer !== void 0 && backpressure !== stream._backpressure) {
            if (backpressure) {
              defaultWriterReadyPromiseReset(writer);
            } else {
              defaultWriterReadyPromiseResolve(writer);
            }
          }
          stream._backpressure = backpressure;
        }
        class WritableStreamDefaultWriter {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
            assertWritableStream(stream, "First parameter");
            if (IsWritableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive writing by another writer");
            }
            this._ownerWritableStream = stream;
            stream._writer = this;
            const state = stream._state;
            if (state === "writable") {
              if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
                defaultWriterReadyPromiseInitialize(this);
              } else {
                defaultWriterReadyPromiseInitializeAsResolved(this);
              }
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "erroring") {
              defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "closed") {
              defaultWriterReadyPromiseInitializeAsResolved(this);
              defaultWriterClosedPromiseInitializeAsResolved(this);
            } else {
              const storedError = stream._storedError;
              defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
              defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
            }
          }
          get closed() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          get desiredSize() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("desiredSize");
            }
            if (this._ownerWritableStream === void 0) {
              throw defaultWriterLockException("desiredSize");
            }
            return WritableStreamDefaultWriterGetDesiredSize(this);
          }
          get ready() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
            }
            return this._readyPromise;
          }
          abort(reason = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("abort"));
            }
            return WritableStreamDefaultWriterAbort(this, reason);
          }
          close() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("close"));
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("close"));
            }
            if (WritableStreamCloseQueuedOrInFlight(stream)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamDefaultWriterClose(this);
          }
          releaseLock() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("releaseLock");
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return;
            }
            WritableStreamDefaultWriterRelease(this);
          }
          write(chunk = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("write"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("write to"));
            }
            return WritableStreamDefaultWriterWrite(this, chunk);
          }
        }
        Object.defineProperties(WritableStreamDefaultWriter.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          releaseLock: { enumerable: true },
          write: { enumerable: true },
          closed: { enumerable: true },
          desiredSize: { enumerable: true },
          ready: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultWriter",
            configurable: true
          });
        }
        function IsWritableStreamDefaultWriter(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultWriter;
        }
        function WritableStreamDefaultWriterAbort(writer, reason) {
          const stream = writer._ownerWritableStream;
          return WritableStreamAbort(stream, reason);
        }
        function WritableStreamDefaultWriterClose(writer) {
          const stream = writer._ownerWritableStream;
          return WritableStreamClose(stream);
        }
        function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          return WritableStreamDefaultWriterClose(writer);
        }
        function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error2) {
          if (writer._closedPromiseState === "pending") {
            defaultWriterClosedPromiseReject(writer, error2);
          } else {
            defaultWriterClosedPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error2) {
          if (writer._readyPromiseState === "pending") {
            defaultWriterReadyPromiseReject(writer, error2);
          } else {
            defaultWriterReadyPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterGetDesiredSize(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (state === "errored" || state === "erroring") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
        }
        function WritableStreamDefaultWriterRelease(writer) {
          const stream = writer._ownerWritableStream;
          const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
          WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
          stream._writer = void 0;
          writer._ownerWritableStream = void 0;
        }
        function WritableStreamDefaultWriterWrite(writer, chunk) {
          const stream = writer._ownerWritableStream;
          const controller = stream._writableStreamController;
          const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
          if (stream !== writer._ownerWritableStream) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          const state = stream._state;
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
          }
          if (state === "erroring") {
            return promiseRejectedWith(stream._storedError);
          }
          const promise = WritableStreamAddWriteRequest(stream);
          WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
          return promise;
        }
        const closeSentinel = {};
        class WritableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get abortReason() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("abortReason");
            }
            return this._abortReason;
          }
          get signal() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("signal");
            }
            if (this._abortController === void 0) {
              throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
            }
            return this._abortController.signal;
          }
          error(e2 = void 0) {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("error");
            }
            const state = this._controlledWritableStream._state;
            if (state !== "writable") {
              return;
            }
            WritableStreamDefaultControllerError(this, e2);
          }
          [AbortSteps](reason) {
            const result = this._abortAlgorithm(reason);
            WritableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [ErrorSteps]() {
            ResetQueue(this);
          }
        }
        Object.defineProperties(WritableStreamDefaultController.prototype, {
          abortReason: { enumerable: true },
          signal: { enumerable: true },
          error: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultController",
            configurable: true
          });
        }
        function IsWritableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultController;
        }
        function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledWritableStream = stream;
          stream._writableStreamController = controller;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._abortReason = void 0;
          controller._abortController = createAbortController();
          controller._started = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._writeAlgorithm = writeAlgorithm;
          controller._closeAlgorithm = closeAlgorithm;
          controller._abortAlgorithm = abortAlgorithm;
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
          const startResult = startAlgorithm();
          const startPromise = promiseResolvedWith(startResult);
          uponPromise(startPromise, () => {
            controller._started = true;
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (r2) => {
            controller._started = true;
            WritableStreamDealWithRejection(stream, r2);
          });
        }
        function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(WritableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let writeAlgorithm = () => promiseResolvedWith(void 0);
          let closeAlgorithm = () => promiseResolvedWith(void 0);
          let abortAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSink.start !== void 0) {
            startAlgorithm = () => underlyingSink.start(controller);
          }
          if (underlyingSink.write !== void 0) {
            writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
          }
          if (underlyingSink.close !== void 0) {
            closeAlgorithm = () => underlyingSink.close();
          }
          if (underlyingSink.abort !== void 0) {
            abortAlgorithm = (reason) => underlyingSink.abort(reason);
          }
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function WritableStreamDefaultControllerClearAlgorithms(controller) {
          controller._writeAlgorithm = void 0;
          controller._closeAlgorithm = void 0;
          controller._abortAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function WritableStreamDefaultControllerClose(controller) {
          EnqueueValueWithSize(controller, closeSentinel, 0);
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
          try {
            return controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
            return 1;
          }
        }
        function WritableStreamDefaultControllerGetDesiredSize(controller) {
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
            return;
          }
          const stream = controller._controlledWritableStream;
          if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
          const stream = controller._controlledWritableStream;
          if (!controller._started) {
            return;
          }
          if (stream._inFlightWriteRequest !== void 0) {
            return;
          }
          const state = stream._state;
          if (state === "erroring") {
            WritableStreamFinishErroring(stream);
            return;
          }
          if (controller._queue.length === 0) {
            return;
          }
          const value = PeekQueueValue(controller);
          if (value === closeSentinel) {
            WritableStreamDefaultControllerProcessClose(controller);
          } else {
            WritableStreamDefaultControllerProcessWrite(controller, value);
          }
        }
        function WritableStreamDefaultControllerErrorIfNeeded(controller, error2) {
          if (controller._controlledWritableStream._state === "writable") {
            WritableStreamDefaultControllerError(controller, error2);
          }
        }
        function WritableStreamDefaultControllerProcessClose(controller) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkCloseRequestInFlight(stream);
          DequeueValue(controller);
          const sinkClosePromise = controller._closeAlgorithm();
          WritableStreamDefaultControllerClearAlgorithms(controller);
          uponPromise(sinkClosePromise, () => {
            WritableStreamFinishInFlightClose(stream);
          }, (reason) => {
            WritableStreamFinishInFlightCloseWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkFirstWriteRequestInFlight(stream);
          const sinkWritePromise = controller._writeAlgorithm(chunk);
          uponPromise(sinkWritePromise, () => {
            WritableStreamFinishInFlightWrite(stream);
            const state = stream._state;
            DequeueValue(controller);
            if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
              const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
              WritableStreamUpdateBackpressure(stream, backpressure);
            }
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (reason) => {
            if (stream._state === "writable") {
              WritableStreamDefaultControllerClearAlgorithms(controller);
            }
            WritableStreamFinishInFlightWriteWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerGetBackpressure(controller) {
          const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
          return desiredSize <= 0;
        }
        function WritableStreamDefaultControllerError(controller, error2) {
          const stream = controller._controlledWritableStream;
          WritableStreamDefaultControllerClearAlgorithms(controller);
          WritableStreamStartErroring(stream, error2);
        }
        function streamBrandCheckException$2(name) {
          return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
        }
        function defaultControllerBrandCheckException$2(name) {
          return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
        }
        function defaultWriterBrandCheckException(name) {
          return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
        }
        function defaultWriterLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released writer");
        }
        function defaultWriterClosedPromiseInitialize(writer) {
          writer._closedPromise = newPromise((resolve2, reject) => {
            writer._closedPromise_resolve = resolve2;
            writer._closedPromise_reject = reject;
            writer._closedPromiseState = "pending";
          });
        }
        function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseReject(writer, reason);
        }
        function defaultWriterClosedPromiseInitializeAsResolved(writer) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseResolve(writer);
        }
        function defaultWriterClosedPromiseReject(writer, reason) {
          if (writer._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._closedPromise);
          writer._closedPromise_reject(reason);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "rejected";
        }
        function defaultWriterClosedPromiseResetToRejected(writer, reason) {
          defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterClosedPromiseResolve(writer) {
          if (writer._closedPromise_resolve === void 0) {
            return;
          }
          writer._closedPromise_resolve(void 0);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "resolved";
        }
        function defaultWriterReadyPromiseInitialize(writer) {
          writer._readyPromise = newPromise((resolve2, reject) => {
            writer._readyPromise_resolve = resolve2;
            writer._readyPromise_reject = reject;
          });
          writer._readyPromiseState = "pending";
        }
        function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseReject(writer, reason);
        }
        function defaultWriterReadyPromiseInitializeAsResolved(writer) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseResolve(writer);
        }
        function defaultWriterReadyPromiseReject(writer, reason) {
          if (writer._readyPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._readyPromise);
          writer._readyPromise_reject(reason);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "rejected";
        }
        function defaultWriterReadyPromiseReset(writer) {
          defaultWriterReadyPromiseInitialize(writer);
        }
        function defaultWriterReadyPromiseResetToRejected(writer, reason) {
          defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterReadyPromiseResolve(writer) {
          if (writer._readyPromise_resolve === void 0) {
            return;
          }
          writer._readyPromise_resolve(void 0);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "fulfilled";
        }
        const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
        function isDOMExceptionConstructor(ctor) {
          if (!(typeof ctor === "function" || typeof ctor === "object")) {
            return false;
          }
          try {
            new ctor();
            return true;
          } catch (_a4) {
            return false;
          }
        }
        function createDOMExceptionPolyfill() {
          const ctor = function DOMException2(message, name) {
            this.message = message || "";
            this.name = name || "Error";
            if (Error.captureStackTrace) {
              Error.captureStackTrace(this, this.constructor);
            }
          };
          ctor.prototype = Object.create(Error.prototype);
          Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
          return ctor;
        }
        const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
        function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
          const reader = AcquireReadableStreamDefaultReader(source);
          const writer = AcquireWritableStreamDefaultWriter(dest);
          source._disturbed = true;
          let shuttingDown = false;
          let currentWrite = promiseResolvedWith(void 0);
          return newPromise((resolve2, reject) => {
            let abortAlgorithm;
            if (signal !== void 0) {
              abortAlgorithm = () => {
                const error2 = new DOMException$1("Aborted", "AbortError");
                const actions = [];
                if (!preventAbort) {
                  actions.push(() => {
                    if (dest._state === "writable") {
                      return WritableStreamAbort(dest, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                if (!preventCancel) {
                  actions.push(() => {
                    if (source._state === "readable") {
                      return ReadableStreamCancel(source, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error2);
              };
              if (signal.aborted) {
                abortAlgorithm();
                return;
              }
              signal.addEventListener("abort", abortAlgorithm);
            }
            function pipeLoop() {
              return newPromise((resolveLoop, rejectLoop) => {
                function next(done) {
                  if (done) {
                    resolveLoop();
                  } else {
                    PerformPromiseThen(pipeStep(), next, rejectLoop);
                  }
                }
                next(false);
              });
            }
            function pipeStep() {
              if (shuttingDown) {
                return promiseResolvedWith(true);
              }
              return PerformPromiseThen(writer._readyPromise, () => {
                return newPromise((resolveRead, rejectRead) => {
                  ReadableStreamDefaultReaderRead(reader, {
                    _chunkSteps: (chunk) => {
                      currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop4);
                      resolveRead(false);
                    },
                    _closeSteps: () => resolveRead(true),
                    _errorSteps: rejectRead
                  });
                });
              });
            }
            isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
              if (!preventAbort) {
                shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesClosed(source, reader._closedPromise, () => {
              if (!preventClose) {
                shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
              } else {
                shutdown();
              }
            });
            if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
              const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
              } else {
                shutdown(true, destClosed);
              }
            }
            setPromiseIsHandledToTrue(pipeLoop());
            function waitForWritesToFinish() {
              const oldCurrentWrite = currentWrite;
              return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
            }
            function isOrBecomesErrored(stream, promise, action) {
              if (stream._state === "errored") {
                action(stream._storedError);
              } else {
                uponRejection(promise, action);
              }
            }
            function isOrBecomesClosed(stream, promise, action) {
              if (stream._state === "closed") {
                action();
              } else {
                uponFulfillment(promise, action);
              }
            }
            function shutdownWithAction(action, originalIsError, originalError) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), doTheRest);
              } else {
                doTheRest();
              }
              function doTheRest() {
                uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
              }
            }
            function shutdown(isError, error2) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error2));
              } else {
                finalize(isError, error2);
              }
            }
            function finalize(isError, error2) {
              WritableStreamDefaultWriterRelease(writer);
              ReadableStreamReaderGenericRelease(reader);
              if (signal !== void 0) {
                signal.removeEventListener("abort", abortAlgorithm);
              }
              if (isError) {
                reject(error2);
              } else {
                resolve2(void 0);
              }
            }
          });
        }
        class ReadableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("desiredSize");
            }
            return ReadableStreamDefaultControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("close");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits close");
            }
            ReadableStreamDefaultControllerClose(this);
          }
          enqueue(chunk = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("enqueue");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits enqueue");
            }
            return ReadableStreamDefaultControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("error");
            }
            ReadableStreamDefaultControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableStream;
            if (this._queue.length > 0) {
              const chunk = DequeueValue(this);
              if (this._closeRequested && this._queue.length === 0) {
                ReadableStreamDefaultControllerClearAlgorithms(this);
                ReadableStreamClose(stream);
              } else {
                ReadableStreamDefaultControllerCallPullIfNeeded(this);
              }
              readRequest._chunkSteps(chunk);
            } else {
              ReadableStreamAddReadRequest(stream, readRequest);
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
          }
        }
        Object.defineProperties(ReadableStreamDefaultController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultController",
            configurable: true
          });
        }
        function IsReadableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultController;
        }
        function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableStreamDefaultControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableStreamDefaultControllerError(controller, e2);
          });
        }
        function ReadableStreamDefaultControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableStream;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableStreamDefaultControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function ReadableStreamDefaultControllerClose(controller) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          controller._closeRequested = true;
          if (controller._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(controller);
            ReadableStreamClose(stream);
          }
        }
        function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            ReadableStreamFulfillReadRequest(stream, chunk, false);
          } else {
            let chunkSize;
            try {
              chunkSize = controller._strategySizeAlgorithm(chunk);
            } catch (chunkSizeE) {
              ReadableStreamDefaultControllerError(controller, chunkSizeE);
              throw chunkSizeE;
            }
            try {
              EnqueueValueWithSize(controller, chunk, chunkSize);
            } catch (enqueueE) {
              ReadableStreamDefaultControllerError(controller, enqueueE);
              throw enqueueE;
            }
          }
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }
        function ReadableStreamDefaultControllerError(controller, e2) {
          const stream = controller._controlledReadableStream;
          if (stream._state !== "readable") {
            return;
          }
          ResetQueue(controller);
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableStreamDefaultControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableStreamDefaultControllerHasBackpressure(controller) {
          if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
            return false;
          }
          return true;
        }
        function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
          const state = controller._controlledReadableStream._state;
          if (!controller._closeRequested && state === "readable") {
            return true;
          }
          return false;
        }
        function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledReadableStream = stream;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._started = false;
          controller._closeRequested = false;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableStreamDefaultControllerError(controller, r2);
          });
        }
        function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSource.start !== void 0) {
            startAlgorithm = () => underlyingSource.start(controller);
          }
          if (underlyingSource.pull !== void 0) {
            pullAlgorithm = () => underlyingSource.pull(controller);
          }
          if (underlyingSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
          }
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function defaultControllerBrandCheckException$1(name) {
          return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
        }
        function ReadableStreamTee(stream, cloneForBranch2) {
          if (IsReadableByteStreamController(stream._readableStreamController)) {
            return ReadableByteStreamTee(stream);
          }
          return ReadableStreamDefaultTee(stream);
        }
        function ReadableStreamDefaultTee(stream, cloneForBranch2) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgain = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function pullAlgorithm() {
            if (reading) {
              readAgain = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgain = false;
                  const chunk1 = chunk;
                  const chunk2 = chunk;
                  if (!canceled1) {
                    ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgain) {
                    pullAlgorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableStreamDefaultControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerClose(branch2._readableStreamController);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
          }
          branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
          branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
          uponRejection(reader._closedPromise, (r2) => {
            ReadableStreamDefaultControllerError(branch1._readableStreamController, r2);
            ReadableStreamDefaultControllerError(branch2._readableStreamController, r2);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          });
          return [branch1, branch2];
        }
        function ReadableByteStreamTee(stream) {
          let reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgainForBranch1 = false;
          let readAgainForBranch2 = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function forwardReaderError(thisReader) {
            uponRejection(thisReader._closedPromise, (r2) => {
              if (thisReader !== reader) {
                return;
              }
              ReadableByteStreamControllerError(branch1._readableStreamController, r2);
              ReadableByteStreamControllerError(branch2._readableStreamController, r2);
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            });
          }
          function pullWithDefaultReader() {
            if (IsReadableStreamBYOBReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamDefaultReader(stream);
              forwardReaderError(reader);
            }
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const chunk1 = chunk;
                  let chunk2 = chunk;
                  if (!canceled1 && !canceled2) {
                    try {
                      chunk2 = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                  }
                  if (!canceled1) {
                    ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableByteStreamControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerClose(branch2._readableStreamController);
                }
                if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
                }
                if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
          }
          function pullWithBYOBReader(view, forBranch2) {
            if (IsReadableStreamDefaultReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamBYOBReader(stream);
              forwardReaderError(reader);
            }
            const byobBranch = forBranch2 ? branch2 : branch1;
            const otherBranch = forBranch2 ? branch1 : branch2;
            const readIntoRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const byobCanceled = forBranch2 ? canceled2 : canceled1;
                  const otherCanceled = forBranch2 ? canceled1 : canceled2;
                  if (!otherCanceled) {
                    let clonedChunk;
                    try {
                      clonedChunk = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                    if (!byobCanceled) {
                      ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                    }
                    ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                  } else if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: (chunk) => {
                reading = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!byobCanceled) {
                  ReadableByteStreamControllerClose(byobBranch._readableStreamController);
                }
                if (!otherCanceled) {
                  ReadableByteStreamControllerClose(otherBranch._readableStreamController);
                }
                if (chunk !== void 0) {
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                    ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                  }
                }
                if (!byobCanceled || !otherCanceled) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
          }
          function pull1Algorithm() {
            if (reading) {
              readAgainForBranch1 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, false);
            }
            return promiseResolvedWith(void 0);
          }
          function pull2Algorithm() {
            if (reading) {
              readAgainForBranch2 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, true);
            }
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
            return;
          }
          branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
          branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
          forwardReaderError(reader);
          return [branch1, branch2];
        }
        function convertUnderlyingDefaultOrByteSource(source, context) {
          assertDictionary(source, context);
          const original = source;
          const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
          const cancel = original === null || original === void 0 ? void 0 : original.cancel;
          const pull = original === null || original === void 0 ? void 0 : original.pull;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          return {
            autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
            cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
            pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
            type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
          };
        }
        function convertUnderlyingSourceCancelCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSourcePullCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertUnderlyingSourceStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertReadableStreamType(type, context) {
          type = `${type}`;
          if (type !== "bytes") {
            throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
          }
          return type;
        }
        function convertReaderOptions(options, context) {
          assertDictionary(options, context);
          const mode = options === null || options === void 0 ? void 0 : options.mode;
          return {
            mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
          };
        }
        function convertReadableStreamReaderMode(mode, context) {
          mode = `${mode}`;
          if (mode !== "byob") {
            throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
          }
          return mode;
        }
        function convertIteratorOptions(options, context) {
          assertDictionary(options, context);
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          return { preventCancel: Boolean(preventCancel) };
        }
        function convertPipeOptions(options, context) {
          assertDictionary(options, context);
          const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
          const signal = options === null || options === void 0 ? void 0 : options.signal;
          if (signal !== void 0) {
            assertAbortSignal(signal, `${context} has member 'signal' that`);
          }
          return {
            preventAbort: Boolean(preventAbort),
            preventCancel: Boolean(preventCancel),
            preventClose: Boolean(preventClose),
            signal
          };
        }
        function assertAbortSignal(signal, context) {
          if (!isAbortSignal2(signal)) {
            throw new TypeError(`${context} is not an AbortSignal.`);
          }
        }
        function convertReadableWritablePair(pair, context) {
          assertDictionary(pair, context);
          const readable2 = pair === null || pair === void 0 ? void 0 : pair.readable;
          assertRequiredField(readable2, "readable", "ReadableWritablePair");
          assertReadableStream(readable2, `${context} has member 'readable' that`);
          const writable2 = pair === null || pair === void 0 ? void 0 : pair.writable;
          assertRequiredField(writable2, "writable", "ReadableWritablePair");
          assertWritableStream(writable2, `${context} has member 'writable' that`);
          return { readable: readable2, writable: writable2 };
        }
        class ReadableStream2 {
          constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
            if (rawUnderlyingSource === void 0) {
              rawUnderlyingSource = null;
            } else {
              assertObject(rawUnderlyingSource, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
            InitializeReadableStream(this);
            if (underlyingSource.type === "bytes") {
              if (strategy.size !== void 0) {
                throw new RangeError("The strategy for a byte stream cannot have a size function");
              }
              const highWaterMark = ExtractHighWaterMark(strategy, 0);
              SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
            } else {
              const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
              const highWaterMark = ExtractHighWaterMark(strategy, 1);
              SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
            }
          }
          get locked() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("locked");
            }
            return IsReadableStreamLocked(this);
          }
          cancel(reason = void 0) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("cancel"));
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
            }
            return ReadableStreamCancel(this, reason);
          }
          getReader(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("getReader");
            }
            const options = convertReaderOptions(rawOptions, "First parameter");
            if (options.mode === void 0) {
              return AcquireReadableStreamDefaultReader(this);
            }
            return AcquireReadableStreamBYOBReader(this);
          }
          pipeThrough(rawTransform, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("pipeThrough");
            }
            assertRequiredArgument(rawTransform, 1, "pipeThrough");
            const transform = convertReadableWritablePair(rawTransform, "First parameter");
            const options = convertPipeOptions(rawOptions, "Second parameter");
            if (IsReadableStreamLocked(this)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
            }
            if (IsWritableStreamLocked(transform.writable)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
            }
            const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
            setPromiseIsHandledToTrue(promise);
            return transform.readable;
          }
          pipeTo(destination, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
            }
            if (destination === void 0) {
              return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
            }
            if (!IsWritableStream(destination)) {
              return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
            }
            let options;
            try {
              options = convertPipeOptions(rawOptions, "Second parameter");
            } catch (e2) {
              return promiseRejectedWith(e2);
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
            }
            if (IsWritableStreamLocked(destination)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
            }
            return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
          }
          tee() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("tee");
            }
            const branches = ReadableStreamTee(this);
            return CreateArrayFromList(branches);
          }
          values(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("values");
            }
            const options = convertIteratorOptions(rawOptions, "First parameter");
            return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
          }
        }
        Object.defineProperties(ReadableStream2.prototype, {
          cancel: { enumerable: true },
          getReader: { enumerable: true },
          pipeThrough: { enumerable: true },
          pipeTo: { enumerable: true },
          tee: { enumerable: true },
          values: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStream",
            configurable: true
          });
        }
        if (typeof SymbolPolyfill.asyncIterator === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
            value: ReadableStream2.prototype.values,
            writable: true,
            configurable: true
          });
        }
        function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableByteStreamController.prototype);
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
          return stream;
        }
        function InitializeReadableStream(stream) {
          stream._state = "readable";
          stream._reader = void 0;
          stream._storedError = void 0;
          stream._disturbed = false;
        }
        function IsReadableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStream2;
        }
        function IsReadableStreamLocked(stream) {
          if (stream._reader === void 0) {
            return false;
          }
          return true;
        }
        function ReadableStreamCancel(stream, reason) {
          stream._disturbed = true;
          if (stream._state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (stream._state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          ReadableStreamClose(stream);
          const reader = stream._reader;
          if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._closeSteps(void 0);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
          const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
          return transformPromiseWith(sourceCancelPromise, noop4);
        }
        function ReadableStreamClose(stream) {
          stream._state = "closed";
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseResolve(reader);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._closeSteps();
            });
            reader._readRequests = new SimpleQueue();
          }
        }
        function ReadableStreamError(stream, e2) {
          stream._state = "errored";
          stream._storedError = e2;
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseReject(reader, e2);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._errorSteps(e2);
            });
            reader._readRequests = new SimpleQueue();
          } else {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._errorSteps(e2);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
        }
        function streamBrandCheckException$1(name) {
          return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
        }
        function convertQueuingStrategyInit(init2, context) {
          assertDictionary(init2, context);
          const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
          return {
            highWaterMark: convertUnrestrictedDouble(highWaterMark)
          };
        }
        const byteLengthSizeFunction = (chunk) => {
          return chunk.byteLength;
        };
        Object.defineProperty(byteLengthSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class ByteLengthQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "ByteLengthQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("highWaterMark");
            }
            return this._byteLengthQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("size");
            }
            return byteLengthSizeFunction;
          }
        }
        Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "ByteLengthQueuingStrategy",
            configurable: true
          });
        }
        function byteLengthBrandCheckException(name) {
          return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
        }
        function IsByteLengthQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof ByteLengthQueuingStrategy;
        }
        const countSizeFunction = () => {
          return 1;
        };
        Object.defineProperty(countSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class CountQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "CountQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._countQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("highWaterMark");
            }
            return this._countQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("size");
            }
            return countSizeFunction;
          }
        }
        Object.defineProperties(CountQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "CountQueuingStrategy",
            configurable: true
          });
        }
        function countBrandCheckException(name) {
          return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
        }
        function IsCountQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof CountQueuingStrategy;
        }
        function convertTransformer(original, context) {
          assertDictionary(original, context);
          const flush = original === null || original === void 0 ? void 0 : original.flush;
          const readableType = original === null || original === void 0 ? void 0 : original.readableType;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const transform = original === null || original === void 0 ? void 0 : original.transform;
          const writableType = original === null || original === void 0 ? void 0 : original.writableType;
          return {
            flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
            readableType,
            start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
            transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
            writableType
          };
        }
        function convertTransformerFlushCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertTransformerStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertTransformerTransformCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        class TransformStream {
          constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
            if (rawTransformer === void 0) {
              rawTransformer = null;
            }
            const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
            const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
            const transformer = convertTransformer(rawTransformer, "First parameter");
            if (transformer.readableType !== void 0) {
              throw new RangeError("Invalid readableType specified");
            }
            if (transformer.writableType !== void 0) {
              throw new RangeError("Invalid writableType specified");
            }
            const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
            const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
            const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
            const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
            let startPromise_resolve;
            const startPromise = newPromise((resolve2) => {
              startPromise_resolve = resolve2;
            });
            InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
            SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
            if (transformer.start !== void 0) {
              startPromise_resolve(transformer.start(this._transformStreamController));
            } else {
              startPromise_resolve(void 0);
            }
          }
          get readable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("readable");
            }
            return this._readable;
          }
          get writable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("writable");
            }
            return this._writable;
          }
        }
        Object.defineProperties(TransformStream.prototype, {
          readable: { enumerable: true },
          writable: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStream",
            configurable: true
          });
        }
        function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
          function startAlgorithm() {
            return startPromise;
          }
          function writeAlgorithm(chunk) {
            return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
          }
          function abortAlgorithm(reason) {
            return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
          }
          function closeAlgorithm() {
            return TransformStreamDefaultSinkCloseAlgorithm(stream);
          }
          stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
          function pullAlgorithm() {
            return TransformStreamDefaultSourcePullAlgorithm(stream);
          }
          function cancelAlgorithm(reason) {
            TransformStreamErrorWritableAndUnblockWrite(stream, reason);
            return promiseResolvedWith(void 0);
          }
          stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          stream._backpressure = void 0;
          stream._backpressureChangePromise = void 0;
          stream._backpressureChangePromise_resolve = void 0;
          TransformStreamSetBackpressure(stream, true);
          stream._transformStreamController = void 0;
        }
        function IsTransformStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
            return false;
          }
          return x2 instanceof TransformStream;
        }
        function TransformStreamError(stream, e2) {
          ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e2);
          TransformStreamErrorWritableAndUnblockWrite(stream, e2);
        }
        function TransformStreamErrorWritableAndUnblockWrite(stream, e2) {
          TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
          WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e2);
          if (stream._backpressure) {
            TransformStreamSetBackpressure(stream, false);
          }
        }
        function TransformStreamSetBackpressure(stream, backpressure) {
          if (stream._backpressureChangePromise !== void 0) {
            stream._backpressureChangePromise_resolve();
          }
          stream._backpressureChangePromise = newPromise((resolve2) => {
            stream._backpressureChangePromise_resolve = resolve2;
          });
          stream._backpressure = backpressure;
        }
        class TransformStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("desiredSize");
            }
            const readableController = this._controlledTransformStream._readable._readableStreamController;
            return ReadableStreamDefaultControllerGetDesiredSize(readableController);
          }
          enqueue(chunk = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("enqueue");
            }
            TransformStreamDefaultControllerEnqueue(this, chunk);
          }
          error(reason = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("error");
            }
            TransformStreamDefaultControllerError(this, reason);
          }
          terminate() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("terminate");
            }
            TransformStreamDefaultControllerTerminate(this);
          }
        }
        Object.defineProperties(TransformStreamDefaultController.prototype, {
          enqueue: { enumerable: true },
          error: { enumerable: true },
          terminate: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStreamDefaultController",
            configurable: true
          });
        }
        function IsTransformStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
            return false;
          }
          return x2 instanceof TransformStreamDefaultController;
        }
        function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
          controller._controlledTransformStream = stream;
          stream._transformStreamController = controller;
          controller._transformAlgorithm = transformAlgorithm;
          controller._flushAlgorithm = flushAlgorithm;
        }
        function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
          const controller = Object.create(TransformStreamDefaultController.prototype);
          let transformAlgorithm = (chunk) => {
            try {
              TransformStreamDefaultControllerEnqueue(controller, chunk);
              return promiseResolvedWith(void 0);
            } catch (transformResultE) {
              return promiseRejectedWith(transformResultE);
            }
          };
          let flushAlgorithm = () => promiseResolvedWith(void 0);
          if (transformer.transform !== void 0) {
            transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
          }
          if (transformer.flush !== void 0) {
            flushAlgorithm = () => transformer.flush(controller);
          }
          SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
        }
        function TransformStreamDefaultControllerClearAlgorithms(controller) {
          controller._transformAlgorithm = void 0;
          controller._flushAlgorithm = void 0;
        }
        function TransformStreamDefaultControllerEnqueue(controller, chunk) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
            throw new TypeError("Readable side is not in a state that permits enqueue");
          }
          try {
            ReadableStreamDefaultControllerEnqueue(readableController, chunk);
          } catch (e2) {
            TransformStreamErrorWritableAndUnblockWrite(stream, e2);
            throw stream._readable._storedError;
          }
          const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
          if (backpressure !== stream._backpressure) {
            TransformStreamSetBackpressure(stream, true);
          }
        }
        function TransformStreamDefaultControllerError(controller, e2) {
          TransformStreamError(controller._controlledTransformStream, e2);
        }
        function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
          const transformPromise = controller._transformAlgorithm(chunk);
          return transformPromiseWith(transformPromise, void 0, (r2) => {
            TransformStreamError(controller._controlledTransformStream, r2);
            throw r2;
          });
        }
        function TransformStreamDefaultControllerTerminate(controller) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          ReadableStreamDefaultControllerClose(readableController);
          const error2 = new TypeError("TransformStream terminated");
          TransformStreamErrorWritableAndUnblockWrite(stream, error2);
        }
        function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
          const controller = stream._transformStreamController;
          if (stream._backpressure) {
            const backpressureChangePromise = stream._backpressureChangePromise;
            return transformPromiseWith(backpressureChangePromise, () => {
              const writable2 = stream._writable;
              const state = writable2._state;
              if (state === "erroring") {
                throw writable2._storedError;
              }
              return TransformStreamDefaultControllerPerformTransform(controller, chunk);
            });
          }
          return TransformStreamDefaultControllerPerformTransform(controller, chunk);
        }
        function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
          TransformStreamError(stream, reason);
          return promiseResolvedWith(void 0);
        }
        function TransformStreamDefaultSinkCloseAlgorithm(stream) {
          const readable2 = stream._readable;
          const controller = stream._transformStreamController;
          const flushPromise = controller._flushAlgorithm();
          TransformStreamDefaultControllerClearAlgorithms(controller);
          return transformPromiseWith(flushPromise, () => {
            if (readable2._state === "errored") {
              throw readable2._storedError;
            }
            ReadableStreamDefaultControllerClose(readable2._readableStreamController);
          }, (r2) => {
            TransformStreamError(stream, r2);
            throw readable2._storedError;
          });
        }
        function TransformStreamDefaultSourcePullAlgorithm(stream) {
          TransformStreamSetBackpressure(stream, false);
          return stream._backpressureChangePromise;
        }
        function defaultControllerBrandCheckException(name) {
          return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
        }
        function streamBrandCheckException(name) {
          return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
        }
        exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
        exports2.CountQueuingStrategy = CountQueuingStrategy;
        exports2.ReadableByteStreamController = ReadableByteStreamController;
        exports2.ReadableStream = ReadableStream2;
        exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
        exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
        exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
        exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
        exports2.TransformStream = TransformStream;
        exports2.TransformStreamDefaultController = TransformStreamDefaultController;
        exports2.WritableStream = WritableStream;
        exports2.WritableStreamDefaultController = WritableStreamDefaultController;
        exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    })(ponyfill_es2018, ponyfill_es2018.exports);
    POOL_SIZE$1 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process2 = require("process");
        const { emitWarning } = process2;
        try {
          process2.emitWarning = () => {
          };
          Object.assign(globalThis, require("stream/web"));
          process2.emitWarning = emitWarning;
        } catch (error2) {
          process2.emitWarning = emitWarning;
          throw error2;
        }
      } catch (error2) {
        Object.assign(globalThis, ponyfill_es2018.exports);
      }
    }
    try {
      const { Blob: Blob2 } = require("buffer");
      if (Blob2 && !Blob2.prototype.stream) {
        Blob2.prototype.stream = function name(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE$1));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error2) {
    }
    POOL_SIZE = 65536;
    _Blob = (_a = class {
      constructor(blobParts = [], options = {}) {
        __privateAdd(this, _parts, []);
        __privateAdd(this, _type, "");
        __privateAdd(this, _size, 0);
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options !== "object" && typeof options !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options === null)
          options = {};
        const encoder2 = new TextEncoder();
        for (const element of blobParts) {
          let part;
          if (ArrayBuffer.isView(element)) {
            part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
          } else if (element instanceof ArrayBuffer) {
            part = new Uint8Array(element.slice(0));
          } else if (element instanceof _a) {
            part = element;
          } else {
            part = encoder2.encode(element);
          }
          __privateSet(this, _size, __privateGet(this, _size) + (ArrayBuffer.isView(part) ? part.byteLength : part.size));
          __privateGet(this, _parts).push(part);
        }
        const type = options.type === void 0 ? "" : String(options.type);
        __privateSet(this, _type, /^[\x20-\x7E]*$/.test(type) ? type : "");
      }
      get size() {
        return __privateGet(this, _size);
      }
      get type() {
        return __privateGet(this, _type);
      }
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator(__privateGet(this, _parts), false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of toIterator(__privateGet(this, _parts), false)) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        const it = toIterator(__privateGet(this, _parts), true);
        return new globalThis.ReadableStream({
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = __privateGet(this, _parts);
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size2;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new _a([], { type: String(type).toLowerCase() });
        __privateSet(blob, _size, span);
        __privateSet(blob, _parts, blobParts);
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    }, _parts = new WeakMap(), _type = new WeakMap(), _size = new WeakMap(), _a);
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob = _Blob;
    Blob$1 = Blob;
    _File = (_a2 = class extends Blob$1 {
      constructor(fileBits, fileName, options = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options);
        __privateAdd(this, _lastModified, 0);
        __privateAdd(this, _name, "");
        if (options === null)
          options = {};
        const lastModified = options.lastModified === void 0 ? Date.now() : Number(options.lastModified);
        if (!Number.isNaN(lastModified)) {
          __privateSet(this, _lastModified, lastModified);
        }
        __privateSet(this, _name, String(fileName));
      }
      get name() {
        return __privateGet(this, _name);
      }
      get lastModified() {
        return __privateGet(this, _lastModified);
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
    }, _lastModified = new WeakMap(), _name = new WeakMap(), _a2);
    File = _File;
    ({ toStringTag: t, iterator: i, hasInstance: h } = Symbol);
    r = Math.random;
    m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f2 = (a, b, c) => (a += "", /^(Blob|File)$/.test(b && b[t]) ? [(c = c !== void 0 ? c + "" : b[t] == "File" ? b.name : "blob", a), b.name !== c || b[t] == "blob" ? new File([b], c, b) : b] : [a, b + ""]);
    e = (c, f3) => (f3 ? c : c.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x = (n, a, e2) => {
      if (a.length < e2) {
        throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e2} arguments required, but only ${a.length} present.`);
      }
    };
    FormData = (_a3 = class {
      constructor(...a) {
        __privateAdd(this, _d, []);
        if (a.length)
          throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t]() {
        return "FormData";
      }
      [i]() {
        return this.entries();
      }
      static [h](o) {
        return o && typeof o === "object" && o[t] === "FormData" && !m.some((m2) => typeof o[m2] != "function");
      }
      append(...a) {
        x("append", arguments, 2);
        __privateGet(this, _d).push(f2(...a));
      }
      delete(a) {
        x("delete", arguments, 1);
        a += "";
        __privateSet(this, _d, __privateGet(this, _d).filter(([b]) => b !== a));
      }
      get(a) {
        x("get", arguments, 1);
        a += "";
        for (var b = __privateGet(this, _d), l = b.length, c = 0; c < l; c++)
          if (b[c][0] === a)
            return b[c][1];
        return null;
      }
      getAll(a, b) {
        x("getAll", arguments, 1);
        b = [];
        a += "";
        __privateGet(this, _d).forEach((c) => c[0] === a && b.push(c[1]));
        return b;
      }
      has(a) {
        x("has", arguments, 1);
        a += "";
        return __privateGet(this, _d).some((b) => b[0] === a);
      }
      forEach(a, b) {
        x("forEach", arguments, 1);
        for (var [c, d] of this)
          a.call(b, d, c, this);
      }
      set(...a) {
        x("set", arguments, 2);
        var b = [], c = true;
        a = f2(...a);
        __privateGet(this, _d).forEach((d) => {
          d[0] === a[0] ? c && (c = !b.push(a)) : b.push(d);
        });
        c && b.push(a);
        __privateSet(this, _d, b);
      }
      *entries() {
        yield* __privateGet(this, _d);
      }
      *keys() {
        for (var [a] of this)
          yield a;
      }
      *values() {
        for (var [, a] of this)
          yield a;
      }
    }, _d = new WeakMap(), _a3);
    FetchBaseError = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
    FetchError = class extends FetchBaseError {
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
    NAME = Symbol.toStringTag;
    isURLSearchParameters = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
    };
    isBlob = (object) => {
      return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
    };
    isAbortSignal = (object) => {
      return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
    };
    INTERNALS$2 = Symbol("Body internals");
    Body = class {
      constructor(body, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters(body)) {
          body = Buffer.from(body.toString());
        } else if (isBlob(body))
          ;
        else if (Buffer.isBuffer(body))
          ;
        else if (import_node_util2.types.isAnyArrayBuffer(body)) {
          body = Buffer.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof import_node_stream2.default)
          ;
        else if (body instanceof FormData) {
          body = formDataToBlob(body);
          boundary = body.type.split("=")[1];
        } else {
          body = Buffer.from(String(body));
        }
        let stream = body;
        if (Buffer.isBuffer(body)) {
          stream = import_node_stream2.default.Readable.from(body);
        } else if (isBlob(body)) {
          stream = import_node_stream2.default.Readable.from(body.stream());
        }
        this[INTERNALS$2] = {
          body,
          stream,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body instanceof import_node_stream2.default) {
          body.on("error", (error_) => {
            const error2 = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
            this[INTERNALS$2].error = error2;
          });
        }
      }
      get body() {
        return this[INTERNALS$2].stream;
      }
      get bodyUsed() {
        return this[INTERNALS$2].disturbed;
      }
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async formData() {
        const ct = this.headers.get("content-type");
        if (ct.startsWith("application/x-www-form-urlencoded")) {
          const formData = new FormData();
          const parameters = new URLSearchParams(await this.text());
          for (const [name, value] of parameters) {
            formData.append(name, value);
          }
          return formData;
        }
        const { toFormData: toFormData2 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
        return toFormData2(this.body, ct);
      }
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
        const buf = await this.buffer();
        return new Blob$1([buf], {
          type: ct
        });
      }
      async json() {
        const buffer = await consumeBody(this);
        return JSON.parse(buffer.toString());
      }
      async text() {
        const buffer = await consumeBody(this);
        return buffer.toString();
      }
      buffer() {
        return consumeBody(this);
      }
    };
    Body.prototype.buffer = (0, import_node_util2.deprecate)(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true }
    });
    clone = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance[INTERNALS$2];
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof import_node_stream2.default && typeof body.getBoundary !== "function") {
        p1 = new import_node_stream2.PassThrough({ highWaterMark });
        p2 = new import_node_stream2.PassThrough({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS$2].stream = p1;
        body = p2;
      }
      return body;
    };
    getNonSpecFormDataBoundary = (0, import_node_util2.deprecate)((body) => body.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167");
    extractContentType = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob(body)) {
        return body.type || null;
      }
      if (Buffer.isBuffer(body) || import_node_util2.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
        return null;
      }
      if (body instanceof FormData) {
        return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
      }
      if (body && typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
      }
      if (body instanceof import_node_stream2.default) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    getTotalBytes = (request) => {
      const { body } = request[INTERNALS$2];
      if (body === null) {
        return 0;
      }
      if (isBlob(body)) {
        return body.size;
      }
      if (Buffer.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === "function") {
        return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
      }
      return null;
    };
    writeToStream = (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else {
        body.pipe(dest);
      }
    };
    validateHeaderName = typeof import_node_http2.default.validateHeaderName === "function" ? import_node_http2.default.validateHeaderName : (name) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
        const error2 = new TypeError(`Header name must be a valid HTTP token [${name}]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw error2;
      }
    };
    validateHeaderValue = typeof import_node_http2.default.validateHeaderValue === "function" ? import_node_http2.default.validateHeaderValue : (name, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const error2 = new TypeError(`Invalid character in header content ["${name}"]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_CHAR" });
        throw error2;
      }
    };
    Headers2 = class extends URLSearchParams {
      constructor(init2) {
        let result = [];
        if (init2 instanceof Headers2) {
          const raw = init2.raw();
          for (const [name, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name, value]));
          }
        } else if (init2 == null)
          ;
        else if (typeof init2 === "object" && !import_node_util2.types.isBoxedPrimitive(init2)) {
          const method = init2[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init2));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init2].map((pair) => {
              if (typeof pair !== "object" || import_node_util2.types.isBoxedPrimitive(pair)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair];
            }).map((pair) => {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name, value]) => {
          validateHeaderName(name);
          validateHeaderValue(name, String(value));
          return [String(name).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case "append":
              case "set":
                return (name, value) => {
                  validateHeaderName(name);
                  validateHeaderValue(name, String(value));
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase(), String(value));
                };
              case "delete":
              case "has":
              case "getAll":
                return (name) => {
                  validateHeaderName(name);
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase());
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name) {
        const values = this.getAll(name);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback, thisArg = void 0) {
        for (const name of this.keys()) {
          Reflect.apply(callback, thisArg, [this.get(name), name, this]);
        }
      }
      *values() {
        for (const name of this.keys()) {
          yield this.get(name);
        }
      }
      *entries() {
        for (const name of this.keys()) {
          yield [name, this.get(name)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      raw() {
        return [...this.keys()].reduce((result, key2) => {
          result[key2] = this.getAll(key2);
          return result;
        }, {});
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key2) => {
          const values = this.getAll(key2);
          if (key2 === "host") {
            result[key2] = values[0];
          } else {
            result[key2] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(Headers2.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
      result[property] = { enumerable: true };
      return result;
    }, {}));
    redirectStatus = new Set([301, 302, 303, 307, 308]);
    isRedirect = (code) => {
      return redirectStatus.has(code);
    };
    INTERNALS$1 = Symbol("Response internals");
    Response2 = class extends Body {
      constructor(body = null, options = {}) {
        super(body, options);
        const status = options.status != null ? options.status : 200;
        const headers = new Headers2(options.headers);
        if (body !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body, this);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS$1] = {
          type: "default",
          url: options.url,
          status,
          statusText: options.statusText || "",
          headers,
          counter: options.counter,
          highWaterMark: options.highWaterMark
        };
      }
      get type() {
        return this[INTERNALS$1].type;
      }
      get url() {
        return this[INTERNALS$1].url || "";
      }
      get status() {
        return this[INTERNALS$1].status;
      }
      get ok() {
        return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
      }
      get redirected() {
        return this[INTERNALS$1].counter > 0;
      }
      get statusText() {
        return this[INTERNALS$1].statusText;
      }
      get headers() {
        return this[INTERNALS$1].headers;
      }
      get highWaterMark() {
        return this[INTERNALS$1].highWaterMark;
      }
      clone() {
        return new Response2(clone(this, this.highWaterMark), {
          type: this.type,
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size,
          highWaterMark: this.highWaterMark
        });
      }
      static redirect(url, status = 302) {
        if (!isRedirect(status)) {
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        return new Response2(null, {
          headers: {
            location: new URL(url).toString()
          },
          status
        });
      }
      static error() {
        const response = new Response2(null, { status: 0, statusText: "" });
        response[INTERNALS$1].type = "error";
        return response;
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    Object.defineProperties(Response2.prototype, {
      type: { enumerable: true },
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
    getSearch = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
      return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
    };
    ReferrerPolicy = new Set([
      "",
      "no-referrer",
      "no-referrer-when-downgrade",
      "same-origin",
      "origin",
      "strict-origin",
      "origin-when-cross-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ]);
    DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
    INTERNALS = Symbol("Request internals");
    isRequest = (object) => {
      return typeof object === "object" && typeof object[INTERNALS] === "object";
    };
    Request2 = class extends Body {
      constructor(input, init2 = {}) {
        let parsedURL;
        if (isRequest(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        if (parsedURL.username !== "" || parsedURL.password !== "") {
          throw new TypeError(`${parsedURL} is an url with embedded credentails.`);
        }
        let method = init2.method || input.method || "GET";
        method = method.toUpperCase();
        if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
        super(inputBody, {
          size: init2.size || input.size || 0
        });
        const headers = new Headers2(init2.headers || input.headers || {});
        if (inputBody !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody, this);
          if (contentType) {
            headers.set("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init2) {
          signal = init2.signal;
        }
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
        }
        let referrer = init2.referrer == null ? input.referrer : init2.referrer;
        if (referrer === "") {
          referrer = "no-referrer";
        } else if (referrer) {
          const parsedReferrer = new URL(referrer);
          referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
        } else {
          referrer = void 0;
        }
        this[INTERNALS] = {
          method,
          redirect: init2.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal,
          referrer
        };
        this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
        this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
        this.counter = init2.counter || input.counter || 0;
        this.agent = init2.agent || input.agent;
        this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
        this.referrerPolicy = init2.referrerPolicy || input.referrerPolicy || "";
      }
      get method() {
        return this[INTERNALS].method;
      }
      get url() {
        return (0, import_node_url2.format)(this[INTERNALS].parsedURL);
      }
      get headers() {
        return this[INTERNALS].headers;
      }
      get redirect() {
        return this[INTERNALS].redirect;
      }
      get signal() {
        return this[INTERNALS].signal;
      }
      get referrer() {
        if (this[INTERNALS].referrer === "no-referrer") {
          return "";
        }
        if (this[INTERNALS].referrer === "client") {
          return "about:client";
        }
        if (this[INTERNALS].referrer) {
          return this[INTERNALS].referrer.toString();
        }
        return void 0;
      }
      get referrerPolicy() {
        return this[INTERNALS].referrerPolicy;
      }
      set referrerPolicy(referrerPolicy) {
        this[INTERNALS].referrerPolicy = validateReferrerPolicy(referrerPolicy);
      }
      clone() {
        return new Request2(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request2.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true },
      referrer: { enumerable: true },
      referrerPolicy: { enumerable: true }
    });
    getNodeRequestOptions = (request) => {
      const { parsedURL } = request[INTERNALS];
      const headers = new Headers2(request[INTERNALS].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (request.referrerPolicy === "") {
        request.referrerPolicy = DEFAULT_REFERRER_POLICY;
      }
      if (request.referrer && request.referrer !== "no-referrer") {
        request[INTERNALS].referrer = determineRequestsReferrer(request);
      } else {
        request[INTERNALS].referrer = "no-referrer";
      }
      if (request[INTERNALS].referrer instanceof URL) {
        headers.set("Referer", request.referrer);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip,deflate,br");
      }
      let { agent } = request;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
      }
      const search = getSearch(parsedURL);
      const options = {
        path: parsedURL.pathname + search,
        method: request.method,
        headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent
      };
      return {
        parsedURL,
        options
      };
    };
    AbortError = class extends FetchBaseError {
      constructor(message, type = "aborted") {
        super(message, type);
      }
    };
    supportedSchemas = new Set(["data:", "http:", "https:"]);
  }
});

// .svelte-kit/output/server/chunks/index-9a0d4ca8.js
function noop2() {
}
function is_promise(value) {
  return value && typeof value === "object" && typeof value.then === "function";
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop2;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props)
    if (!keys.has(k) && k[0] !== "$")
      rest[k] = props[k];
  return rest;
}
function compute_slots(slots) {
  const result = {};
  for (const key2 in slots) {
    result[key2] = true;
  }
  return result;
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function custom_event(type, detail, bubbles = false) {
  const e2 = document.createEvent("CustomEvent");
  e2.initCustomEvent(type, bubbles, false, detail);
  return e2;
}
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail);
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
    }
  };
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function bubble(component, event) {
  const callbacks = component.$$.callbacks[event.type];
  if (callbacks) {
    callbacks.slice().forEach((fn) => fn.call(this, event));
  }
}
function spread(args, attrs_to_add) {
  const attributes = Object.assign({}, ...args);
  if (attrs_to_add) {
    const classes_to_add = attrs_to_add.classes;
    const styles_to_add = attrs_to_add.styles;
    if (classes_to_add) {
      if (attributes.class == null) {
        attributes.class = classes_to_add;
      } else {
        attributes.class += " " + classes_to_add;
      }
    }
    if (styles_to_add) {
      if (attributes.style == null) {
        attributes.style = style_object_to_string(styles_to_add);
      } else {
        attributes.style = style_object_to_string(merge_ssr_styles(attributes.style, styles_to_add));
      }
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name) => {
    if (invalid_attribute_name_character.test(name))
      return;
    const value = attributes[name];
    if (value === true)
      str += " " + name;
    else if (boolean_attributes.has(name.toLowerCase())) {
      if (value)
        str += " " + name;
    } else if (value != null) {
      str += ` ${name}="${value}"`;
    }
  });
  return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
  const style_object = {};
  for (const individual_style of style_attribute.split(";")) {
    const colon_index = individual_style.indexOf(":");
    const name = individual_style.slice(0, colon_index).trim();
    const value = individual_style.slice(colon_index + 1).trim();
    if (!name)
      continue;
    style_object[name] = value;
  }
  for (const name in style_directive) {
    const value = style_directive[name];
    if (value) {
      style_object[name] = value;
    } else {
      delete style_object[name];
    }
  }
  return style_object;
}
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function escape_attribute_value(value) {
  return typeof value === "string" ? escape(value) : value;
}
function escape_object(obj) {
  const result = {};
  for (const key2 in obj) {
    result[key2] = escape_attribute_value(obj[key2]);
  }
  return result;
}
function each(items, fn) {
  let str = "";
  for (let i2 = 0; i2 < items.length; i2 += 1) {
    str += fn(items[i2], i2);
  }
  return str;
}
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css30) => css30.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true && boolean_attributes.has(name) ? "" : `=${typeof value === "string" ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
function style_object_to_string(style_object) {
  return Object.keys(style_object).filter((key2) => style_object[key2]).map((key2) => `${key2}: ${style_object[key2]};`).join(" ");
}
function add_styles(style_object) {
  const styles = style_object_to_string(style_object);
  return styles ? ` style="${styles}"` : "";
}
var current_component, boolean_attributes, invalid_attribute_name_character, escaped, missing_component, on_destroy;
var init_index_9a0d4ca8 = __esm({
  ".svelte-kit/output/server/chunks/index-9a0d4ca8.js"() {
    Promise.resolve();
    boolean_attributes = new Set([
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ]);
    invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
    escaped = {
      '"': "&quot;",
      "'": "&#39;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;"
    };
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/BlogCard.svelte_svelte_type_style_lang-5e5f1546.js
var getStores, page, navigating;
var init_BlogCard_svelte_svelte_type_style_lang_5e5f1546 = __esm({
  ".svelte-kit/output/server/chunks/BlogCard.svelte_svelte_type_style_lang-5e5f1546.js"() {
    init_index_9a0d4ca8();
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        page: {
          subscribe: stores.page.subscribe
        },
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        get preloading() {
          console.error("stores.preloading is deprecated; use stores.navigating instead");
          return {
            subscribe: stores.navigating.subscribe
          };
        },
        session: stores.session,
        updated: stores.updated
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
    navigating = {
      subscribe(fn) {
        const store = getStores().navigating;
        return store.subscribe(fn);
      }
    };
  }
});

// .svelte-kit/output/server/chunks/Footer.svelte_svelte_type_style_lang-97644b83.js
var links, Code;
var init_Footer_svelte_svelte_type_style_lang_97644b83 = __esm({
  ".svelte-kit/output/server/chunks/Footer.svelte_svelte_type_style_lang-97644b83.js"() {
    links = {
      discord: {
        server: "PRfcdBCNRW",
        sanctuary: "714581497222398064/957368985647743036"
      },
      github: {
        owner: "FluentHub",
        repo: "FluentHub"
      }
    };
    Code = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.07 18.94l6.5-14.5a.75.75 0 011.4.52l-.04.1-6.5 14.5a.75.75 0 01-1.4-.52l.04-.1 6.5-14.5-6.5 14.5zm-5.85-7.47l4.25-4.25a.75.75 0 011.13.98l-.07.08L3.81 12l3.72 3.72a.75.75 0 01-.98 1.13l-.08-.07-4.25-4.25a.75.75 0 01-.07-.98l.07-.08 4.25-4.25-4.25 4.25zm14.25-4.25a.75.75 0 01.98-.07l.08.07 4.25 4.25c.27.27.3.68.07.98l-.07.08-4.25 4.25a.75.75 0 01-1.13-.98l.07-.08L20.19 12l-3.72-3.72a.75.75 0 010-1.06z"/></svg>';
  }
});

// .svelte-kit/output/server/chunks/internal-82ab3b7f.js
function uid(prefix) {
  return prefix + String.fromCharCode(Math.floor(Math.random() * 26) + 97) + Math.random().toString(16).slice(2) + Date.now().toString(16).split(".")[0];
}
function createEventForwarder(component, exclude = []) {
  let $on;
  let events = [];
  component.$on = (eventType, callback) => {
    let destructor = () => {
    };
    if (exclude.includes(eventType)) {
      const callbacks = component.$$.callbacks[eventType] || (component.$$.callbacks[eventType] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1)
          callbacks.splice(index, 1);
      };
    }
    if ($on) {
      destructor = $on(eventType, callback);
    } else {
      events.push([eventType, callback]);
    }
    return () => destructor();
  };
  return (node) => {
    const destructors = [];
    const forwardDestructors = {};
    const forward = (e2) => bubble(component, e2);
    $on = (eventType, callback) => {
      let handler = callback;
      let options = false;
      const off = listen(node, eventType, handler, options);
      const destructor = () => {
        off();
        const idx = destructors.indexOf(destructor);
        if (idx > -1) {
          destructors.splice(idx, 1);
        }
      };
      destructors.push(destructor);
      if (!(eventType in forwardDestructors)) {
        forwardDestructors[eventType] = listen(node, eventType, forward);
      }
      return destructor;
    };
    for (const event of events) {
      $on(event[0], event[1]);
    }
    return {
      destroy: () => {
        for (const destructor of destructors) {
          destructor();
        }
        for (let entry17 of Object.entries(forwardDestructors)) {
          entry17[1]();
        }
      }
    };
  };
}
var init_internal_82ab3b7f = __esm({
  ".svelte-kit/output/server/chunks/internal-82ab3b7f.js"() {
    init_index_9a0d4ca8();
    init_BlogCard_svelte_svelte_type_style_lang_5e5f1546();
  }
});

// .svelte-kit/output/server/chunks/TextBlock-8742300e.js
var css, TextBlock;
var init_TextBlock_8742300e = __esm({
  ".svelte-kit/output/server/chunks/TextBlock-8742300e.js"() {
    init_index_9a0d4ca8();
    init_BlogCard_svelte_svelte_type_style_lang_5e5f1546();
    css = {
      code: ".text-block.svelte-zxj483{color:currentColor;display:inline-block;margin:0;padding:0}.text-block.type-display.svelte-zxj483,.text-block.type-subtitle.svelte-zxj483,.text-block.type-title.svelte-zxj483,.text-block.type-title-large.svelte-zxj483{font-family:var(--fds-font-family-display);font-weight:600}.text-block.type-body.svelte-zxj483,.text-block.type-body-large.svelte-zxj483,.text-block.type-body-strong.svelte-zxj483{font-family:var(--fds-font-family-text)}.text-block.type-caption.svelte-zxj483{font-family:var(--fds-font-family-small);font-size:var(--fds-caption-font-size);font-weight:400;line-height:16px}.text-block.type-body.svelte-zxj483,.text-block.type-body-large.svelte-zxj483,.text-block.type-body-strong.svelte-zxj483{font-size:var(--fds-body-font-size);font-weight:400;line-height:20px}.text-block.type-body-strong.svelte-zxj483{font-weight:600}.text-block.type-body-large.svelte-zxj483{font-size:var(--fds-body-large-font-size);line-height:24px}.text-block.type-subtitle.svelte-zxj483{font-size:var(--fds-subtitle-font-size);line-height:28px}.text-block.type-title.svelte-zxj483{font-size:var(--fds-title-font-size);line-height:36px}.text-block.type-title-large.svelte-zxj483{font-size:var(--fds-title-large-font-size);line-height:52px}.text-block.type-display.svelte-zxj483{font-size:var(--fds-display-font-size);line-height:92px}",
      map: null
    };
    TextBlock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["variant", "class", "element"]);
      let { variant = "body" } = $$props;
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
        $$bindings.variant(variant);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      $$result.css.add(css);
      return `${variant === "caption" ? `<span${spread([
        {
          class: "text-block type-caption " + escape(className)
        },
        escape_object($$restProps)
      ], { classes: "svelte-zxj483" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</span>` : `${variant === "body" ? `<span${spread([
        {
          class: "text-block type-body " + escape(className)
        },
        escape_object($$restProps)
      ], { classes: "svelte-zxj483" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</span>` : `${variant === "bodyStrong" ? `<h6${spread([
        {
          class: "text-block type-body-strong " + escape(className)
        },
        escape_object($$restProps)
      ], { classes: "svelte-zxj483" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</h6>` : `${variant === "bodyLarge" ? `<h5${spread([
        {
          class: "text-block type-body-large " + escape(className)
        },
        escape_object($$restProps)
      ], { classes: "svelte-zxj483" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</h5>` : `${variant === "subtitle" ? `<h4${spread([
        {
          class: "text-block type-subtitle " + escape(className)
        },
        escape_object($$restProps)
      ], { classes: "svelte-zxj483" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</h4>` : `${variant === "title" ? `<h3${spread([
        {
          class: "text-block type-title " + escape(className)
        },
        escape_object($$restProps)
      ], { classes: "svelte-zxj483" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</h3>` : `${variant === "titleLarge" ? `<h2${spread([
        {
          class: "text-block type-title-large " + escape(className)
        },
        escape_object($$restProps)
      ], { classes: "svelte-zxj483" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</h2>` : `${variant === "display" ? `<h1${spread([
        {
          class: "text-block type-display " + escape(className)
        },
        escape_object($$restProps)
      ], { classes: "svelte-zxj483" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</h1>` : ``}`}`}`}`}`}`}`}`;
    });
  }
});

// .svelte-kit/output/server/chunks/docs-898f1134.js
var ChevronDown, css$1, ListItem, css2, TreeView, docs;
var init_docs_898f1134 = __esm({
  ".svelte-kit/output/server/chunks/docs-898f1134.js"() {
    init_index_9a0d4ca8();
    init_BlogCard_svelte_svelte_type_style_lang_5e5f1546();
    init_internal_82ab3b7f();
    init_TextBlock_8742300e();
    ChevronDown = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M3.15 5.65c.2-.2.5-.2.7 0L8 9.79l4.15-4.14a.5.5 0 01.7.7l-4.5 4.5a.5.5 0 01-.7 0l-4.5-4.5a.5.5 0 010-.7z"/></svg>';
    css$1 = {
      code: '.list-item.svelte-1ye4o7x{align-items:center;background-color:var(--fds-subtle-fill-transparent);block-size:34px;border-radius:var(--fds-control-corner-radius);box-sizing:border-box;color:var(--fds-text-primary);cursor:default;display:flex;flex:0 0 auto;inline-size:calc(100% - 10px);margin:3px 5px;outline:none;padding-inline:12px;position:relative;text-decoration:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.list-item.svelte-1ye4o7x:before{background-color:var(--fds-accent-default);block-size:16px;border-radius:3px;content:"";inline-size:3px;inset-inline-start:0;opacity:0;position:absolute;transform:scaleY(0);transition:transform var(--fds-control-fast-duration) var(--fds-control-fast-out-slow-in-easing)}.list-item.selected.svelte-1ye4o7x:before{opacity:1;transform:scaleY(1)}.list-item.svelte-1ye4o7x:focus-visible{box-shadow:var(--fds-focus-stroke)}.list-item.selected.svelte-1ye4o7x,.list-item.svelte-1ye4o7x:hover{background-color:var(--fds-subtle-fill-secondary)}.list-item.svelte-1ye4o7x:active{background-color:var(--fds-subtle-fill-tertiary);color:var(--fds-text-secondary)}.list-item.svelte-1ye4o7x:active:before{transform:scaleY(.625)}.list-item.disabled.svelte-1ye4o7x{background-color:var(--fds-subtle-fill-transparent);color:var(--fds-text-disabled);pointer-events:none}.list-item.disabled.selected.svelte-1ye4o7x{background-color:var(--fds-subtle-fill-secondary)}.list-item.disabled.selected.svelte-1ye4o7x:before{background-color:var(--fds-accent-disabled)}.list-item.svelte-1ye4o7x>svg{fill:currentColor;-webkit-margin-end:16px;block-size:auto;inline-size:16px;margin-inline-end:16px}',
      map: null
    };
    ListItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["selected", "disabled", "href", "role", "class", "element"]);
      let { selected = false } = $$props;
      let { disabled = false } = $$props;
      let { href = "" } = $$props;
      let { role = "listitem" } = $$props;
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      createEventForwarder(get_current_component(), ["select"]);
      const dispatch = createEventDispatcher();
      if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
        $$bindings.selected(selected);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      if ($$props.role === void 0 && $$bindings.role && role !== void 0)
        $$bindings.role(role);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      $$result.css.add(css$1);
      {
        if (selected)
          dispatch("select");
      }
      return `
${href && !disabled ? `<a${spread([
        {
          tabindex: escape_attribute_value(disabled ? -1 : 0)
        },
        {
          "aria-selected": escape_attribute_value(selected)
        },
        { class: "list-item " + escape(className) },
        { href: escape_attribute_value(href) },
        { role: escape_attribute_value(role) },
        escape_object($$restProps)
      ], {
        classes: (selected ? "selected" : "") + " " + (disabled ? "disabled" : "") + " svelte-1ye4o7x"
      })}${add_attribute("this", element, 0)}>${slots.icon ? slots.icon({}) : ``}
		${validate_component(TextBlock, "TextBlock").$$render($$result, {}, {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}</a>` : `<li${spread([
        {
          tabindex: escape_attribute_value(disabled ? -1 : 0)
        },
        {
          "aria-selected": escape_attribute_value(selected)
        },
        { class: "list-item " + escape(className) },
        { href: escape_attribute_value(href) },
        { role: escape_attribute_value(role) },
        escape_object($$restProps)
      ], {
        classes: (selected ? "selected" : "") + " " + (disabled ? "disabled" : "") + " svelte-1ye4o7x"
      })}${add_attribute("this", element, 0)}>${slots.icon ? slots.icon({}) : ``}
		${validate_component(TextBlock, "TextBlock").$$render($$result, {}, {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}</li>`}`;
    });
    css2 = {
      code: ".tree-view.svelte-1o56q81 .subtree.svelte-1o56q81 .list-item span{align-items:center;display:flex;inline-size:100%;justify-content:space-between}.tree-view.svelte-1o56q81 .subtree.svelte-1o56q81 .list-item span .expander-icon{align-items:center;display:flex;transform-origin:center;transition:transform var(--fds-control-fast-duration) var(--fds-control-fast-out-slow-in-easing)}.tree-view.svelte-1o56q81 .subtree.svelte-1o56q81 .list-item span .expander-icon.expanded{transform:rotate(180deg)}.tree-view.svelte-1o56q81 .subtree.svelte-1o56q81 .list-item span .expander-icon svg{fill:currentColor;block-size:auto;inline-size:14px}@media screen and (min-width:648px){.tree-view.initial.svelte-1o56q81.svelte-1o56q81{block-size:calc(100vh - 58px)}}.subtree-items.svelte-1o56q81.svelte-1o56q81{-webkit-padding-start:24px;padding-inline-start:24px}",
      map: null
    };
    TreeView = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      let { tree = [] } = $$props;
      let { initial = true } = $$props;
      let treeViewState;
      const id = (s3) => s3.toLowerCase().split(" ").join("-");
      if ($$props.tree === void 0 && $$bindings.tree && tree !== void 0)
        $$bindings.tree(tree);
      if ($$props.initial === void 0 && $$bindings.initial && initial !== void 0)
        $$bindings.initial(initial);
      $$result.css.add(css2);
      $$unsubscribe_page();
      return `<div class="${["tree-view scroller svelte-1o56q81", initial ? "initial" : ""].join(" ").trim()}">${each(tree, ({ name, path, type, pages, icon }) => {
        return `${type === "category" ? `<div class="${["subtree svelte-1o56q81", (treeViewState == null ? void 0 : treeViewState[id(name)]) ? "expanded" : ""].join(" ").trim()}">${validate_component(ListItem, "ListItem").$$render($$result, {}, {}, {
          icon: () => {
            return `<!-- HTML_TAG_START -->${icon || ""}<!-- HTML_TAG_END -->
					`;
          },
          default: () => {
            return `<span class="${"tree-view-item"}">${escape(name)}</span>
					<div class="${["expander-icon", (treeViewState == null ? void 0 : treeViewState[id(name)]) ? "expanded" : ""].join(" ").trim()}"><!-- HTML_TAG_START -->${ChevronDown}<!-- HTML_TAG_END --></div>
				`;
          }
        })}
				${(treeViewState == null ? void 0 : treeViewState[id(name)]) ? `<div class="${[
          "subtree-items svelte-1o56q81",
          (treeViewState == null ? void 0 : treeViewState[id(name)]) ? "expanded" : ""
        ].join(" ").trim()}">${validate_component(TreeView, "svelte:self").$$render($$result, { tree: pages, initial: false }, {}, {})}
					</div>` : ``}
			</div>` : `${validate_component(ListItem, "ListItem").$$render($$result, {
          selected: `/docs${path}` === $page.url.pathname,
          href: "/docs" + path
        }, {}, {
          icon: () => {
            return `<!-- HTML_TAG_START -->${icon || ""}<!-- HTML_TAG_END -->
				`;
          },
          default: () => {
            return `${escape(name)}
			`;
          }
        })}`}`;
      })}
</div>`;
    });
    docs = [
      {
        name: "Overview",
        path: ""
      },
      {
        type: "category",
        name: "Personal",
        pages: [
          {
            name: "Overview",
            path: "/personal"
          }
        ]
      },
      {
        type: "category",
        name: "Codename Depth",
        pages: [
          {
            name: "Overview",
            path: "/depth"
          },
          {
            name: "Asset Storage",
            path: "/depth/assets"
          }
        ]
      },
      {
        type: "category",
        name: "Project Fluxduct",
        pages: [
          {
            name: "Overview",
            path: "/fluxduct"
          },
          {
            name: "Style Rules",
            path: "/fluxduct/style"
          },
          {
            name: "Syntax",
            path: "/fluxduct/syntax"
          }
        ]
      }
    ];
  }
});

// .svelte-kit/output/server/chunks/utils-9a9bd3c9.js
var externalLink;
var init_utils_9a9bd3c9 = __esm({
  ".svelte-kit/output/server/chunks/utils-9a9bd3c9.js"() {
    externalLink = {
      target: "_blank",
      rel: "noreferrer noopener"
    };
  }
});

// .svelte-kit/output/server/chunks/PageSection-c7953e3b.js
var css3, PageSection;
var init_PageSection_c7953e3b = __esm({
  ".svelte-kit/output/server/chunks/PageSection-c7953e3b.js"() {
    init_index_9a0d4ca8();
    init_BlogCard_svelte_svelte_type_style_lang_5e5f1546();
    css3 = {
      code: ".page-section.svelte-xz0hqw{position:relative;z-index:1}.page-section.svelte-xz0hqw h1,.page-section.svelte-xz0hqw h2,.page-section.svelte-xz0hqw h3{color:var(--fds-text-primary);font-weight:600;margin:0}.page-section.svelte-xz0hqw h1{font-size:7.2rem}.page-section.svelte-xz0hqw h2{font-size:4.8rem}.page-section.svelte-xz0hqw h3{font-size:3.2rem}.page-section.svelte-xz0hqw p{color:var(--fds-text-secondary);font-size:1.6rem;font-weight:400;line-height:1.65;margin-block:12px 24px;max-inline-size:65ch}@media(prefers-color-scheme:dark){.page-section.svelte-xz0hqw p{color:var(--fds-text-tertiary)}}.page-section.svelte-xz0hqw hr{-webkit-border-before:1px solid var(--fds-divider-stroke-default);border:none;border-block-start:1px solid var(--fds-divider-stroke-default);margin:0 0 24px}.page-section.svelte-xz0hqw .buttons-spacer{display:inline-flex;flex-wrap:wrap;gap:8px}.page-section-inner.svelte-xz0hqw{block-size:100%;inline-size:100%;margin:0 auto;max-inline-size:2048px;padding:72px;position:relative}@media screen and (max-width:647px){.page-section-inner.svelte-xz0hqw{padding:36px}}",
      map: null
    };
    PageSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["type", "class"]);
      let $$slots = compute_slots(slots);
      let { type = void 0 } = $$props;
      let { class: className = "" } = $$props;
      if ($$props.type === void 0 && $$bindings.type && type !== void 0)
        $$bindings.type(type);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      $$result.css.add(css3);
      return `
${type === "header" ? `<header${spread([
        escape_object($$restProps),
        {
          class: "page-section" + escape(" " + className || "")
        }
      ], { classes: "svelte-xz0hqw" })}>${slots.outer ? slots.outer({}) : ``}
		${$$slots.default ? `<div class="${"page-section-inner svelte-xz0hqw"}">${slots.default ? slots.default({}) : ``}</div>` : ``}</header>` : `${type === "footer" ? `<footer${spread([
        escape_object($$restProps),
        {
          class: "page-section" + escape(" " + className || "")
        }
      ], { classes: "svelte-xz0hqw" })}>${slots.outer ? slots.outer({}) : ``}
		${$$slots.default ? `<div class="${"page-section-inner svelte-xz0hqw"}">${slots.default ? slots.default({}) : ``}</div>` : ``}</footer>` : `<section${spread([
        escape_object($$restProps),
        {
          class: "page-section" + escape(" " + className || "")
        }
      ], { classes: "svelte-xz0hqw" })}>${slots.outer ? slots.outer({}) : ``}
		${$$slots.default ? `<div class="${"page-section-inner svelte-xz0hqw"}">${slots.default ? slots.default({}) : ``}</div>` : ``}</section>`}`}`;
    });
  }
});

// .svelte-kit/output/server/chunks/Button-ab8c6742.js
var css4, Button;
var init_Button_ab8c6742 = __esm({
  ".svelte-kit/output/server/chunks/Button-ab8c6742.js"() {
    init_index_9a0d4ca8();
    init_internal_82ab3b7f();
    init_BlogCard_svelte_svelte_type_style_lang_5e5f1546();
    css4 = {
      code: ".button.svelte-1ulhukx{align-items:center;border:none;border-radius:var(--fds-control-corner-radius);box-sizing:border-box;cursor:default;display:inline-flex;font-family:var(--fds-font-family-text);font-size:var(--fds-body-font-size);font-weight:400;justify-content:center;line-height:20px;outline:none;padding-block:4px 6px;padding-inline:11px;position:relative;text-decoration:none;transition:var(--fds-control-faster-duration) ease background;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.button.svelte-1ulhukx:focus-visible{box-shadow:var(--fds-focus-stroke)}.button.style-standard.svelte-1ulhukx{background-clip:padding-box;background-color:var(--fds-control-fill-default);border:1px solid;border-color:var(--fds-control-border-default);color:var(--fds-text-primary)}.button.style-standard.svelte-1ulhukx:hover{background-color:var(--fds-control-fill-secondary)}.button.style-standard.svelte-1ulhukx:active{background-color:var(--fds-control-fill-tertiary);border-color:var(--fds-control-stroke-default);color:var(--fds-text-secondary)}.button.style-standard.disabled.svelte-1ulhukx{background-color:var(--fds-control-fill-disabled);border-color:var(--fds-control-stroke-default);color:var(--fds-text-disabled)}.button.style-accent.svelte-1ulhukx{background-color:var(--fds-accent-default);border:1px solid var(--fds-control-stroke-on-accent-default);border-bottom-color:var(--fds-control-stroke-on-accent-secondary);color:var(--fds-text-on-accent-primary);transition:var(--fds-control-faster-duration) ease border-color}.button.style-accent.svelte-1ulhukx:hover{background-color:var(--fds-accent-secondary)}.button.style-accent.svelte-1ulhukx:active{background-color:var(--fds-accent-tertiary);border-color:transparent;color:var(--fds-text-on-accent-secondary)}.button.style-accent.disabled.svelte-1ulhukx{background-color:var(--fds-accent-disabled);border-color:transparent;color:var(--fds-text-on-accent-disabled)}.button.style-hyperlink.svelte-1ulhukx{background-color:var(--fds-subtle-fill-transparent);color:var(--fds-accent-text-primary);cursor:pointer}.button.style-hyperlink.svelte-1ulhukx:hover{background-color:var(--fds-subtle-fill-secondary)}.button.style-hyperlink.svelte-1ulhukx:active{background-color:var(--fds-subtle-fill-tertiary);color:var(--fds-accent-text-tertiary)}.button.style-hyperlink.disabled.svelte-1ulhukx{color:var(--fds-accent-text-disabled)}.button.disabled.svelte-1ulhukx{pointer-events:none}",
      map: null
    };
    Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["variant", "href", "disabled", "class", "element"]);
      let { variant = "standard" } = $$props;
      let { href = "" } = $$props;
      let { disabled = false } = $$props;
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      createEventForwarder(get_current_component());
      if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
        $$bindings.variant(variant);
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      $$result.css.add(css4);
      return `
${href && !disabled ? `<a${spread([
        { role: "button" },
        {
          class: "button style-" + escape(variant) + " " + escape(className)
        },
        { href: escape_attribute_value(href) },
        escape_object($$restProps)
      ], {
        classes: (disabled ? "disabled" : "") + " svelte-1ulhukx"
      })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</a>` : `<button${spread([
        {
          class: "button style-" + escape(variant) + " " + escape(className)
        },
        { disabled: disabled || null },
        escape_object($$restProps)
      ], {
        classes: (disabled ? "disabled" : "") + " svelte-1ulhukx"
      })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</button>`}`;
    });
  }
});

// .svelte-kit/output/server/chunks/IconButton-fbace740.js
var css5, IconButton;
var init_IconButton_fbace740 = __esm({
  ".svelte-kit/output/server/chunks/IconButton-fbace740.js"() {
    init_index_9a0d4ca8();
    init_internal_82ab3b7f();
    init_BlogCard_svelte_svelte_type_style_lang_5e5f1546();
    css5 = {
      code: ".icon-button.svelte-1iys5lx{align-items:center;background-color:var(--fds-subtle-fill-transparent);border:none;border-radius:var(--fds-control-corner-radius);box-sizing:border-box;color:var(--fds-text-primary);display:inline-flex;justify-content:center;min-block-size:30px;min-inline-size:30px;outline:none;padding:8px}.icon-button.svelte-1iys5lx:focus-visible{box-shadow:var(--fds-focus-stroke)}.icon-button.svelte-1iys5lx:hover{background-color:var(--fds-subtle-fill-secondary)}.icon-button.svelte-1iys5lx:active{background-color:var(--fds-subtle-fill-tertiary);color:var(--fds-text-secondary)}.icon-button.svelte-1iys5lx:disabled{background-color:var(--fds-subtle-fill-disabled);color:var(--fds-text-disabled)}.icon-button.svelte-1iys5lx svg{fill:currentColor;block-size:auto;inline-size:16px}",
      map: null
    };
    IconButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["href", "disabled", "class", "element"]);
      let { href = "" } = $$props;
      let { disabled = false } = $$props;
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      createEventForwarder(get_current_component());
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      $$result.css.add(css5);
      return `
${href && !disabled ? `<a${spread([
        {
          class: "icon-button " + escape(className)
        },
        { href: escape_attribute_value(href) },
        escape_object($$restProps)
      ], {
        classes: (disabled ? "disabled" : "") + " svelte-1iys5lx"
      })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</a>` : `<button${spread([
        {
          class: "icon-button " + escape(className)
        },
        { disabled: disabled || null },
        escape_object($$restProps)
      ], {
        classes: (disabled ? "disabled" : "") + " svelte-1iys5lx"
      })}>${slots.default ? slots.default({}) : ``}</button>`}`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/__layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => _layout
});
var css$4, TooltipSurface, css$3, TooltipWrapper, css$2, Navbar, Discord, Github, Sanctuary, css$12, Footer, Home, Book, News, Person, Chat, css6, _layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/__layout.svelte.js"() {
    init_index_9a0d4ca8();
    init_BlogCard_svelte_svelte_type_style_lang_5e5f1546();
    init_Footer_svelte_svelte_type_style_lang_97644b83();
    init_docs_898f1134();
    init_internal_82ab3b7f();
    init_utils_9a9bd3c9();
    init_PageSection_c7953e3b();
    init_Button_ab8c6742();
    init_IconButton_fbace740();
    init_TextBlock_8742300e();
    css$4 = {
      code: ".tooltip.svelte-r7762s{align-items:center;background-clip:padding-box;background-color:var(--fds-flyout-fallback-background-default);border:1px solid var(--fds-surface-stroke-flyout);border-radius:var(--fds-control-corner-radius);box-shadow:var(--fds-tooltip-shadow);box-sizing:border-box;display:inline-flex;font-family:var(--fds-font-family-text);font-size:var(--fds-body-font-size);font-weight:400;inline-size:-webkit-max-content;inline-size:-moz-max-content;inline-size:max-content;justify-content:center;line-height:20px;max-inline-size:320px;padding-block:5px 7px;padding-inline:8px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}",
      map: null
    };
    TooltipSurface = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["class", "element"]);
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      createEventForwarder(get_current_component());
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      $$result.css.add(css$4);
      return `<div${spread([
        { class: "tooltip " + escape(className) },
        { role: "tooltip" },
        escape_object($$restProps)
      ], { classes: "svelte-r7762s" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}
</div>`;
    });
    css$3 = {
      code: ".tooltip-wrapper.svelte-e2a5n0{display:block;position:relative}.tooltip-anchor.svelte-e2a5n0{pointer-events:none;position:absolute;z-index:100}.tooltip-anchor.placement-top.svelte-e2a5n0{bottom:calc(100% + var(--fds-tooltip-offset))}.tooltip-anchor.placement-bottom.svelte-e2a5n0{top:calc(100% + var(--fds-tooltip-offset))}.tooltip-anchor.placement-left.svelte-e2a5n0{right:calc(100% + var(--fds-tooltip-offset))}.tooltip-anchor.placement-right.svelte-e2a5n0{left:calc(100% + var(--fds-tooltip-offset))}.tooltip-anchor.placement-bottom.alignment-start.svelte-e2a5n0,.tooltip-anchor.placement-top.alignment-start.svelte-e2a5n0{inset-inline-start:0}.tooltip-anchor.placement-bottom.alignment-end.svelte-e2a5n0,.tooltip-anchor.placement-top.alignment-end.svelte-e2a5n0{inset-inline-end:0}.tooltip-anchor.placement-bottom.alignment-center.svelte-e2a5n0,.tooltip-anchor.placement-top.alignment-center.svelte-e2a5n0{inset-inline-start:50%;transform:translateX(-50%)}.tooltip-anchor.placement-left.alignment-start.svelte-e2a5n0,.tooltip-anchor.placement-right.alignment-start.svelte-e2a5n0{inset-block-start:0}.tooltip-anchor.placement-left.alignment-end.svelte-e2a5n0,.tooltip-anchor.placement-right.alignment-end.svelte-e2a5n0{inset-block-end:0}.tooltip-anchor.placement-left.alignment-center.svelte-e2a5n0,.tooltip-anchor.placement-right.alignment-center.svelte-e2a5n0{inset-block-start:50%;transform:translateY(-50%)}.tooltip-anchor.placement-auto.svelte-e2a5n0{transform:translateY(-100%)}.tooltip-anchor.placement-auto.alignment-center.svelte-e2a5n0{transform:translate(-50%,-100%)}.tooltip-anchor.placement-auto.alignment-end.svelte-e2a5n0{transform:translate(-100%,-100%)}",
      map: null
    };
    TooltipWrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, [
        "text",
        "offset",
        "placement",
        "alignment",
        "followCursor",
        "persistent",
        "visible",
        "delay",
        "tooltipElement",
        "anchorElement",
        "wrapperElement"
      ]);
      let { text = "" } = $$props;
      let { offset = 24 } = $$props;
      let { placement = "auto" } = $$props;
      let { alignment = "center" } = $$props;
      let { followCursor = false } = $$props;
      let { persistent = false } = $$props;
      let { visible = false } = $$props;
      let { delay = 1e3 } = $$props;
      let { tooltipElement = null } = $$props;
      let { anchorElement = null } = $$props;
      let { wrapperElement = null } = $$props;
      let currentPosition = { x: 0, y: 0 };
      if ($$props.text === void 0 && $$bindings.text && text !== void 0)
        $$bindings.text(text);
      if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0)
        $$bindings.offset(offset);
      if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0)
        $$bindings.placement(placement);
      if ($$props.alignment === void 0 && $$bindings.alignment && alignment !== void 0)
        $$bindings.alignment(alignment);
      if ($$props.followCursor === void 0 && $$bindings.followCursor && followCursor !== void 0)
        $$bindings.followCursor(followCursor);
      if ($$props.persistent === void 0 && $$bindings.persistent && persistent !== void 0)
        $$bindings.persistent(persistent);
      if ($$props.visible === void 0 && $$bindings.visible && visible !== void 0)
        $$bindings.visible(visible);
      if ($$props.delay === void 0 && $$bindings.delay && delay !== void 0)
        $$bindings.delay(delay);
      if ($$props.tooltipElement === void 0 && $$bindings.tooltipElement && tooltipElement !== void 0)
        $$bindings.tooltipElement(tooltipElement);
      if ($$props.anchorElement === void 0 && $$bindings.anchorElement && anchorElement !== void 0)
        $$bindings.anchorElement(anchorElement);
      if ($$props.wrapperElement === void 0 && $$bindings.wrapperElement && wrapperElement !== void 0)
        $$bindings.wrapperElement(wrapperElement);
      $$result.css.add(css$3);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `

<div class="${"tooltip-wrapper svelte-e2a5n0"}"${add_attribute("title", text, 0)}${add_attribute("this", wrapperElement, 0)}>${slots.default ? slots.default({}) : ``}

	${visible ? `<div class="${"tooltip-anchor placement-" + escape(placement) + " alignment-" + escape(alignment) + " svelte-e2a5n0"}" style="${escape(placement === "auto" ? `top: calc(${currentPosition.y}px - var(--fds-tooltip-offset));
				   left: ${currentPosition.x}px;` : "") + " --fds-tooltip-offset: " + escape(offset) + "px"}"${add_attribute("this", anchorElement, 0)}>${validate_component(TooltipSurface, "TooltipSurface").$$render($$result, Object.assign($$restProps, { element: tooltipElement }), {
          element: ($$value) => {
            tooltipElement = $$value;
            $$settled = false;
          }
        }, {
          default: () => {
            return `${escape(text)}
				${slots.tooltip ? slots.tooltip({}) : ``}`;
          }
        })}</div>` : ``}
</div>`;
      } while (!$$settled);
      return $$rendered;
    });
    css$2 = {
      code: ".inner.svelte-1yfaff8.svelte-1yfaff8,.item.svelte-1yfaff8.svelte-1yfaff8,.navbar.svelte-1yfaff8.svelte-1yfaff8{align-items:center;display:flex}.navbar.svelte-1yfaff8.svelte-1yfaff8{background-color:var(--fds-solid-background-base);block-size:58px;flex:0 0 auto;justify-content:space-between;padding:12px 18px;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:10}.item.svelte-1yfaff8.svelte-1yfaff8{border-radius:var(--fds-control-corner-radius);color:var(--fds-text-secondary);font-size:1.36rem;font-weight:400;justify-content:center;margin:0 4px;padding:5px 11px 6px;text-decoration:none;transition:var(--fds-control-faster-duration) linear background-color}.item.selected.svelte-1yfaff8.svelte-1yfaff8{color:var(--fds-accent-text-primary)}.item.selected.svelte-1yfaff8.svelte-1yfaff8,.item.svelte-1yfaff8.svelte-1yfaff8:hover{background-color:var(--fds-subtle-fill-secondary)}.item.svelte-1yfaff8.svelte-1yfaff8:active{background-color:var(--fds-subtle-fill-tertiary)}.item.svelte-1yfaff8 svg{fill:currentColor;-webkit-margin-end:4px;block-size:auto;inline-size:16px;margin-inline-end:4px}.divider.svelte-1yfaff8.svelte-1yfaff8{-webkit-border-start:1px solid var(--fds-subtle-fill-secondary);block-size:30px;border-inline-start:1px solid var(--fds-subtle-fill-secondary);margin:0 8px}.logo.svelte-1yfaff8.svelte-1yfaff8{-webkit-margin-end:8px;align-items:center;color:var(--fds-text-primary);display:flex;font-size:2rem;font-weight:600;margin-inline-end:8px;text-decoration:none;transition:.1s ease}.logo.svelte-1yfaff8.svelte-1yfaff8:hover{color:var(--fds-text-secondary)}.logo.svelte-1yfaff8 img.svelte-1yfaff8{-webkit-margin-end:12px;block-size:32px;inline-size:auto;margin-inline-end:12px}.support-ukraine.svelte-1yfaff8.svelte-1yfaff8{background-color:initial;background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDgwMCI+PHBhdGggZmlsbD0iIzNhNzVjNCIgZD0iTTAgMGgxMjAwdjgwMEgweiIvPjxwYXRoIGZpbGw9IiNmOWRkMTYiIGQ9Ik0wIDQwMGgxMjAwdjQwMEgweiIvPjwvc3ZnPg==);border-radius:4px;box-sizing:border-box;display:flex;height:20px;margin:7px 5px;width:30px}.buttons.svelte-1yfaff8.svelte-1yfaff8{display:flex;z-index:1}.button.svelte-1yfaff8.svelte-1yfaff8{-webkit-margin-start:8px;align-items:center;background-color:transparent;block-size:34px;border:none;border-radius:var(--fds-control-corner-radius);color:var(--fds-text-secondary);cursor:pointer;display:flex;inline-size:34px;justify-content:center;margin-inline-start:8px;text-decoration:none}.button.svelte-1yfaff8.svelte-1yfaff8:hover{background-color:var(--fds-subtle-fill-secondary)}.button.svelte-1yfaff8.svelte-1yfaff8:active{background-color:var(--fds-subtle-fill-tertiary)}.button.svelte-1yfaff8 svg{fill:currentColor;block-size:auto;inline-size:18px;transition:transform .13s cubic-bezier(.16,.16,0,1)}.navbar .button.sidebar-button{inline-size:38px}.navbar .button.sidebar-button:active svg{transform:scaleX(.65)}.navbar .button.sidebar-button svg{inline-size:16px}.sidebar.svelte-1yfaff8.svelte-1yfaff8{-webkit-padding-before:62px;background-color:var(--fds-solid-background-base);block-size:100vh;border:1px solid var(--fds-surface-stroke-default);border-radius:var(--fds-overlay-corner-radius);display:none;inline-size:272px;inset-block-start:0;inset-inline-end:0;padding-block-start:62px;position:fixed;transform:translateX(100%);transition:.12s cubic-bezier(.1,.9,.2,1)}.sidebar.visible.svelte-1yfaff8.svelte-1yfaff8{transform:none;transition-duration:.35s}.sidebar.svelte-1yfaff8 hr.svelte-1yfaff8{-webkit-border-before:1px solid var(--fds-divider-stroke-default);border:none;border-block-start:1px solid var(--fds-divider-stroke-default);margin:4px 0}@media screen and (max-width:647px){.navbar.svelte-1yfaff8.svelte-1yfaff8{-webkit-backdrop-filter:blur(60px) saturate(150%);backdrop-filter:blur(60px) saturate(150%);background-color:hsl(var(--mica-tint),var(--mica-tint-opacity));block-size:64px;inline-size:100%;inset-block-start:0;inset-inline-start:0;overflow:visible;position:fixed}.sidebar.svelte-1yfaff8.svelte-1yfaff8{display:block}body{-webkit-padding-before:62px;padding-block-start:62px}}",
      map: null
    };
    Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $navigating, $$unsubscribe_navigating;
      let $page, $$unsubscribe_page;
      $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      let { items = [] } = $$props;
      let { buttons = [] } = $$props;
      let sidebarVisible = false;
      let sidebar;
      if ($$props.items === void 0 && $$bindings.items && items !== void 0)
        $$bindings.items(items);
      if ($$props.buttons === void 0 && $$bindings.buttons && buttons !== void 0)
        $$bindings.buttons(buttons);
      $$result.css.add(css$2);
      {
        {
          $navigating && (sidebarVisible = false);
        }
      }
      $$unsubscribe_navigating();
      $$unsubscribe_page();
      return `

<header class="${"navbar svelte-1yfaff8"}"><nav class="${"inner svelte-1yfaff8"}"><a class="${"logo svelte-1yfaff8"}" href="${"/"}" sveltekit:prefetch><picture><source media="${"(prefers-color-scheme: dark)"}" srcset="${"/branding/logo.png"}">
				<source media="${"(prefers-color-scheme: light)"}" srcset="${"/branding/logo.png"}">
				<img alt="${"FluentHub Logo"}" class="${"logo-image svelte-1yfaff8"}" height="${"32"}" src="${"/branding/logo.png"}" width="${"32"}"></picture>
			FluentHub
		</a></nav>
	<div class="${"buttons svelte-1yfaff8"}">${`<div class="${"divider svelte-1yfaff8"}"></div>
			${each(items, ({ name, path, external, icon, type }) => {
        return `${type === "divider" ? `<div class="${"divider svelte-1yfaff8"}"></div>` : `<a class="${[
          "item svelte-1yfaff8",
          $page.url.pathname === path || $page.url.pathname.split("/").length > 1 && path.split("/").length > 1 && $page.url.pathname.startsWith(path) && !(path === "" || path === "/") || path === "/" && $page.url.pathname === "" ? "selected" : ""
        ].join(" ").trim()}" sveltekit:prefetch${add_attribute("href", path, 0)}${add_attribute("target", external ? "_blank" : void 0, 0)}${add_attribute("rel", external ? "noreferrer noopener" : void 0, 0)}>${icon ? `<!-- HTML_TAG_START -->${icon}<!-- HTML_TAG_END -->` : ``}
						<span>${escape(name)}</span>
					</a>`}`;
      })}`}
		<div class="${"divider svelte-1yfaff8"}"></div>
		${validate_component(TooltipWrapper, "Tooltip").$$render($$result, {
        text: "#supportukraine",
        placement: "bottom",
        delay: 200,
        offset: 0
      }, {}, {
        default: () => {
          return `<span class="${"support-ukraine svelte-1yfaff8"}" aria-label="${"Ukrainian flag in support of Ukraine and its people, #supportukraine"}"></span>`;
        }
      })}
		${`${each(buttons, ({ icon, href, label }) => {
        return `<a${spread([
          { class: "button" },
          { href: escape_attribute_value(href) },
          {
            "aria-label": escape_attribute_value(label)
          },
          { title: escape_attribute_value(label) },
          escape_object(externalLink)
        ], { classes: "svelte-1yfaff8" })}><!-- HTML_TAG_START -->${icon}<!-- HTML_TAG_END --></a>`;
      })}`}</div>
	<aside class="${["sidebar scroller svelte-1yfaff8", sidebarVisible ? "visible" : ""].join(" ").trim()}"${add_attribute("this", sidebar, 0)}>${each(items, ({ name, path, external, sidebarTree, icon, type }) => {
        return `${type === "divider" ? `<hr class="${"svelte-1yfaff8"}">` : `${!sidebarTree ? `${validate_component(ListItem, "ListItem").$$render($$result, {
          type: "navigation",
          "sveltekit:prefetch": true,
          selected: $page.url.pathname === path || $page.url.pathname.split("/").length > 1 && path.split("/").length > 1 && $page.url.pathname.startsWith(path) && !(path === "" || path === "/") || path === "/" && $page.url.pathname === "",
          href: path,
          target: external ? "_blank" : void 0,
          rel: external ? "noreferrer noopener" : void 0
        }, {}, {
          icon: () => {
            return `${icon ? `<!-- HTML_TAG_START -->${icon}<!-- HTML_TAG_END -->` : ``}
					`;
          },
          default: () => {
            return `<span>${escape(name)}</span>
				`;
          }
        })}` : `${validate_component(TreeView, "TreeView").$$render($$result, {
          tree: [
            {
              type: "category",
              name,
              icon,
              pages: [...sidebarTree]
            }
          ]
        }, {}, {})}`}`}`;
      })}
		<hr class="${"svelte-1yfaff8"}">
		${each(buttons, ({ icon, href, label }) => {
        return `${validate_component(ListItem, "ListItem").$$render($$result, Object.assign({ href }, { "sveltekit:prefetch": true }, { type: "navigation" }, externalLink), {}, {
          icon: () => {
            return `${icon ? `<!-- HTML_TAG_START -->${icon}<!-- HTML_TAG_END -->` : ``}
				`;
          },
          default: () => {
            return `<span>${escape(label)}</span>
			`;
          }
        })}`;
      })}</aside>
</header>`;
    });
    Discord = '<svg xmlns="http://www.w3.org/2000/svg" width="71" height="55" fill="none" viewBox="0 0 71 55"><path fill="currentColor" d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"/></svg>';
    Github = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>';
    Sanctuary = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.75 2C5.51 2 4.5 3 4.5 4.25v16.5c0 .41.34.75.75.75H7.5v-4.25c0-.41.34-.75.75-.75h7.5c.41 0 .75.34.75.75v4.25h2.25c.41 0 .75-.34.75-.75v-9c0-1.24-1-2.25-2.25-2.25h-.75V4.25c0-1.24-1-2.25-2.25-2.25h-7.5zm.75 4.5a1 1 0 112 0 1 1 0 01-2 0zm1 6a1 1 0 110 2 1 1 0 010-2zm-1-2.5a1 1 0 112 0 1 1 0 01-2 0zM12 5.5a1 1 0 110 2 1 1 0 010-2zm-1 8a1 1 0 112 0 1 1 0 01-2 0zm4.5-1a1 1 0 110 2 1 1 0 010-2zM11 10a1 1 0 112 0 1 1 0 01-2 0zm4 11.5V18h-2.25v3.5H15zm-3.75 0V18H9v3.5h2.25z"/></svg>';
    css$12 = {
      code: "#page-footer{-webkit-border-before:1px solid var(--fds-divider-stroke-default);border-block-start:1px solid var(--fds-divider-stroke-default)}#page-footer .page-section-inner{display:flex;gap:48px;justify-content:space-between}#page-footer p{margin:12px 0}#page-footer .button.style-hyperlink{-webkit-margin-after:8px;display:block;inline-size:-webkit-fit-content;inline-size:-moz-fit-content;inline-size:fit-content;margin-block-end:8px;margin-inline:-11px}#page-footer .button.style-hyperlink:last-child{-webkit-margin-after:0;margin-block-end:0}@media screen and (max-width:1023px){#page-footer .page-section-inner{display:grid;gap:24px;grid-template-columns:2fr 1fr}.column.svelte-zwmk9.svelte-zwmk9{inline-size:100%;min-inline-size:unset}}@media screen and (max-width:767px){#page-footer .page-section-inner{grid-template-columns:auto}}.logo.svelte-zwmk9.svelte-zwmk9{-webkit-margin-end:8px;align-items:center;color:var(--fds-text-primary);display:flex;font-size:3.6rem;font-weight:600;margin-inline-end:8px;text-decoration:none;transition:.1s ease}.logo.svelte-zwmk9 img.svelte-zwmk9{-webkit-margin-end:12px;block-size:48px;inline-size:auto;margin-inline-end:12px}.social-links.svelte-zwmk9.svelte-zwmk9{-webkit-margin-before:12px;align-items:center;display:flex;gap:4px;margin-block-start:12px}.column.svelte-zwmk9.svelte-zwmk9{display:block;flex:0 0 auto;min-width:14vw}.column.svelte-zwmk9.svelte-zwmk9:first-child{flex:1 1 auto}",
      map: null
    };
    Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$12);
      return `

${validate_component(PageSection, "PageSection").$$render($$result, { type: "footer", id: "page-footer" }, {}, {
        default: () => {
          return `<div class="${"column svelte-zwmk9"}"><a class="${"logo svelte-zwmk9"}" href="${"/"}" sveltekit:prefetch><picture><source media="${"(prefers-color-scheme: dark)"}" srcset="${"/branding/logo.png"}">
				<source media="${"(prefers-color-scheme: light)"}" srcset="${"/branding/logo.png"}">
				<img alt="${"FluentHub logo"}" height="${"32"}" src="${"/branding/logo.png"}" width="${"32"}" class="${"svelte-zwmk9"}"></picture>
			FluentHub
		</a>
		<div class="${"social-links svelte-zwmk9"}">${validate_component(IconButton, "IconButton").$$render($$result, Object.assign({
            href: "https://github.com/" + links.github.owner + "/"
          }, { title: "GitHub" }, { "aria-label": "GitHub" }, externalLink), {}, {
            default: () => {
              return `<!-- HTML_TAG_START -->${Github}<!-- HTML_TAG_END -->`;
            }
          })}
			${validate_component(IconButton, "IconButton").$$render($$result, Object.assign({
            href: "https://discord.gg/" + links.discord.server + "/"
          }, { title: "FluentHub Discord Server" }, { "aria-label": "FluentHub Discord Server" }, externalLink), {}, {
            default: () => {
              return `<!-- HTML_TAG_START -->${Discord}<!-- HTML_TAG_END -->`;
            }
          })}
			${validate_component(IconButton, "IconButton").$$render($$result, Object.assign({
            href: "https://discord.gg/" + links.discord.sanctuary + "/"
          }, { title: "Developer Sanctuary" }, { "aria-label": "Developer Sanctuary" }, externalLink), {}, {
            default: () => {
              return `<!-- HTML_TAG_START -->${Sanctuary}<!-- HTML_TAG_END -->`;
            }
          })}</div>
		<p></p>
		<a${spread([{ href: "https://vercel.app/" }, escape_object(externalLink)], { classes: "svelte-zwmk9" })}><picture><source media="${"(prefers-color-scheme: dark)"}" srcset="${"/branding/vercel-dark.svg"}">
				<source media="${"(prefers-color-scheme: light)"}" srcset="${"/branding/vercel-light.svg"}">
				<img alt="${"Powered by Vercel"}" src="${"/branding/logo.png"}" width="${"192"}" class="${"svelte-zwmk9"}"></picture></a></div>
	${`<div class="${"column svelte-zwmk9"}"><p>FluentHub Team</p>
		${validate_component(Button, "Button").$$render($$result, {
            variant: "hyperlink",
            "sveltekit:prefetch": true,
            href: "https://github.com/onein528"
          }, {}, {
            default: () => {
              return `U+5BFA
		`;
            }
          })}
		${validate_component(Button, "Button").$$render($$result, {
            variant: "hyperlink",
            "sveltekit:prefetch": true,
            href: "https://github.com/DeveloperWOW64"
          }, {}, {
            default: () => {
              return `DeveloperWOW64
		`;
            }
          })}
		${validate_component(Button, "Button").$$render($$result, {
            variant: "hyperlink",
            "sveltekit:prefetch": true,
            href: "https://github.com/BobbyESP"
          }, {}, {
            default: () => {
              return `Gabriel Fontan
		`;
            }
          })}
		${validate_component(Button, "Button").$$render($$result, {
            variant: "hyperlink",
            "sveltekit:prefetch": true,
            href: "https://github.com/luandersonn"
          }, {}, {
            default: () => {
              return `Luandersonn Airton
		`;
            }
          })}</div>
	<div class="${"column svelte-zwmk9"}"><p>Pages</p>
		${validate_component(Button, "Button").$$render($$result, {
            variant: "hyperlink",
            "sveltekit:prefetch": true,
            href: "/"
          }, {}, {
            default: () => {
              return `Home
		`;
            }
          })}
		${validate_component(Button, "Button").$$render($$result, {
            variant: "hyperlink",
            "sveltekit:prefetch": true,
            href: "/docs"
          }, {}, {
            default: () => {
              return `Documentation
		`;
            }
          })}
		${validate_component(Button, "Button").$$render($$result, {
            variant: "hyperlink",
            "sveltekit:prefetch": true,
            href: "/blog"
          }, {}, {
            default: () => {
              return `Blog
		`;
            }
          })}
		${validate_component(Button, "Button").$$render($$result, {
            variant: "hyperlink",
            "sveltekit:prefetch": true,
            href: "/about"
          }, {}, {
            default: () => {
              return `About
		`;
            }
          })}</div>`}`;
        }
      })}`;
    });
    Home = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.55 2.53c.84-.7 2.06-.7 2.9 0l6.75 5.7c.5.42.8 1.05.8 1.71v9.8c0 .97-.78 1.76-1.75 1.76h-3.5c-.97 0-1.75-.79-1.75-1.75v-5.5a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25v5.5c0 .96-.78 1.75-1.75 1.75h-3.5C3.78 21.5 3 20.7 3 19.75v-9.8c0-.67.3-1.3.8-1.73l6.75-5.69zm1.93 1.15a.75.75 0 00-.96 0l-6.75 5.7a.75.75 0 00-.27.56v9.8c0 .14.11.26.25.26h3.5c.14 0 .25-.12.25-.25v-5.5c0-.97.78-1.75 1.75-1.75h3.5c.97 0 1.75.78 1.75 1.75v5.5c0 .13.11.25.25.25h3.5c.14 0 .25-.12.25-.25v-9.8c0-.23-.1-.44-.27-.58l-6.75-5.7z"/></svg>';
    Book = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 6a1 1 0 011-1h8a1 1 0 011 1v2a1 1 0 01-1 1H8a1 1 0 01-1-1V6zm1.5 1.5h7v-1h-7v1zM4 4.5A2.5 2.5 0 016.5 2H18a2.5 2.5 0 012.5 2.5v14.25c0 .41-.34.75-.75.75H5.5a1 1 0 001 1h13.25a.75.75 0 010 1.5H6.5A2.5 2.5 0 014 19.5v-15zM5.5 18H19V4.5a1 1 0 00-1-1H6.5a1 1 0 00-1 1V18z"/></svg>';
    News = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.75 20H5.25a3.25 3.25 0 01-3.24-3.07L2 16.75V6.25c0-1.2.93-2.17 2.1-2.24L4.25 4h12.5c1.2 0 2.17.93 2.24 2.1l.01.15V7h.75c1.2 0 2.17.93 2.24 2.1l.01.15v7.5a3.25 3.25 0 01-3.07 3.24l-.18.01H5.25h13.5zm-13.5-1.5h13.5c.92 0 1.67-.7 1.74-1.6l.01-.15v-7.5c0-.38-.28-.7-.65-.74l-.1-.01H19v7.75c0 .38-.28.7-.65.74l-.1.01a.75.75 0 01-.74-.65l-.01-.1v-10c0-.38-.28-.7-.65-.74l-.1-.01H4.25c-.38 0-.7.28-.74.65l-.01.1v10.5c0 .92.7 1.67 1.6 1.74l.15.01h13.5-13.5zm7-4h3a.75.75 0 01.1 1.5h-3.1a.75.75 0 01-.1-1.5h3.1-3zm-3-3.5c.4 0 .74.34.74.75v3.5c0 .41-.33.75-.75.75h-3.5a.75.75 0 01-.74-.75v-3.5c0-.41.33-.75.75-.75h3.5zm-.76 1.5h-2v2h2v-2zm3.76-1.5h3a.75.75 0 01.1 1.5h-3.1a.75.75 0 01-.1-1.49h3.1-3zm-6.5-3.5h9.5a.75.75 0 01.1 1.5h-9.6a.75.75 0 01-.1-1.5h9.6-9.5z"/></svg>';
    Person = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.75 14C19 14 20 15 20 16.25v.57c0 .9-.32 1.76-.9 2.44C17.53 21.1 15.15 22 12 22c-3.15 0-5.53-.9-7.1-2.74a3.75 3.75 0 01-.9-2.43v-.58C4 15 5.01 14 6.25 14h11.5zm0 1.5H6.25a.75.75 0 00-.75.75v.58c0 .53.2 1.05.54 1.46C7.3 19.76 9.26 20.5 12 20.5c2.74 0 4.7-.74 5.96-2.21.35-.41.54-.93.54-1.47v-.57a.75.75 0 00-.75-.75zM12 2a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"/></svg>';
    Chat = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 11-4.59 18.89L3.6 21.96a1.25 1.25 0 01-1.54-1.54l1.06-3.83A10 10 0 0112 2zm0 1.5a8.5 8.5 0 00-7.43 12.64l.15.27-1.1 3.98 3.98-1.11.27.15A8.5 8.5 0 1012 3.5zM8.75 13h4.5a.75.75 0 01.1 1.5h-4.6a.75.75 0 01-.1-1.5h4.6-4.5zm0-3.5h6.5a.75.75 0 01.1 1.5h-6.6a.75.75 0 01-.1-1.5h6.6-6.5z"/></svg>';
    css6 = {
      code: `@font-face{font-named-instance:"Regular";font-display:swap;font-family:Inter;font-style:normal;font-weight:100 900;src:url(/static/fonts/Inter-roman.var.woff2) format("woff2")}@font-face{font-named-instance:"Italic";font-display:swap;font-family:Inter;font-style:italic;font-weight:100 900;src:url(/static/fonts/Inter-italic.var.woff2) format("woff2")}:root{--font-family-sans-serif:"Segoe UI Variable Display","Segoe UI","Inter",sans-serif;--font-family-monospace:"Cascadia Code","Fira Code","Consolas",monospace}@media(prefers-color-scheme:light){:root{--mica-tint:0,0%,95%;--mica-tint-opacity:0.8;color-scheme:light}}@media(prefers-color-scheme:dark){:root{--mica-tint:0,0%,13%;--mica-tint-opacity:0.8;color-scheme:dark}}*,:after,:before{box-sizing:border-box}:focus-visible:not(.text-box){box-shadow:0 0 0 2px var(--fds-focus-stroke-outer)!important;outline:none!important}::-webkit-input-placeholder,body,button,input,select,textarea{font-family:var(--font-family-sans-serif)}::-moz-selection{background-color:hsl(var(--fds-accent-dark-1));color:#fff}::selection{background-color:hsl(var(--fds-accent-dark-1));color:#fff}body,html{background-color:var(--fds-solid-background-secondary);block-size:100%;inline-size:100%;margin:0}html{font-size:62.5%}body{block-size:-webkit-fit-content;block-size:-moz-fit-content;block-size:fit-content;display:flex;flex-direction:column;font-size:1.4rem;min-block-size:100%}picture{display:contents}@media(prefers-color-scheme:light){code{color:#393a34}code .cdata,code .comment,code .doctype,code .prolog{color:green;font-style:italic}code .namespace{opacity:.7}code .string{color:#a31515}code .operator,code .punctuation{color:#393a34}code .boolean,code .constant,code .inserted,code .number,code .symbol,code .url,code .variable{color:#36acaa}code .atrule,code .attr-value,code .keyword,code .language-autohotkey .selector,code .language-json .boolean,code .language-json .number,code[class*=language-css]{color:#00f}code .function{color:#393a34}code .deleted,code .language-autohotkey .tag{color:#9a050f}code .language-autohotkey .keyword,code .selector{color:#00009f}code .important{color:#e90}code .bold,code .important{font-weight:700}code .italic{font-style:italic}code .class-name,code .language-json .property{color:#2b91af}code .selector,code .tag{color:maroon}code .attr-name,code .entity,code .property,code .regex{color:red}code .directive.tag .tag{background:#ff0;color:#393a34}code .line-numbers .line-numbers-rows{border-inline-end-color:#a5a5a5}code .line-numbers-rows>span:before{color:#2b91af}}@media(prefers-color-scheme:dark){code{color:#d4d4d4}code[class*=language-javascript],code[class*=language-jsx],code[class*=language-tsx],code[class*=language-typescript]{color:#9cdcfe}code[class*=language-css]{color:#ce9178}code[class*=language-html]{color:#d4d4d4}code .language-regex .anchor{color:#dcdcaa}code .language-html .punctuation{color:grey}code .namespace{opacity:.7}code .doctype .doctype-tag{color:#569cd6}code .doctype .name{color:#9cdcfe}code .comment,code .prolog{color:#6a9955}code .language-html .language-css .punctuation,code .language-html .language-javascript .punctuation,code .punctuation{color:#d4d4d4}code .boolean,code .constant,code .inserted,code .number,code .property,code .symbol,code .tag,code .unit{color:#b5cea8}code .attr-name,code .builtin,code .char,code .deleted,code .selector,code .string{color:#ce9178}code .language-css .string.url{text-decoration:underline}code .entity,code .operator{color:#d4d4d4}code .operator.arrow{color:#569cd6}code .atrule{color:#ce9178}code .atrule .rule{color:#c586c0}code .atrule .url{color:#9cdcfe}code .atrule .url .function{color:#dcdcaa}code .atrule .url .punctuation{color:#d4d4d4}code .keyword{color:#569cd6}code .keyword.control-flow,code .keyword.module{color:#c586c0}code .function,code .function .maybe-class-name{color:#dcdcaa}code .regex{color:#d16969}code .important{color:#569cd6}code .italic{font-style:italic}code .constant{color:#9cdcfe}code .class-name,code .maybe-class-name{color:#4ec9b0}code .console,code .interpolation,code .parameter{color:#9cdcfe}code .boolean,code .punctuation.interpolation-punctuation{color:#569cd6}code .exports .maybe-class-name,code .imports .maybe-class-name,code .property,code .variable{color:#9cdcfe}code .escape,code .selector{color:#d7ba7d}code .tag{color:#569cd6}code .cdata,code .tag .punctuation{color:grey}code .attr-name{color:#9cdcfe}code .attr-value,code .attr-value .punctuation{color:#ce9178}code .attr-value .punctuation.attr-equals{color:#d4d4d4}code .entity{color:#569cd6}code .namespace{color:#4ec9b0}}.scroller{overflow:auto}@supports (overflow:overlay){.scroller{overflow:overlay}}.scroller::-webkit-scrollbar{border-radius:14px;display:block;inline-size:14px}@media(prefers-color-scheme:light){.scroller::-webkit-scrollbar:vertical{--scrollbar-caret-top:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M6.10204 16.9814C5.0281 16.9814 4.45412 15.7165 5.16132 14.9083L10.6831 8.59765C11.3804 7.80083 12.6199 7.80083 13.3172 8.59765L18.839 14.9083C19.5462 15.7165 18.9722 16.9814 17.8983 16.9814H6.10204Z' fill='hsl(0, 0%, 0%, 0.447)'/%3E%3C/svg%3E");--scrollbar-caret-bottom:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M6.10204 8C5.0281 8 4.45412 9.2649 5.16132 10.0731L10.6831 16.3838C11.3804 17.1806 12.6199 17.1806 13.3172 16.3838L18.839 10.0731C19.5462 9.2649 18.9722 8 17.8983 8H6.10204Z' fill='hsl(0, 0%, 0%, 0.447)'/%3E%3C/svg%3E")}}@media(prefers-color-scheme:dark){.scroller::-webkit-scrollbar:vertical{--scrollbar-caret-top:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M6.10204 16.9814C5.0281 16.9814 4.45412 15.7165 5.16132 14.9083L10.6831 8.59765C11.3804 7.80083 12.6199 7.80083 13.3172 8.59765L18.839 14.9083C19.5462 15.7165 18.9722 16.9814 17.8983 16.9814H6.10204Z' fill='hsl(0, 0%, 100%, 0.545)'/%3E%3C/svg%3E");--scrollbar-caret-bottom:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M6.10204 8C5.0281 8 4.45412 9.2649 5.16132 10.0731L10.6831 16.3838C11.3804 17.1806 12.6199 17.1806 13.3172 16.3838L18.839 10.0731C19.5462 9.2649 18.9722 8 17.8983 8H6.10204Z' fill='hsl(0, 0%, 100%, 0.545)'/%3E%3C/svg%3E")}}@media(prefers-color-scheme:light){.scroller::-webkit-scrollbar:horizontal{--scrollbar-caret-top:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M9 17.8983C9 18.9722 10.2649 19.5462 11.0731 18.839L17.3838 13.3172C18.1806 12.6199 18.1806 11.3804 17.3838 10.6831L11.0731 5.16132C10.2649 4.45412 9 5.02809 9 6.10204V17.8983Z' fill='hsl(0, 0%, 0%, 0.447)'/%3E%3C/svg%3E");--scrollbar-caret-bottom:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M15 17.8983C15 18.9722 13.7351 19.5462 12.9268 18.839L6.61617 13.3172C5.81935 12.6199 5.81935 11.3804 6.61617 10.6831L12.9268 5.16132C13.7351 4.45412 15 5.02809 15 6.10204L15 17.8983Z' fill='hsl(0, 0%, 100%, 0.545)'/%3E%3C/svg%3E")}}@media(prefers-color-scheme:dark){.scroller::-webkit-scrollbar:horizontal{--scrollbar-caret-top:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M9 17.8983C9 18.9722 10.2649 19.5462 11.0731 18.839L17.3838 13.3172C18.1806 12.6199 18.1806 11.3804 17.3838 10.6831L11.0731 5.16132C10.2649 4.45412 9 5.02809 9 6.10204V17.8983Z' fill='hsl(0, 0%, 0%, 0.447)'/%3E%3C/svg%3E");--scrollbar-caret-bottom:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M15 17.8983C15 18.9722 13.7351 19.5462 12.9268 18.839L6.61617 13.3172C5.81935 12.6199 5.81935 11.3804 6.61617 10.6831L12.9268 5.16132C13.7351 4.45412 15 5.02809 15 6.10204L15 17.8983Z' fill='hsl(0, 0%, 100%, 0.545)'/%3E%3C/svg%3E")}}.scroller::-webkit-scrollbar:hover{background:var(--scrollbar-caret-bottom) bottom center/contain no-repeat,var(--scrollbar-caret-top) top center/contain no-repeat,hsl(var(--mica-tint),var(--mica-tint-opacity))}.scroller::-webkit-scrollbar-thumb{background:var(--fds-control-strong-fill-default);background-clip:padding-box;border:6px solid transparent;border-block:none;border-radius:14px}.scroller::-webkit-scrollbar-thumb:hover{border:4px solid transparent}.scroller::-webkit-scrollbar-button:single-button{block-size:14px;display:block}.hyperlink{color:var(--fds-accent-text-primary);cursor:pointer;text-decoration:underline;-webkit-text-decoration-skip-ink:none;text-decoration-skip-ink:none}.hyperlink:active,.hyperlink:hover{text-decoration:none}.hyperlink:hover{color:var(--fds-accent-text-tertiary)}.hyperlink:active{color:var(--fds-accent-text-secondary)}@-webkit-keyframes scroll-gradient{0%{background-position:50% 0}50%{background-position:50% 100%}to{background-position:50% 0}}@keyframes scroll-gradient{0%{background-position:50% 0}50%{background-position:50% 100%}to{background-position:50% 0}}.markdown-body{color:var(--fds-text-primary);font-size:1.4rem;line-height:1.45}.markdown-body>:first-child{-webkit-margin-before:0!important;margin-block-start:0!important}.markdown-body>:last-child{-webkit-margin-after:0!important;margin-block-end:0!important}.markdown-body>:only-child{margin:0!important}.markdown-body blockquote,.markdown-body details,.markdown-body dl,.markdown-body ol,.markdown-body p,.markdown-body pre,.markdown-body table,.markdown-body ul{-webkit-margin-before:0;-webkit-margin-after:16px;margin-block-end:16px;margin-block-start:0}.markdown-body figure{margin:16px 0}.markdown-body figure.margin-top{margin-block:48px 16px}.markdown-body figure.margin-bottom{margin-block:16px 48px}.markdown-body figure figcaption{color:var(--fds-text-secondary);font-size:1.45rem;text-align:center}.markdown-body img{block-size:auto;border:3px solid var(--fds-card-stroke-default);border-radius:var(--fds-overlay-corner-radius);max-inline-size:100%}.markdown-body h1,.markdown-body h2{-webkit-padding-after:.3em;padding-block-end:.3em}.markdown-body h1,.markdown-body h2,.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6{-webkit-margin-before:24px;-webkit-margin-after:16px;color:var(--fds-text-primary);font-weight:600;line-height:1.25;margin-block-end:16px;margin-block-start:24px}.markdown-body h1{font-size:2em}.markdown-body h2{font-size:1.5em}.markdown-body h3{font-size:1.25em}.markdown-body h4{font-size:1em}.markdown-body h5{font-size:.875em}.markdown-body h6{color:var(--fds-text-tertiary);font-size:.85em}.markdown-body ol ol,.markdown-body ol ul,.markdown-body ul ol,.markdown-body ul ul{-webkit-margin-before:0;-webkit-margin-after:0;margin-block-end:0;margin-block-start:0}.markdown-body li+li{-webkit-margin-before:.25em;margin-block-start:.25em}.markdown-body ol ol,.markdown-body ul ol{list-style-type:lower-roman}.markdown-body ol,.markdown-body ul{-webkit-padding-start:2em;padding-inline-start:2em}.markdown-body code,.markdown-body kbd{word-wrap:break-word;background-clip:padding-box;background-color:var(--fds-card-background-default);border:1px solid var(--fds-card-stroke-default);border-radius:var(--fds-control-corner-radius);font-family:var(--font-family-monospace);font-size:85%;margin:0;padding:.2em .4em}.markdown-body kbd{box-shadow:inset 0 -.2em 0 var(--fds-subtle-fill-tertiary);color:#3a3b35;padding:.3em .4em}@media(prefers-color-scheme:dark){.markdown-body kbd{color:#d4d4d4}}.markdown-body pre{background-clip:padding-box;background-color:var(--fds-card-background-default);border:1px solid var(--fds-card-stroke-default);border-radius:var(--fds-control-corner-radius);font-size:1em;overflow:auto;padding:12px 16px}.markdown-body pre code{background-color:transparent;border:none;padding:0}.markdown-body blockquote{-webkit-border-start:.25em solid var(--fds-subtle-fill-secondary);border-inline-start:.25em solid var(--fds-subtle-fill-secondary);color:var(--text-muted);margin:0;padding:0 1em}.markdown-body a:not(.hyperlink-button){color:var(--fds-accent-text-primary);text-decoration:underline;-webkit-text-decoration-skip-ink:none;text-decoration-skip-ink:none}.markdown-body a:not(.hyperlink-button):active,.markdown-body a:not(.hyperlink-button):hover{text-decoration:none}.markdown-body a:not(.hyperlink-button):hover{color:var(--fds-accent-text-tertiary)}.markdown-body a:not(.hyperlink-button):active{color:var(--fds-accent-text-secondary)}.markdown-body hr{-webkit-border-before:1px solid var(--fds-divider-stroke-default);border:none;border-block-start:1px solid var(--fds-divider-stroke-default);margin:24px 0}.markdown-body table{background-clip:padding-box;border:1px solid var(--fds-control-stroke-default);border-collapse:collapse;border-radius:var(--fds-control-corner-radius);display:inline-block;overflow:hidden}.markdown-body table td,.markdown-body table th{padding:6px 13px}.markdown-body table th{background-color:var(--fds-subtle-fill-tertiary);font-weight:600}.markdown-body table tr{background-color:var(--fds-solid-background-quarternary)}.markdown-body table tr:nth-child(2n){background-color:transparent}`,
      map: null
    };
    _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const { github, discord } = links;
      const navbarItems = [
        { name: "Home", path: "/", icon: Home },
        {
          name: "Docs",
          path: "/docs",
          sidebarTree: docs,
          icon: Book
        },
        { name: "Blog", path: "/blog", icon: News },
        {
          name: "About",
          path: "/about",
          icon: Person
        }
      ];
      const navbarButtons = [
        {
          label: "Discord",
          href: `https://discord.gg/${discord.server}`,
          icon: Chat
        },
        {
          label: "GitHub",
          href: `https://github.com/${github.owner}/${github.repo}`,
          icon: Code
        }
      ];
      $$result.css.add(css6);
      return `${$$result.head += `<meta content="${"FluentHub"}" name="${"og:site_name"}" data-svelte="svelte-l1fa5b"><meta content="${"website"}" name="${"og:type"}" data-svelte="svelte-l1fa5b"><link href="${"/branding/logo.png"}" rel="${"icon"}" type="${"image/svg+xml"}" data-svelte="svelte-l1fa5b"><meta content="${"FluentHub, FH, Developer, Fluent, Svelte, computer, code, Codrex, XAML, C#, Fluent-Svelte, Files"}" name="${"keywords"}" data-svelte="svelte-l1fa5b"><meta content="${"#084840"}" name="${"theme-color"}" data-svelte="svelte-l1fa5b">`, ""}

${validate_component(Navbar, "Navbar").$$render($$result, {
        buttons: navbarButtons,
        items: navbarItems
      }, {}, {})}
${slots.default ? slots.default({}) : ``}
${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  css: () => css7,
  entry: () => entry,
  js: () => js,
  module: () => layout_svelte_exports
});
var entry, js, css7;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    init_layout_svelte();
    entry = "pages/__layout.svelte-951f673a.js";
    js = ["pages/__layout.svelte-951f673a.js", "chunks/vendor-ec6aa394.js", "chunks/BlogCard.svelte_svelte_type_style_lang-3569a11f.js", "chunks/Footer.svelte_svelte_type_style_lang-266e6168.js", "chunks/docs-82f518cd.js", "chunks/utils-9a9bd3c9.js", "chunks/PageSection-45e2382a.js"];
    css7 = ["assets/pages/__layout.svelte-1cc69cb7.css", "assets/vendor-20988698.css", "assets/BlogCard.svelte_svelte_type_style_lang-32dcf37c.css", "assets/Footer.svelte_svelte_type_style_lang-82d3483d.css"];
  }
});

// .svelte-kit/output/server/chunks/Metadata-6271aef0.js
var Metadata;
var init_Metadata_6271aef0 = __esm({
  ".svelte-kit/output/server/chunks/Metadata-6271aef0.js"() {
    init_index_9a0d4ca8();
    init_BlogCard_svelte_svelte_type_style_lang_5e5f1546();
    Metadata = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let imageFile;
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      let { title = "Codrex" } = $$props;
      let { image = "" } = $$props;
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      if ($$props.image === void 0 && $$bindings.image && image !== void 0)
        $$bindings.image(image);
      imageFile = image.startsWith("/") ? image : `/branding/banner-${image}.png`;
      $$unsubscribe_page();
      return `<title>${escape(title)}</title>
<meta${add_attribute("content", title, 0)} name="${"og:title"}">
<meta${add_attribute("content", title, 0)} name="${"twitter:title"}">

<meta${add_attribute("content", imageFile, 0)} name="${"og:image"}">
<meta content="${"https://" + escape($page.url.host) + escape(imageFile)}" name="${"twitter:image"}">`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/__error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => _error,
  load: () => load
});
var css8, load, _error;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/__error.svelte.js"() {
    init_index_9a0d4ca8();
    init_BlogCard_svelte_svelte_type_style_lang_5e5f1546();
    init_Metadata_6271aef0();
    css8 = {
      code: `.error-page.svelte-zohti7.svelte-zohti7{align-items:center;background-color:var(--fds-layer-background-default);block-size:100%;color:#222;color-scheme:light;display:flex;flex:1 1 auto;flex-direction:column;font-size:1.2rem;inline-size:100%;justify-content:center;position:relative}.error-page.svelte-zohti7 .svelte-zohti7:after,.error-page.svelte-zohti7 .svelte-zohti7:before,.error-page.svelte-zohti7 .svelte-zohti7:not(code){-webkit-font-smooth:never;font-family:"Microsoft Sans Serif",Tahoma,Arial,sans-serif}.error-page.svelte-zohti7 .svelte-zohti7::-moz-selection{background-color:navy}.error-page.svelte-zohti7 .svelte-zohti7::selection{background-color:navy}.error-page.svelte-zohti7 button.svelte-zohti7{background:silver;border:none;border-radius:0;box-shadow:inset -1px -1px #0a0a0a,inset 1px 1px #fff,inset -2px -2px grey,inset 2px 2px #dfdfdf;box-sizing:border-box;font-size:1.2rem;min-block-size:23px;min-inline-size:75px;padding:0 12px}.error-page.svelte-zohti7 button.svelte-zohti7:not(:disabled):active{box-shadow:inset -1px -1px #fff,inset 1px 1px #0a0a0a,inset -2px -2px #dfdfdf,inset 2px 2px grey;padding:2px 11px 0 13px}.error-page.svelte-zohti7 button.svelte-zohti7:focus{outline:1px dotted #000;outline-offset:-4px}.error-page.svelte-zohti7 pre.svelte-zohti7{background:#fff;box-shadow:inset -1px -1px #fff,inset 1px 1px grey,inset -2px -2px #dfdfdf,inset 2px 2px #0a0a0a;display:block;margin:0;overflow:auto;padding:12px 8px}.error-page.svelte-zohti7 pre code.svelte-zohti7{color:inherit;font-family:monospace}.error-page.svelte-zohti7 .svelte-zohti7::-webkit-scrollbar{inline-size:16px}.error-page.svelte-zohti7 .svelte-zohti7::-webkit-scrollbar-button:horizontal:end:increment,.error-page.svelte-zohti7 .svelte-zohti7::-webkit-scrollbar-button:horizontal:start:decrement,.error-page.svelte-zohti7 .svelte-zohti7::-webkit-scrollbar-button:vertical:end:increment,.error-page.svelte-zohti7 .svelte-zohti7::-webkit-scrollbar-button:vertical:start:decrement{display:block}.error-page.svelte-zohti7 .svelte-zohti7::-webkit-scrollbar-button:horizontal{block-size:17px}.error-page.svelte-zohti7 .svelte-zohti7::-webkit-scrollbar-button:horizontal:start{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15 0H0v16h1V1h14V0z' fill='%23DFDFDF'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M2 1H1v14h1V2h12V1H2z' fill='%23fff'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16 17H0v-1h15V0h1v17z' fill='%23000'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15 1h-1v14H1v1h14V1z' fill='gray'/%3E%3Cpath fill='silver' d='M2 2h12v13H2z'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9 4H8v1H7v1H6v1H5v1h1v1h1v1h1v1h1V4z' fill='%23000'/%3E%3C/svg%3E");inline-size:16px}.error-page.svelte-zohti7 .svelte-zohti7::-webkit-scrollbar-button:horizontal:end{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15 0H0v16h1V1h14V0z' fill='%23DFDFDF'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M2 1H1v14h1V2h12V1H2z' fill='%23fff'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16 17H0v-1h15V0h1v17z' fill='%23000'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15 1h-1v14H1v1h14V1z' fill='gray'/%3E%3Cpath fill='silver' d='M2 2h12v13H2z'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M7 4H6v7h1v-1h1V9h1V8h1V7H9V6H8V5H7V4z' fill='%23000'/%3E%3C/svg%3E");inline-size:16px}.error-page.svelte-zohti7 .svelte-zohti7::-webkit-scrollbar-button:vertical:start{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15 0H0v16h1V1h14V0z' fill='%23DFDFDF'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M2 1H1v14h1V2h12V1H2z' fill='%23fff'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16 17H0v-1h15V0h1v17z' fill='%23000'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15 1h-1v14H1v1h14V1z' fill='gray'/%3E%3Cpath fill='silver' d='M2 2h12v13H2z'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 6H7v1H6v1H5v1H4v1h7V9h-1V8H9V7H8V6z' fill='%23000'/%3E%3C/svg%3E");block-size:17px}.error-page.svelte-zohti7 .svelte-zohti7::-webkit-scrollbar-button:vertical:end{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15 0H0v16h1V1h14V0z' fill='%23DFDFDF'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M2 1H1v14h1V2h12V1H2z' fill='%23fff'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16 17H0v-1h15V0h1v17z' fill='%23000'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15 1h-1v14H1v1h14V1z' fill='gray'/%3E%3Cpath fill='silver' d='M2 2h12v13H2z'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11 6H4v1h1v1h1v1h1v1h1V9h1V8h1V7h1V6z' fill='%23000'/%3E%3C/svg%3E");block-size:17px}.error-page.svelte-zohti7 .svelte-zohti7::-webkit-scrollbar-corner{background:#dfdfdf}.error-page.svelte-zohti7 .svelte-zohti7::-webkit-scrollbar-track{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg width='2' height='2' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1 0H0v1h1v1h1V1H1V0z' fill='silver'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M2 0H1v1H0v1h1V1h1V0z' fill='%23fff'/%3E%3C/svg%3E")}.error-page.svelte-zohti7 .svelte-zohti7::-webkit-scrollbar-thumb{background-color:#dfdfdf;box-shadow:inset -1px -1px #0a0a0a,inset 1px 1px #fff,inset -2px -2px grey,inset 2px 2px #dfdfdf}.window.svelte-zohti7.svelte-zohti7{background:silver;box-shadow:inset -1px -1px #0a0a0a,inset 1px 1px #dfdfdf,inset -2px -2px grey,inset 2px 2px #fff;display:flex;flex-direction:column;inline-size:380px;max-inline-size:calc(100% - 48px);min-block-size:375px;min-inline-size:150px;overflow:auto;padding:3px;position:absolute;resize:both}@media screen and (max-width:647px){.window.svelte-zohti7.svelte-zohti7{block-size:calc(100% - 48px);inline-size:calc(100% - 48px);inset-block-start:0;inset-inline-start:0;margin:24px;position:absolute}}.window.svelte-zohti7 pre.svelte-zohti7,.window-body.svelte-zohti7.svelte-zohti7{flex:1 1 auto}.window-body.svelte-zohti7.svelte-zohti7{display:flex;flex-direction:column;margin:8px}.window.svelte-zohti7 footer.svelte-zohti7{-webkit-margin-before:8px;display:flex;gap:6px;justify-content:flex-end;margin-block-start:8px}.titlebar.svelte-zohti7.svelte-zohti7{align-items:center;background:linear-gradient(90deg,navy,#1084d0);display:flex;justify-content:space-between;padding:3px 2px 3px 3px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.titlebar-text.svelte-zohti7.svelte-zohti7{-webkit-margin-end:24px;color:#fff;font-weight:700;letter-spacing:0;margin-inline-end:24px}.titlebar-controls.svelte-zohti7.svelte-zohti7{display:flex}.titlebar-controls.svelte-zohti7 button.svelte-zohti7{display:block;min-block-size:14px;min-inline-size:16px;padding:0!important}.titlebar.svelte-zohti7 button[aria-label=Minimize].svelte-zohti7{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg width='6' height='2' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23000' d='M0 0h6v2H0z'/%3E%3C/svg%3E");background-position:bottom 3px left 4px;background-repeat:no-repeat}.titlebar.svelte-zohti7 button[aria-label=Maximize].svelte-zohti7{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg width='9' height='9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9 0H0v9h9V0zM8 2H1v6h7V2z' fill='%23000'/%3E%3C/svg%3E");background-position:top 2px left 3px;background-repeat:no-repeat}.titlebar.svelte-zohti7 button[aria-label=Close].svelte-zohti7{-webkit-margin-start:2px;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg width='8' height='7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 0h2v1h1v1h2V1h1V0h2v1H7v1H6v1H5v1h1v1h1v1h1v1H6V6H5V5H3v1H2v1H0V6h1V5h1V4h1V3H2V2H1V1H0V0z' fill='%23000'/%3E%3C/svg%3E");background-position:top 3px left 4px;background-repeat:no-repeat;margin-inline-start:2px}.error-inner.svelte-zohti7.svelte-zohti7{display:flex;margin-block:4px 8px}.error-inner.svelte-zohti7 img.svelte-zohti7{-webkit-margin-end:1em;-webkit-user-drag:none;block-size:32px;inline-size:32px;margin-inline-end:1em;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.error-inner.svelte-zohti7 p.svelte-zohti7{line-height:1.5;margin:0}`,
      map: null
    };
    load = ({ error: error2, status }) => {
      return { props: { status, error: error2 } };
    };
    _error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { status } = $$props;
      let { error: error2 } = $$props;
      if ($$props.status === void 0 && $$bindings.status && status !== void 0)
        $$bindings.status(status);
      if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
        $$bindings.error(error2);
      $$result.css.add(css8);
      return `${$$result.head += `${validate_component(Metadata, "Metadata").$$render($$result, {}, {}, {})}`, ""}

<section class="${"error-page svelte-zohti7"}"><div class="${"window svelte-zohti7"}"><div class="${"titlebar svelte-zohti7"}"><div class="${"titlebar-text svelte-zohti7"}">Error: ${escape(status)}</div>
			<div class="${"titlebar-controls svelte-zohti7"}"><button aria-label="${"Minimize"}" class="${"svelte-zohti7"}"></button>
				<button aria-label="${"Maximize"}" class="${"svelte-zohti7"}"></button>
				<button aria-label="${"Close"}" class="${"svelte-zohti7"}"></button></div></div>
		<div class="${"window-body svelte-zohti7"}"><div class="${"error-inner svelte-zohti7"}"><img alt="${"Error icon"}" src="${"/ui/icons/98-error.png"}" class="${"svelte-zohti7"}">
				<div class="${"error-message svelte-zohti7"}"><p class="${"svelte-zohti7"}">Uh Oh! Something went wrong while loading this page.
						<br class="${"svelte-zohti7"}">
						${escape(error2.message)}</p></div></div>
			${error2.stack ? `<pre class="${"svelte-zohti7"}"><code class="${"svelte-zohti7"}">${escape(error2.stack)}</code></pre>` : ``}
			<footer class="${"svelte-zohti7"}"><a href="${"/"}" class="${"svelte-zohti7"}"><button class="${"svelte-zohti7"}">Return Home</button></a></footer></div></div>
</section>`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  css: () => css9,
  entry: () => entry2,
  js: () => js2,
  module: () => error_svelte_exports
});
var entry2, js2, css9;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    init_error_svelte();
    entry2 = "pages/__error.svelte-8ee59b14.js";
    js2 = ["pages/__error.svelte-8ee59b14.js", "chunks/vendor-ec6aa394.js", "chunks/BlogCard.svelte_svelte_type_style_lang-3569a11f.js", "chunks/Metadata-25f018aa.js"];
    css9 = ["assets/pages/__error.svelte-131ac356.css", "assets/vendor-20988698.css", "assets/BlogCard.svelte_svelte_type_style_lang-32dcf37c.css"];
  }
});

// .svelte-kit/output/server/chunks/HeaderChip-30e6e0a1.js
var css10, HeaderChip;
var init_HeaderChip_30e6e0a1 = __esm({
  ".svelte-kit/output/server/chunks/HeaderChip-30e6e0a1.js"() {
    init_index_9a0d4ca8();
    init_BlogCard_svelte_svelte_type_style_lang_5e5f1546();
    css10 = {
      code: ".header-chip.svelte-19pe8od{-webkit-margin-after:8px;background-color:var(--fds-subtle-fill-secondary);border-radius:50px;color:var(--fds-text-secondary);display:inline-flex;font-size:var(--fds-body-font-size);font-weight:600;line-height:18px;margin-block-end:8px;padding:4px 16px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}",
      map: null
    };
    HeaderChip = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css10);
      return `<span class="${"header-chip svelte-19pe8od"}">${slots.default ? slots.default({}) : ``}
</span>`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/index.svelte.js
var index_svelte_exports = {};
__export(index_svelte_exports, {
  default: () => Routes
});
var css$5, PersonPicture, css$42, Contributor, Download, css$32, HeroSection, css$22, DesignSection, css$13, IntegrationSection, owner, repo, getContributors, css11, OpenSection, Routes;
var init_index_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/index.svelte.js"() {
    init_index_9a0d4ca8();
    init_PageSection_c7953e3b();
    init_Button_ab8c6742();
    init_BlogCard_svelte_svelte_type_style_lang_5e5f1546();
    init_utils_9a9bd3c9();
    init_Footer_svelte_svelte_type_style_lang_97644b83();
    init_HeaderChip_30e6e0a1();
    init_Metadata_6271aef0();
    init_internal_82ab3b7f();
    css$5 = {
      code: ".person-picture.svelte-p3ps28{align-items:center;background-clip:padding-box;background-color:var(--fds-control-alt-fill-quarternary);block-size:100%;border:1px solid var(--fds-card-stroke-default);border-radius:50%;box-sizing:border-box;display:flex;flex:0 0 auto;font-family:var(--fds-font-family-display);font-size:calc(var(--fds-person-picture-size)*.41667);font-weight:600;inline-size:100%;justify-content:center;overflow:hidden;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.person-picture-container.svelte-p3ps28{block-size:var(--fds-person-picture-size);display:flex;inline-size:var(--fds-person-picture-size);position:relative}.person-picture-badge.svelte-p3ps28{align-items:flex-end;block-size:100%;display:flex;flex-direction:column;inline-size:100%;inset-block-start:0;inset-inline-start:0;position:absolute}",
      map: null
    };
    PersonPicture = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["size", "src", "alt", "class", "element", "containerElement"]);
      let $$slots = compute_slots(slots);
      let { size = 72 } = $$props;
      let { src = void 0 } = $$props;
      let { alt = void 0 } = $$props;
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      let { containerElement = null } = $$props;
      let error2 = false;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.src === void 0 && $$bindings.src && src !== void 0)
        $$bindings.src(src);
      if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
        $$bindings.alt(alt);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      if ($$props.containerElement === void 0 && $$bindings.containerElement && containerElement !== void 0)
        $$bindings.containerElement(containerElement);
      $$result.css.add(css$5);
      {
        if (src)
          error2 = false;
      }
      return `<div class="${"person-picture-container svelte-p3ps28"}" style="${"--fds-person-picture-size: " + escape(size) + "px"}"${add_attribute("this", containerElement, 0)}>${src && !error2 ? `<img${spread([
        {
          class: "person-picture " + escape(className)
        },
        { width: escape_attribute_value(size) },
        { height: escape_attribute_value(size) },
        { src: escape_attribute_value(src) },
        { alt: escape_attribute_value(alt) },
        escape_object($$restProps)
      ], { classes: "svelte-p3ps28" })}${add_attribute("this", element, 0)}>` : `<div${spread([
        {
          class: "person-picture " + escape(className)
        },
        escape_object($$restProps)
      ], { classes: "svelte-p3ps28" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : `
				${escape((alt == null ? void 0 : alt.split(" ").map((i2) => i2.charAt(0)).join("").toUpperCase()) ?? "")}
			`}</div>`}
	${$$slots.badge ? `<span class="${"person-picture-badge svelte-p3ps28"}">${slots.badge ? slots.badge({}) : ``}</span>` : ``}
</div>`;
    });
    css$42 = {
      code: ".contributor.svelte-t0rlj5.svelte-t0rlj5{-webkit-user-drag:none;align-items:center;background-color:var(--fds-solid-background-tertiary);border:1px solid var(--fds-card-stroke-default);border-radius:var(--fds-control-corner-radius);box-shadow:var(--fds-flyout-shadow);display:inline-flex;gap:1rem;min-inline-size:150px;padding:1rem;text-decoration:none;transition:var(--fds-control-normal-duration) ease;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.contributor.svelte-t0rlj5.svelte-t0rlj5:hover{box-shadow:var(--fds-active-window-shadow);transform:translateY(-2px)}.info.svelte-t0rlj5.svelte-t0rlj5{color:var(--fds-text-tertiary);font-size:1.2rem;font-weight:400;white-space:nowrap}.info.svelte-t0rlj5.svelte-t0rlj5,.info.svelte-t0rlj5 h5.svelte-t0rlj5{overflow:hidden;text-overflow:ellipsis}.info.svelte-t0rlj5 h5.svelte-t0rlj5{color:var(--fds-text-primary);font-size:var(--fds-body-font-size);font-weight:600;margin:0}",
      map: null
    };
    Contributor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { html_url = void 0 } = $$props;
      let { avatar_url = void 0 } = $$props;
      let { type = "User" } = $$props;
      let { login = "Unknown" } = $$props;
      let { contributions = 0 } = $$props;
      if ($$props.html_url === void 0 && $$bindings.html_url && html_url !== void 0)
        $$bindings.html_url(html_url);
      if ($$props.avatar_url === void 0 && $$bindings.avatar_url && avatar_url !== void 0)
        $$bindings.avatar_url(avatar_url);
      if ($$props.type === void 0 && $$bindings.type && type !== void 0)
        $$bindings.type(type);
      if ($$props.login === void 0 && $$bindings.login && login !== void 0)
        $$bindings.login(login);
      if ($$props.contributions === void 0 && $$bindings.contributions && contributions !== void 0)
        $$bindings.contributions(contributions);
      $$result.css.add(css$42);
      return `${type === "User" ? `<a${spread([
        { tabindex: "-1" },
        { class: "contributor" },
        { href: escape_attribute_value(html_url) },
        escape_object(externalLink)
      ], { classes: "svelte-t0rlj5" })}>${validate_component(PersonPicture, "PersonPicture").$$render($$result, {
        src: avatar_url,
        size: 32,
        alt: login + "'s avatar",
        loading: "lazy"
      }, {}, {})}
		<div class="${"info svelte-t0rlj5"}"><h5 class="${"svelte-t0rlj5"}">${escape(login)}</h5>
			<span>${escape(contributions)} ${escape(contributions > 1 ? "contributions" : "contribution")}</span></div></a>` : ``}`;
    });
    Download = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.25 20.5a.75.75 0 110 1.5h-13a.75.75 0 110-1.5h13zm-6.6-18.49h.1c.38 0 .7.28.74.64l.01.1v13.7l3.72-3.73a.75.75 0 01.98-.07l.08.07c.27.27.3.68.07.98l-.07.08-5 5a.75.75 0 01-.97.07l-.09-.07-5-5a.75.75 0 01.98-1.13l.08.07L11 16.43V2.76c0-.38.28-.7.65-.75h.1-.1z"/></svg>';
    css$32 = {
      code: "#hero-section{-webkit-border-after:1px solid var(--fds-divider-stroke-default);block-size:75vh;border-block-end:1px solid var(--fds-divider-stroke-default);max-block-size:1024px;min-block-size:584px;overflow:hidden;position:relative}#hero-section .page-section-inner{align-items:center;display:grid;gap:4rem;grid-template-columns:1fr 1.5fr;position:relative}#hero-section .split-button{display:flex;position:relative}#hero-section .split-button .button:first-of-type{-webkit-border-end:1px solid var(--fds-divider-stroke-default);border-inline-end:1px solid var(--fds-divider-stroke-default);border-radius:var(--fds-control-corner-radius) 0 0 var(--fds-control-corner-radius)}#hero-section .split-button .menu-flyout-wrapper{display:contents}#hero-section .split-button .menu-flyout-wrapper .button{block-size:100%;border-radius:0 var(--fds-control-corner-radius) var(--fds-control-corner-radius) 0;padding-inline:8px}#hero-section .button{padding:7px 12px}#hero-section .button svg{fill:currentColor;block-size:auto;inline-size:14px}#hero-section .style-standard .hero-button-inner{color:var(--fds-text-secondary)}#hero-section .style-standard .hero-button-inner h5{color:var(--fds-text-primary)}@-webkit-keyframes svelte-1yc667v-rainbow-background-hue-rotate{0%{filter:none}50%{filter:hue-rotate(180deg)}to{filter:none}}@keyframes svelte-1yc667v-rainbow-background-hue-rotate{0%{filter:none}50%{filter:hue-rotate(180deg)}to{filter:none}}#hero-section .rainbow-background{-webkit-animation:svelte-1yc667v-rainbow-background-hue-rotate 15s linear infinite,scroll-gradient 15s linear infinite;animation:svelte-1yc667v-rainbow-background-hue-rotate 15s linear infinite,scroll-gradient 15s linear infinite;background:800% 800% linear-gradient(to bottom right,#50dc6f,#00d6ba,#0390e2,var(--fds-solid-background-base));block-size:100%;inline-size:60vw;inset-block-end:0;inset-inline-end:0;-webkit-mask:url(/ui/hero-mask.png) bottom/cover no-repeat;mask:url(/ui/hero-mask.png) bottom/cover no-repeat;min-inline-size:100vh;position:absolute;z-index:-1}@media(prefers-color-scheme:light){#hero-section .rainbow-background{opacity:.5}}@media screen and (max-width:1023px){#hero-section .rainbow-background{inline-size:100%;transform:rotate(90deg) scale(1.5)}}@media screen and (max-width:647px){#hero-section .rainbow-background{block-size:60vh;-webkit-mask-size:100% 100%;mask-size:100% 100%}}.hero-left.svelte-1yc667v.svelte-1yc667v{display:flex;flex:1 1 auto;flex-direction:column;justify-content:center}.hero-right.svelte-1yc667v.svelte-1yc667v{align-items:center;block-size:100%;display:flex}.hero-right.svelte-1yc667v img.svelte-1yc667v{-webkit-user-drag:none;aspect-ratio:1280/960;-webkit-backdrop-filter:blur(60px) saturate(150%);backdrop-filter:blur(60px) saturate(150%);background-color:hsl(var(--mica-tint),calc(var(--mica-tint-opacity)/1.5));block-size:auto;border:1px solid var(--fds-surface-stroke-default);border-radius:calc(var(--fds-overlay-corner-radius)/1.5);box-shadow:var(--fds-dialog-shadow);inline-size:auto;inset-inline-end:0;max-block-size:100%;max-inline-size:100%;overflow:hidden;position:absolute;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}@media screen and (min-width:2049px){.hero-right.svelte-1yc667v img.svelte-1yc667v{border-radius:var(--fds-overlay-corner-radius)}}.hero-button-inner.svelte-1yc667v.svelte-1yc667v{-webkit-margin-start:8px;align-items:flex-start;display:flex;flex-direction:column;font-size:1.1rem;line-height:normal;margin-inline-start:8px}.hero-button-inner.svelte-1yc667v h5.svelte-1yc667v{font-size:1.25rem;font-weight:600;margin:0}.hero-image-container.svelte-1yc667v.svelte-1yc667v{align-items:center;block-size:100%;display:flex;inline-size:100%;justify-content:center;max-block-size:768px;position:relative}@media screen and (max-width:1023px){#hero-section{block-size:auto;max-block-size:unset}#hero-section .page-section-inner{grid-template-columns:auto}.hero-left.svelte-1yc667v.svelte-1yc667v{align-items:center;text-align:center}.hero-left.svelte-1yc667v .buttons-spacer.svelte-1yc667v{justify-content:center}.hero-right.svelte-1yc667v img.svelte-1yc667v{block-size:auto;inline-size:100%;max-inline-size:708px;position:relative}}",
      map: null
    };
    HeroSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$32);
      return `${validate_component(PageSection, "PageSection").$$render($$result, { id: "hero-section" }, {}, {
        default: () => {
          return `<div class="${"hero-left svelte-1yc667v"}"><h1>FluentHub</h1>
		<p>A stylish yet wonderfully powerful GitHub Oauth client</p>
		<div class="${"buttons-spacer svelte-1yc667v"}">${validate_component(Button, "Button").$$render($$result, Object.assign({ variant: "accent" }, {
            href: "https://github.com/" + links.github.owner + "/" + links.github.repo + "/blob/main/docs/build-from-source.md"
          }, externalLink), {}, {
            default: () => {
              return `<!-- HTML_TAG_START -->${Download}<!-- HTML_TAG_END -->
				<div class="${"hero-button-inner svelte-1yc667v"}"><h5 class="${"svelte-1yc667v"}">Install</h5>
					<span>Build FluentHub from source</span></div>`;
            }
          })}
			${validate_component(Button, "Button").$$render($$result, Object.assign({
            href: "https://github.com/files-community"
          }, externalLink), {}, {
            default: () => {
              return `<!-- HTML_TAG_START -->${Code}<!-- HTML_TAG_END -->
				<div class="${"hero-button-inner svelte-1yc667v"}"><h5 class="${"svelte-1yc667v"}">View GitHub</h5>
					<span>FluentHub is free and open-source!</span></div>`;
            }
          })}</div></div>
	<div class="${"hero-right svelte-1yc667v"}"><div class="${"hero-image-container svelte-1yc667v"}"><picture><source media="${"(prefers-color-scheme: dark)"}" srcset="${"/screenshots/hero-dark.png"}">
				<source media="${"(prefers-color-scheme: light)"}" srcset="${"/screenshots/hero-light.png"}">
				<img alt="${"FluentHub screenshot"}" height="${"768"}" src="${"/screenshots/hero-dark.png"}" width="${"1024"}" class="${"svelte-1yc667v"}"></picture></div></div>`;
        }
      })}`;
    });
    css$22 = {
      code: "#design-section .page-section-inner{align-items:center;display:flex;flex-direction:column;overflow:hidden;text-align:center}.design-image.svelte-yr8tyk{-webkit-margin-before:164px;align-items:center;block-size:100%;display:flex;flex-direction:column;inline-size:80vw;justify-content:center;margin-block-start:164px;position:relative;text-align:center}.files-screenshot.svelte-yr8tyk,.files-wallpaper.svelte-yr8tyk{-webkit-user-drag:none;block-size:auto;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.files-screenshot.svelte-yr8tyk{-webkit-backdrop-filter:blur(60px) saturate(150%);backdrop-filter:blur(60px) saturate(150%);background-color:hsl(var(--mica-tint),var(--mica-tint-opacity));border:1px solid var(--fds-surface-stroke-default);border-radius:calc(var(--fds-overlay-corner-radius)/1.25);box-shadow:var(--fds-dialog-shadow);inline-size:70%;inset-block-start:-36px;inset-inline-end:0;inset-inline-start:0;margin:0 auto;max-inline-size:1024px;position:absolute;transition:transform 50ms linear;z-index:1}@media screen and (min-width:2049px){.files-screenshot.svelte-yr8tyk{border-radius:var(--fds-overlay-corner-radius)}}.files-wallpaper.svelte-yr8tyk{border:1px solid var(--fds-card-stroke-default);border-radius:calc(var(--fds-overlay-corner-radius)*1.5);inline-size:90%;max-inline-size:1440px;position:relative}@media screen and (max-width:1023px){.design-image.svelte-yr8tyk,.files-wallpaper.svelte-yr8tyk{inline-size:100%}.files-screenshot.svelte-yr8tyk{inset-block-start:0}}@media screen and (max-width:767px){.design-image.svelte-yr8tyk{-webkit-margin-before:48px;margin-block-start:48px}.files-screenshot.svelte-yr8tyk{inline-size:105%;inset-block-start:32px;inset-inline-start:-2.5%;transform:none!important}.files-wallpaper.svelte-yr8tyk{block-size:80vw;border-radius:0;inline-size:180%;-o-object-fit:cover;object-fit:cover;-o-object-position:bottom;object-position:bottom}}",
      map: null
    };
    DesignSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let scrollY;
      $$result.css.add(css$22);
      return `

${validate_component(PageSection, "PageSection").$$render($$result, { id: "design-section" }, {}, {
        default: () => {
          return `${validate_component(HeaderChip, "HeaderChip").$$render($$result, {}, {}, {
            default: () => {
              return `
	<img src="${"https://img.icons8.com/fluency/speedometer"}">`;
            }
          })}
	<h2>Fast and fluent</h2>
	<p>Coded with XAML and in-line with the Fluent design system, FluentHub&#39;s UI is truly perfect.
	</p>
	<div class="${"buttons-spacer"}">${validate_component(Button, "Button").$$render($$result, Object.assign({
            href: "https://github.com/FluentHub/FluentHub/blob/main/docs/build-from-source.md"
          }, externalLink, { variant: "accent" }), {}, {
            default: () => {
              return `Try it
		`;
            }
          })}
		${validate_component(Button, "Button").$$render($$result, Object.assign({
            href: "https://www.microsoft.com/design/fluent/"
          }, externalLink, { variant: "hyperlink" }), {}, {
            default: () => {
              return `Design System
		`;
            }
          })}</div>
	<div class="${"design-image svelte-yr8tyk"}"><picture><source media="${"(prefers-color-scheme: dark)"}" srcset="${"/screenshots/hero-dark.png"}">
			<source media="${"(prefers-color-scheme: light)"}" srcset="${"/screenshots/hero-light.png"}">
			<img alt="${"FluentHub screenshot"}" class="${"files-screenshot svelte-yr8tyk"}" height="${"384"}" src="${"/screenshots/hero-dark.png"}" width="${"512"}"${add_styles({
            "transform": `translateY(${Math.floor(scrollY / -10)}px)`
          })}></picture>
		<picture><source media="${"(prefers-color-scheme: dark)"}" srcset="${"/screenshots/desktop-dark.png"}">
			<source media="${"(prefers-color-scheme: light)"}" srcset="${"/screenshots/desktop-light.png"}">
			<img alt="${"Desktop wallpaper"}" class="${"files-wallpaper svelte-yr8tyk"}" height="${"900"}" src="${"/screenshots/desktop-dark.png"}" width="${"1440"}"></picture></div>`;
        }
      })}`;
    });
    css$13 = {
      code: "#design-section .page-section-inner{align-items:center;display:flex;flex-direction:column;overflow:hidden;text-align:center}.design-image.svelte-yr8tyk{-webkit-margin-before:164px;align-items:center;block-size:100%;display:flex;flex-direction:column;inline-size:80vw;justify-content:center;margin-block-start:164px;position:relative;text-align:center}.files-wallpaper.svelte-yr8tyk{-webkit-user-drag:none;block-size:auto;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}@media screen and (min-width:2049px){}.files-wallpaper.svelte-yr8tyk{border:1px solid var(--fds-card-stroke-default);border-radius:calc(var(--fds-overlay-corner-radius)*1.5);inline-size:90%;max-inline-size:1440px;position:relative}@media screen and (max-width:1023px){.design-image.svelte-yr8tyk,.files-wallpaper.svelte-yr8tyk{inline-size:100%}}@media screen and (max-width:767px){.design-image.svelte-yr8tyk{-webkit-margin-before:48px;margin-block-start:48px}.files-wallpaper.svelte-yr8tyk{block-size:80vw;border-radius:0;inline-size:180%;-o-object-fit:cover;object-fit:cover;-o-object-position:bottom;object-position:bottom}}",
      map: null
    };
    IntegrationSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let scrollY;
      $$result.css.add(css$13);
      return `

${validate_component(PageSection, "PageSection").$$render($$result, { id: "design-section" }, {}, {
        default: () => {
          return `${validate_component(HeaderChip, "HeaderChip").$$render($$result, {}, {}, {
            default: () => {
              return `
	<img src="${"https://img.icons8.com/fluency/link"}">`;
            }
          })}
	<h2>Integration without the fuss</h2>
	<p>FluentHub integrates GitHub&#39;s features without fuss. All you need to do is <a href="${"https://github.com/" + escape(links.github.owner) + "/" + escape(links.github.repo) + "/blob/main/docs/build-from-source.md"}">authenticate</a> and FluentHub will do the rest.
	</p>
	<div class="${"design-image svelte-yr8tyk"}"><img alt="${"FluentHub word-map"}" class="${"files-wallpaper svelte-yr8tyk"}" height="${"-1024"}" src="${"/branding/map.png"}" width="${"-1024"}"${add_styles({
            "transform": `translateY(${Math.floor(scrollY / -15)}px)`
          })}></div>`;
        }
      })}`;
    });
    ({ owner, repo } = links.github);
    getContributors = async (pageNumber = 0) => await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=35&page=${pageNumber}`).then((result) => result.json()).catch((err) => {
      console.error(err);
      return "";
    });
    css11 = {
      code: '@-webkit-keyframes svelte-13dbi9r-rotate-background{0%{background-position:0 50%}50%{background-position:100% 50%}to{background-position:0 50%}}@keyframes svelte-13dbi9r-rotate-background{0%{background-position:0 50%}50%{background-position:100% 50%}to{background-position:0 50%}}#community-section .buttons-spacer{justify-content:center}#community-section .buttons-spacer .button.style-hyperlink{color:var(--fds-accent-text-primary)}.community-section-text.svelte-13dbi9r.svelte-13dbi9r{--fds-solid-background-base:#f2f2f2;--fds-text-primary:#212121;--fds-text-secondary:#292929;--fds-text-tertiary:var(--fds-text-secondary);--fds-subtle-fill-secondary:rgba(0,0,0,.095);--fds-subtle-fill-tertiary:rgba(0,0,0,.024);--fds-subtle-fill-disabled:transparent;--fds-accent-text-primary:hsl(var(--fds-accent-dark-3));--fds-accent-text-tertiary:hsl(var(--fds-accent-dark-2));text-align:center}.community-section-text.svelte-13dbi9r p.svelte-13dbi9r{margin-inline:auto}.community-section-card.svelte-13dbi9r.svelte-13dbi9r{align-items:center;background-color:#f9f9f9;border-radius:var(--fds-overlay-corner-radius);box-shadow:0 2.74416px 2.74416px rgba(0,0,0,.03),0 5.48831px 5.48831px rgba(0,0,0,.04),0 13.7208px 10.9766px rgba(0,0,0,.05),0 20.5812px 20.5812px rgba(0,0,0,.06),0 41.1623px 41.1623px rgba(0,0,0,.07),0 96.0454px 89.1851px rgba(0,0,0,.09);display:flex;flex-direction:column;inline-size:100%;justify-content:center;max-inline-size:2048px;min-block-size:600px;padding:72px 48px;position:relative;z-index:0}.community-section-card.svelte-13dbi9r .rainbow-background.svelte-13dbi9r{-webkit-animation:svelte-13dbi9r-rotate-background 15s linear infinite;animation:svelte-13dbi9r-rotate-background 15s linear infinite;background-color:#ccbad4;background-image:radial-gradient(at 68% 34%,#8994ec 0,transparent 43%),radial-gradient(at 51% 0,#a48df2 0,transparent 57%),radial-gradient(at 80% 2%,#c079f6 0,transparent 41%),radial-gradient(at 96% 100%,#7b56f5 0,transparent 47%),radial-gradient(at 1% 84%,#8994ec 0,transparent 41%),radial-gradient(at 19% 100%,#a47bea 0,transparent 44%),radial-gradient(at 46% 100%,#a48df2 0,transparent 49%),radial-gradient(at 92% 72%,#cfbdd6 0,transparent 43%);background-size:150% 150%;block-size:100%;border-radius:var(--fds-overlay-corner-radius);inline-size:100%;inset-block-start:0;inset-inline-start:0;position:absolute;z-index:-1}@-webkit-keyframes svelte-13dbi9r-contributors-left{to{transform:translateX(50%)}}@keyframes svelte-13dbi9r-contributors-left{to{transform:translateX(50%)}}@-webkit-keyframes svelte-13dbi9r-contributors-right{to{transform:translateX(-50%)}}@keyframes svelte-13dbi9r-contributors-right{to{transform:translateX(-50%)}}.contributors-container.svelte-13dbi9r.svelte-13dbi9r{-webkit-margin-after:-128px;inline-size:100vw;margin-block-end:-128px;max-inline-size:2800px;overflow:hidden;padding:64px 0 128px;position:relative}.contributors-container.svelte-13dbi9r.svelte-13dbi9r:after,.contributors-container.svelte-13dbi9r.svelte-13dbi9r:before{block-size:100%;inline-size:96px;position:absolute;z-index:1}@media screen and (min-width:2801px){.contributors-container.svelte-13dbi9r.svelte-13dbi9r:after,.contributors-container.svelte-13dbi9r.svelte-13dbi9r:before{content:""}}.contributors-container.svelte-13dbi9r.svelte-13dbi9r:before{background-image:linear-gradient(90deg,var(--fds-solid-background-secondary),transparent);inset-inline-start:0}.contributors-container.svelte-13dbi9r.svelte-13dbi9r:after{background:linear-gradient(90deg,transparent,var(--fds-solid-background-tertiary));inset-inline-end:0}.contributors-row.svelte-13dbi9r.svelte-13dbi9r{-webkit-margin-after:12px;margin-block-end:12px;position:relative;white-space:nowrap}.contributors-row.svelte-13dbi9r .contributor{-webkit-margin-end:12px;margin-inline-end:12px}.contributors-row.svelte-13dbi9r.svelte-13dbi9r:nth-child(2n){-webkit-animation:svelte-13dbi9r-contributors-right 80s linear infinite alternate;animation:svelte-13dbi9r-contributors-right 80s linear infinite alternate;float:left;inset-inline-start:24px}.contributors-row.svelte-13dbi9r.svelte-13dbi9r:nth-child(odd){-webkit-animation:svelte-13dbi9r-contributors-left 80s linear infinite alternate;animation:svelte-13dbi9r-contributors-left 80s linear infinite alternate;float:right;inset-inline-start:-24px}.contributors-row.svelte-13dbi9r.svelte-13dbi9r:last-child{-webkit-animation-delay:2s;animation-delay:2s;margin:0}@media screen and (max-width:767px){.community-section-card.svelte-13dbi9r.svelte-13dbi9r{padding:24px}.community-section-card.svelte-13dbi9r h2.svelte-13dbi9r{font-size:3.2rem}}',
      map: null
    };
    OpenSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const contributorRows = [getContributors(1), getContributors(2), getContributors(3)];
      $$result.css.add(css11);
      return `${validate_component(PageSection, "PageSection").$$render($$result, { id: "community-section" }, {}, {
        default: () => {
          return `<div class="${"community-section-card svelte-13dbi9r"}"><div class="${"community-section-text svelte-13dbi9r"}">${validate_component(HeaderChip, "HeaderChip").$$render($$result, {}, {}, {
            default: () => {
              return `
			<img src="${"https://img.icons8.com/fluency/team"}">`;
            }
          })}
			<h2 class="${"svelte-13dbi9r"}">A thriving community</h2>
			<p class="${"svelte-13dbi9r"}">FluentHub is open-source and anyone can contribute to it. Made with C#, XAML and \u{1F497}, our app has no limits.
				Our community is what makes Fluenthub real - what point is there in an app that isn&#39;t influenced
				by it&#39;s users and community?
			</p>
			<div class="${"buttons-spacer"}">${validate_component(Button, "Button").$$render($$result, {
            variant: "hyperlink",
            href: "https://discord.gg/" + links.discord
          }, {}, {
            default: () => {
              return `Join the discussion
				`;
            }
          })}
				${validate_component(Button, "Button").$$render($$result, {
            variant: "hyperlink",
            href: "https://github.com/FluentHub/Fluenthub"
          }, {}, {
            default: () => {
              return `Contribute to the project
				`;
            }
          })}</div></div>
		${contributorRows.every((it) => it) ? `<div class="${"contributors-container svelte-13dbi9r"}">${each(contributorRows, (contributorsPromise) => {
            return `<div class="${"contributors-row svelte-13dbi9r"}">${function(__value) {
              if (is_promise(__value)) {
                __value.then(null, noop2);
                return ``;
              }
              return function(contributors) {
                return `
						${each(contributors.sort(() => Math.random() - 0.5), ({ html_url, avatar_url, login, contributions, type }) => {
                  return `${validate_component(Contributor, "Contributor").$$render($$result, {
                    html_url,
                    avatar_url,
                    login,
                    contributions,
                    type
                  }, {}, {})}`;
                })}
					`;
              }(__value);
            }(contributorsPromise)}
				</div>`;
          })}</div>` : ``}
		<div class="${"rainbow-background svelte-13dbi9r"}"></div></div>`;
        }
      })}`;
    });
    Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${$$result.head += `${validate_component(Metadata, "Metadata").$$render($$result, { title: "FluentHub" }, {}, {})}`, ""}

${validate_component(HeroSection, "HeroSection").$$render($$result, {}, {}, {})}

${validate_component(DesignSection, "DesignSection").$$render($$result, {}, {}, {})}

${validate_component(IntegrationSection, "IntegrationSection").$$render($$result, {}, {}, {})}

${validate_component(OpenSection, "OpenSection").$$render($$result, {}, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  css: () => css12,
  entry: () => entry3,
  js: () => js3,
  module: () => index_svelte_exports
});
var entry3, js3, css12;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    init_index_svelte();
    entry3 = "pages/index.svelte-499aab50.js";
    js3 = ["pages/index.svelte-499aab50.js", "chunks/vendor-ec6aa394.js", "chunks/PageSection-45e2382a.js", "chunks/BlogCard.svelte_svelte_type_style_lang-3569a11f.js", "chunks/utils-9a9bd3c9.js", "chunks/Footer.svelte_svelte_type_style_lang-266e6168.js", "chunks/HeaderChip-b92ad979.js", "chunks/Metadata-25f018aa.js"];
    css12 = ["assets/vendor-20988698.css", "assets/BlogCard.svelte_svelte_type_style_lang-32dcf37c.css", "assets/Footer.svelte_svelte_type_style_lang-82d3483d.css"];
  }
});

// .svelte-kit/output/server/entries/pages/about/index.svelte.js
var index_svelte_exports2 = {};
__export(index_svelte_exports2, {
  default: () => About
});
var css13, About;
var init_index_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/about/index.svelte.js"() {
    init_index_9a0d4ca8();
    init_PageSection_c7953e3b();
    init_BlogCard_svelte_svelte_type_style_lang_5e5f1546();
    init_Metadata_6271aef0();
    css13 = {
      code: "#blog{position:relative}#blog .page-section-inner{max-inline-size:1200px;position:static}.blog-backdrop.svelte-qtpyjy.svelte-qtpyjy{inline-size:100%;inset-block-start:-64px;inset-inline-start:0;-webkit-mask:linear-gradient(#000,transparent 80%);mask:linear-gradient(#000,transparent 80%);opacity:.25;position:absolute;z-index:-1}.blog-backdrop.svelte-qtpyjy img.svelte-qtpyjy{block-size:664px;inline-size:100%;-o-object-fit:cover;object-fit:cover}.main-post.svelte-qtpyjy.svelte-qtpyjy{grid-gap:48px;-webkit-margin-after:72px;-webkit-padding-after:72px;-webkit-border-after:1px solid var(--fds-divider-stroke-default);align-items:center;border-block-end:1px solid var(--fds-divider-stroke-default);display:grid;grid-template-columns:60% 40%;inline-size:100%;margin-block-end:72px;padding-block-end:72px;position:relative}@media screen and (max-width:1023px){.main-post.svelte-qtpyjy.svelte-qtpyjy{grid-template-columns:auto}}.main-post.svelte-qtpyjy img.svelte-qtpyjy{-webkit-user-drag:none;aspect-ratio:3/2;block-size:auto;border:1px solid var(--fds-surface-stroke-default);border-radius:var(--fds-overlay-corner-radius);box-shadow:0 2.74416px 2.74416px rgba(0,0,0,.03),0 5.48831px 5.48831px rgba(0,0,0,.04),0 13.7208px 10.9766px rgba(0,0,0,.05),0 20.5812px 20.5812px rgba(0,0,0,.06),0 41.1623px 41.1623px rgba(0,0,0,.07),0 96.0454px 89.1851px rgba(0,0,0,.09);max-inline-size:100%;-o-object-fit:cover;object-fit:cover;transition:.2s ease!important}@media screen and (max-width:1279px){}.main-post.svelte-qtpyjy .button{cursor:pointer}",
      map: null
    };
    About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let scrollY;
      $$result.css.add(css13);
      return `${$$result.head += `${validate_component(Metadata, "Metadata").$$render($$result, {
        title: "FluentHub | About",
        image: "about"
      }, {}, {})}`, ""}



${validate_component(PageSection, "PageSection").$$render($$result, { id: "blog" }, {}, {
        default: () => {
          return `<div class="${"blog-backdrop svelte-qtpyjy"}"><img alt="${"Visual Studio Code"}" src="${"/screenshots/code-dark.png"}" width="${"0"}" class="${"svelte-qtpyjy"}"${add_styles({
            "transform": `translateY(${Math.floor(scrollY / 2.5)}px)`
          })}></div>
	<div class="${"main-post svelte-qtpyjy"}"><img alt="${"Cats"}" src="${"/about-resources/cats.png"}" class="${"svelte-qtpyjy"}">
		<div class="${"about"}"><h3>What is FluentHub?</h3>
			<p>FluentHub is an amazing project founded by <a href="${"https://github.com/onein528"}">@onein528</a>, a Japanese developer.
				FluentHub largely respects the <a href="${"https://github.com/files-community"}">Files Community</a> and part of it is based on it. 
			</p></div></div>`;
        }
      })}`;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  css: () => css14,
  entry: () => entry4,
  js: () => js4,
  module: () => index_svelte_exports2
});
var entry4, js4, css14;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    init_index_svelte2();
    entry4 = "pages/about/index.svelte-02c9d30a.js";
    js4 = ["pages/about/index.svelte-02c9d30a.js", "chunks/vendor-ec6aa394.js", "chunks/PageSection-45e2382a.js", "chunks/BlogCard.svelte_svelte_type_style_lang-3569a11f.js", "chunks/Metadata-25f018aa.js"];
    css14 = ["assets/pages/about/index.svelte-1d5a7f4e.css", "assets/vendor-20988698.css", "assets/BlogCard.svelte_svelte_type_style_lang-32dcf37c.css"];
  }
});

// .svelte-kit/output/server/entries/pages/blog/index.svelte.js
var index_svelte_exports3 = {};
__export(index_svelte_exports3, {
  default: () => Blog,
  load: () => load2
});
var css$14, BlogCard, css15, load2, Blog;
var init_index_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/blog/index.svelte.js"() {
    init_index_9a0d4ca8();
    init_PageSection_c7953e3b();
    init_Button_ab8c6742();
    init_BlogCard_svelte_svelte_type_style_lang_5e5f1546();
    init_HeaderChip_30e6e0a1();
    init_utils_9a9bd3c9();
    init_Metadata_6271aef0();
    init_internal_82ab3b7f();
    css$14 = {
      code: ".blog-card.svelte-yhdwvw.svelte-yhdwvw{background-color:var(--fds-card-background-secondary);block-size:auto;border:1px solid var(--fds-card-stroke-default);border-radius:var(--fds-overlay-corner-radius);box-shadow:var(--fds-card-shadow);cursor:pointer;display:flex;flex-direction:column;min-block-size:380px;overflow:hidden;text-decoration:none;transition:var(--fds-control-normal-duration) ease}.blog-card.svelte-yhdwvw.svelte-yhdwvw:hover{box-shadow:var(--fds-flyout-shadow);transform:translateY(-2px)}.blog-card.svelte-yhdwvw.svelte-yhdwvw:active{box-shadow:0 1px 2px rgba(0,0,0,.13);transform:none}.blog-card.svelte-yhdwvw img.svelte-yhdwvw{-webkit-user-drag:none;block-size:193.5px;flex:0 0 auto;inline-size:100%}.blog-card.svelte-yhdwvw footer.svelte-yhdwvw{align-items:center;display:flex;flex:0 0 auto;gap:8px;padding:12px 24px 24px}.blog-card.svelte-yhdwvw footer img.svelte-yhdwvw{block-size:36px;border:1px solid var(--fds-card-stroke-default);border-radius:50%;inline-size:36px}.blog-card.svelte-yhdwvw footer .post-info.svelte-yhdwvw{color:var(--fds-text-tertiary);display:flex;flex-direction:column;font-size:1.2rem;font-weight:400}.blog-card.svelte-yhdwvw footer .post-info a.svelte-yhdwvw{color:var(--fds-text-primary);font-size:var(--fds-body-font-size);font-weight:600;margin:0 0 2px;text-decoration:none}.blog-card.svelte-yhdwvw footer .post-info a.svelte-yhdwvw:hover{color:var(--fds-accent-default)}.blog-card.svelte-yhdwvw footer .post-info a.svelte-yhdwvw:active{color:var(--fds-accent)}.body.svelte-yhdwvw.svelte-yhdwvw{color:var(--fds-text-secondary);flex:1 1 auto;font-size:1.6rem;line-height:24px;padding:24px 24px 0}.body.svelte-yhdwvw h5.svelte-yhdwvw{color:var(--fds-text-primary);font-size:24px;font-weight:600;line-height:32px;margin:0 0 4px}",
      map: null
    };
    BlogCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["path", "date", "author", "title", "description", "thumbnail"]);
      let { path = "" } = $$props;
      let { date = "" } = $$props;
      let { author = "" } = $$props;
      let { title = "" } = $$props;
      let { description = "" } = $$props;
      let { thumbnail = "" } = $$props;
      if ($$props.path === void 0 && $$bindings.path && path !== void 0)
        $$bindings.path(path);
      if ($$props.date === void 0 && $$bindings.date && date !== void 0)
        $$bindings.date(date);
      if ($$props.author === void 0 && $$bindings.author && author !== void 0)
        $$bindings.author(author);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      if ($$props.description === void 0 && $$bindings.description && description !== void 0)
        $$bindings.description(description);
      if ($$props.thumbnail === void 0 && $$bindings.thumbnail && thumbnail !== void 0)
        $$bindings.thumbnail(thumbnail);
      $$result.css.add(css$14);
      return `<a${spread([
        { class: "blog-card" },
        {
          href: "/blog/" + escape(path.replace(/\.[^/.]+$/, ""))
        },
        escape_object($$restProps)
      ], { classes: "svelte-yhdwvw" })}><img alt="${escape(title) + " thumbnail"}" class="${"thumbnail svelte-yhdwvw"}"${add_attribute("src", thumbnail, 0)}>
	<div class="${"body svelte-yhdwvw"}"><h5 class="${"svelte-yhdwvw"}">${escape(title)}</h5>
		<span>${escape(description)}</span></div>
	<footer class="${"svelte-yhdwvw"}"><img alt="${escape(author) + " avatar"}" loading="${"lazy"}" src="${"https://github.com/" + escape(author) + ".png"}" class="${"svelte-yhdwvw"}">
		<div class="${"post-info svelte-yhdwvw"}"><object aria-label="${"Author link"}"><a${spread([
        {
          href: "https://github.com/" + escape(author)
        },
        { rel: "noreferrer noopener" },
        escape_object(externalLink)
      ], { classes: "svelte-yhdwvw" })}>${escape(author)}</a></object>
			<span>${escape(new Date(date.replace(/-/g, "/").replace(/T.+/, "")).toLocaleDateString("en-US", {
        year: "numeric",
        day: "numeric",
        month: "short"
      }))}</span></div></footer>
	${slots.default ? slots.default({}) : ``}
</a>`;
    });
    css15 = {
      code: "#blog{position:relative}#blog .page-section-inner{max-inline-size:1200px;position:static}.blog-backdrop.svelte-qtpyjy.svelte-qtpyjy{inline-size:100%;inset-block-start:-64px;inset-inline-start:0;-webkit-mask:linear-gradient(#000,transparent 80%);mask:linear-gradient(#000,transparent 80%);opacity:.25;position:absolute;z-index:-1}.blog-backdrop.svelte-qtpyjy img.svelte-qtpyjy{block-size:664px;inline-size:100%;-o-object-fit:cover;object-fit:cover}.main-post.svelte-qtpyjy.svelte-qtpyjy{grid-gap:48px;-webkit-margin-after:72px;-webkit-padding-after:72px;-webkit-border-after:1px solid var(--fds-divider-stroke-default);align-items:center;border-block-end:1px solid var(--fds-divider-stroke-default);display:grid;grid-template-columns:60% 40%;inline-size:100%;margin-block-end:72px;padding-block-end:72px;position:relative}@media screen and (max-width:1023px){.main-post.svelte-qtpyjy.svelte-qtpyjy{grid-template-columns:auto}}.main-post.svelte-qtpyjy img.svelte-qtpyjy{-webkit-user-drag:none;aspect-ratio:3/2;block-size:auto;border:1px solid var(--fds-surface-stroke-default);border-radius:var(--fds-overlay-corner-radius);box-shadow:0 2.74416px 2.74416px rgba(0,0,0,.03),0 5.48831px 5.48831px rgba(0,0,0,.04),0 13.7208px 10.9766px rgba(0,0,0,.05),0 20.5812px 20.5812px rgba(0,0,0,.06),0 41.1623px 41.1623px rgba(0,0,0,.07),0 96.0454px 89.1851px rgba(0,0,0,.09);max-inline-size:100%;-o-object-fit:cover;object-fit:cover;transition:.2s ease!important}@media screen and (max-width:1279px){.main-post.svelte-qtpyjy h2.svelte-qtpyjy{font-size:3.6rem}}.main-post.svelte-qtpyjy .button{cursor:pointer}.blog-cards.svelte-qtpyjy.svelte-qtpyjy{grid-gap:24px;-webkit-margin-before:24px;display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));margin-block-start:24px}",
      map: null
    };
    load2 = async ({ fetch: fetch3 }) => ({
      props: {
        posts: await fetch3("/blog.json").then((response) => response.json())
      }
    });
    Blog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { posts } = $$props;
      const mainPost = posts[0];
      let scrollY;
      if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0)
        $$bindings.posts(posts);
      $$result.css.add(css15);
      return `${$$result.head += `${validate_component(Metadata, "Metadata").$$render($$result, { title: "Codrex | Blog", image: "blog" }, {}, {})}`, ""}



${validate_component(PageSection, "PageSection").$$render($$result, { id: "blog" }, {}, {
        default: () => {
          return `<div class="${"blog-backdrop svelte-qtpyjy"}"><img alt="${""}"${add_attribute("src", mainPost.metadata.thumbnail, 0)} width="${"0"}" class="${"svelte-qtpyjy"}"${add_styles({
            "transform": `translateY(${Math.floor(scrollY / 2.5)}px)`
          })}></div>
	<div class="${"main-post svelte-qtpyjy"}"><a href="${"/blog/" + escape(mainPost.path.replace(/\.[^/.]+$/, "")) + "/"}"><img alt="${"Main post thumbnail"}" height="${"422"}"${add_attribute("src", mainPost.metadata.thumbnail, 0)} width="${"633"}" class="${"svelte-qtpyjy"}"></a>
		<div class="${"main-post-info"}">${validate_component(HeaderChip, "HeaderChip").$$render($$result, {}, {}, {
            default: () => {
              return `${escape(new Date(mainPost.metadata.date.replace(/-/g, "/").replace(/T.+/, "")).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric"
              }))}`;
            }
          })}
			<h2 class="${"svelte-qtpyjy"}">${escape(mainPost.metadata.title)}</h2>
			<p>${escape(mainPost.metadata.description)}</p>
			${validate_component(Button, "Button").$$render($$result, {
            href: "/blog/" + mainPost.path.replace(/\.[^/.]+$/, "") + "/",
            variant: "accent"
          }, {}, {
            default: () => {
              return `Read More
			`;
            }
          })}</div></div>
	${posts.slice(1).length > 0 ? `<div class="${"blog-cards svelte-qtpyjy"}">${each(posts.slice(1), (post) => {
            return `${validate_component(BlogCard, "BlogCard").$$render($$result, Object.assign({ path: post.path }, post.metadata), {}, {})}`;
          })}</div>` : `<p>More posts coming soon!</p>`}`;
        }
      })}`;
    });
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  css: () => css16,
  entry: () => entry5,
  js: () => js5,
  module: () => index_svelte_exports3
});
var entry5, js5, css16;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    init_index_svelte3();
    entry5 = "pages/blog/index.svelte-cb7ee333.js";
    js5 = ["pages/blog/index.svelte-cb7ee333.js", "chunks/vendor-ec6aa394.js", "chunks/PageSection-45e2382a.js", "chunks/BlogCard.svelte_svelte_type_style_lang-3569a11f.js", "chunks/HeaderChip-b92ad979.js", "chunks/utils-9a9bd3c9.js", "chunks/Metadata-25f018aa.js"];
    css16 = ["assets/pages/blog/index.svelte-ab264715.css", "assets/vendor-20988698.css", "assets/BlogCard.svelte_svelte_type_style_lang-32dcf37c.css"];
  }
});

// .svelte-kit/output/server/entries/pages/blog/posts/__layout.svelte.js
var layout_svelte_exports2 = {};
__export(layout_svelte_exports2, {
  default: () => _layout2,
  load: () => load3
});
var candidateSelectors, candidateSelector, matches, getCandidates, isContentEditable, getTabindex, sortOrderedTabbables, isInput, isHiddenInput, isDetailsWithSummary, getCheckedRadio, isTabbableRadio, isRadio, isNonTabbableRadio, isHidden, isDisabledFromFieldset, isNodeMatchingSelectorFocusable, isNodeMatchingSelectorTabbable, tabbable, css$33, MenuFlyoutSurface, css$23, MenuFlyoutWrapper, css$15, MenuFlyoutItem, Share, ArrowLeft, css17, load3, _layout2;
var init_layout_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/blog/posts/__layout.svelte.js"() {
    init_index_9a0d4ca8();
    init_BlogCard_svelte_svelte_type_style_lang_5e5f1546();
    init_IconButton_fbace740();
    init_internal_82ab3b7f();
    init_TextBlock_8742300e();
    init_Metadata_6271aef0();
    init_utils_9a9bd3c9();
    candidateSelectors = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])', "details>summary:first-of-type", "details"];
    candidateSelector = /* @__PURE__ */ candidateSelectors.join(",");
    matches = typeof Element === "undefined" ? function() {
    } : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    getCandidates = function getCandidates2(el, includeContainer, filter) {
      var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
      if (includeContainer && matches.call(el, candidateSelector)) {
        candidates.unshift(el);
      }
      candidates = candidates.filter(filter);
      return candidates;
    };
    isContentEditable = function isContentEditable2(node) {
      return node.contentEditable === "true";
    };
    getTabindex = function getTabindex2(node) {
      var tabindexAttr = parseInt(node.getAttribute("tabindex"), 10);
      if (!isNaN(tabindexAttr)) {
        return tabindexAttr;
      }
      if (isContentEditable(node)) {
        return 0;
      }
      if ((node.nodeName === "AUDIO" || node.nodeName === "VIDEO" || node.nodeName === "DETAILS") && node.getAttribute("tabindex") === null) {
        return 0;
      }
      return node.tabIndex;
    };
    sortOrderedTabbables = function sortOrderedTabbables2(a, b) {
      return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
    };
    isInput = function isInput2(node) {
      return node.tagName === "INPUT";
    };
    isHiddenInput = function isHiddenInput2(node) {
      return isInput(node) && node.type === "hidden";
    };
    isDetailsWithSummary = function isDetailsWithSummary2(node) {
      var r2 = node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
        return child.tagName === "SUMMARY";
      });
      return r2;
    };
    getCheckedRadio = function getCheckedRadio2(nodes, form) {
      for (var i2 = 0; i2 < nodes.length; i2++) {
        if (nodes[i2].checked && nodes[i2].form === form) {
          return nodes[i2];
        }
      }
    };
    isTabbableRadio = function isTabbableRadio2(node) {
      if (!node.name) {
        return true;
      }
      var radioScope = node.form || node.ownerDocument;
      var queryRadios = function queryRadios2(name) {
        return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
      };
      var radioSet;
      if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") {
        radioSet = queryRadios(window.CSS.escape(node.name));
      } else {
        try {
          radioSet = queryRadios(node.name);
        } catch (err) {
          console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
          return false;
        }
      }
      var checked = getCheckedRadio(radioSet, node.form);
      return !checked || checked === node;
    };
    isRadio = function isRadio2(node) {
      return isInput(node) && node.type === "radio";
    };
    isNonTabbableRadio = function isNonTabbableRadio2(node) {
      return isRadio(node) && !isTabbableRadio(node);
    };
    isHidden = function isHidden2(node, displayCheck) {
      if (getComputedStyle(node).visibility === "hidden") {
        return true;
      }
      var isDirectSummary = matches.call(node, "details>summary:first-of-type");
      var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
      if (matches.call(nodeUnderDetails, "details:not([open]) *")) {
        return true;
      }
      if (!displayCheck || displayCheck === "full") {
        while (node) {
          if (getComputedStyle(node).display === "none") {
            return true;
          }
          node = node.parentElement;
        }
      } else if (displayCheck === "non-zero-area") {
        var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
        return width === 0 && height === 0;
      }
      return false;
    };
    isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
      if (isInput(node) || node.tagName === "SELECT" || node.tagName === "TEXTAREA" || node.tagName === "BUTTON") {
        var parentNode = node.parentElement;
        while (parentNode) {
          if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
            for (var i2 = 0; i2 < parentNode.children.length; i2++) {
              var child = parentNode.children.item(i2);
              if (child.tagName === "LEGEND") {
                if (child.contains(node)) {
                  return false;
                }
                return true;
              }
            }
            return true;
          }
          parentNode = parentNode.parentElement;
        }
      }
      return false;
    };
    isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
      if (node.disabled || isHiddenInput(node) || isHidden(node, options.displayCheck) || isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
        return false;
      }
      return true;
    };
    isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
      if (!isNodeMatchingSelectorFocusable(options, node) || isNonTabbableRadio(node) || getTabindex(node) < 0) {
        return false;
      }
      return true;
    };
    tabbable = function tabbable2(el, options) {
      options = options || {};
      var regularTabbables = [];
      var orderedTabbables = [];
      var candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
      candidates.forEach(function(candidate, i2) {
        var candidateTabindex = getTabindex(candidate);
        if (candidateTabindex === 0) {
          regularTabbables.push(candidate);
        } else {
          orderedTabbables.push({
            documentOrder: i2,
            tabIndex: candidateTabindex,
            node: candidate
          });
        }
      });
      var tabbableNodes = orderedTabbables.sort(sortOrderedTabbables).map(function(a) {
        return a.node;
      }).concat(regularTabbables);
      return tabbableNodes;
    };
    css$33 = {
      code: "@-webkit-keyframes svelte-otnc85-menu-open{0%{transform:translateY(var(--fds-menu-flyout-transition-offset,-50%))}to{transform:none}}@keyframes svelte-otnc85-menu-open{0%{transform:translateY(var(--fds-menu-flyout-transition-offset,-50%))}to{transform:none}}@-webkit-keyframes svelte-otnc85-menu-shadow{0%{box-shadow:none}to{box-shadow:var(--fds-flyout-shadow)}}@keyframes svelte-otnc85-menu-shadow{0%{box-shadow:none}to{box-shadow:var(--fds-flyout-shadow)}}.menu-flyout.svelte-otnc85{-webkit-animation:svelte-otnc85-menu-open var(--fds-control-normal-duration) var(--fds-control-fast-out-slow-in-easing),svelte-otnc85-menu-shadow var(--fds-control-fast-duration) var(--fds-control-fast-out-slow-in-easing) var(--fds-control-normal-duration) forwards;animation:svelte-otnc85-menu-open var(--fds-control-normal-duration) var(--fds-control-fast-out-slow-in-easing),svelte-otnc85-menu-shadow var(--fds-control-fast-duration) var(--fds-control-fast-out-slow-in-easing) var(--fds-control-normal-duration) forwards;background-clip:padding-box;background-color:var(--fds-flyout-fallback-background-default);border:1px solid var(--fds-surface-stroke-flyout);border-radius:var(--fds-overlay-corner-radius);box-sizing:border-box;color:var(--fds-text-primary);display:flex;flex-direction:column;font-family:var(--fds-font-family-text);font-size:var(--fds-body-font-size);font-weight:400;line-height:20px;margin:0;max-block-size:100vh;max-inline-size:100%;min-inline-size:120px;padding:0;padding-block:2px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.menu-flyout-surface-container.svelte-otnc85{overflow:hidden}",
      map: null
    };
    MenuFlyoutSurface = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["class", "element"]);
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      $$result.css.add(css$33);
      return `<div class="${"menu-flyout-surface-container svelte-otnc85"}"${add_attribute("style", void 0, 0)}><ul${spread([
        {
          class: "menu-flyout " + escape(className)
        },
        escape_object($$restProps)
      ], { classes: "svelte-otnc85" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</ul>
</div>`;
    });
    css$23 = {
      code: ".menu-flyout-wrapper.svelte-as1gqa{display:inline-block;height:auto;position:relative}.menu-flyout-backdrop.svelte-as1gqa{height:100%;left:0;position:fixed;top:0;width:100%;z-index:9999}.menu-flyout-anchor.svelte-as1gqa{position:absolute;z-index:10000}.menu-flyout-anchor.placement-top.svelte-as1gqa{--fds-menu-flyout-transition-offset:50%;bottom:calc(100% + var(--fds-menu-flyout-offset))}.menu-flyout-anchor.placement-bottom.svelte-as1gqa{top:calc(100% + var(--fds-menu-flyout-offset))}.menu-flyout-anchor.placement-left.svelte-as1gqa{right:calc(100% + var(--fds-menu-flyout-offset))}.menu-flyout-anchor.placement-right.svelte-as1gqa{left:calc(100% + var(--fds-menu-flyout-offset))}.menu-flyout-anchor.placement-bottom.alignment-start.svelte-as1gqa,.menu-flyout-anchor.placement-top.alignment-start.svelte-as1gqa{inset-inline-start:0}.menu-flyout-anchor.placement-bottom.alignment-end.svelte-as1gqa,.menu-flyout-anchor.placement-top.alignment-end.svelte-as1gqa{inset-inline-end:0}.menu-flyout-anchor.placement-bottom.alignment-center.svelte-as1gqa,.menu-flyout-anchor.placement-top.alignment-center.svelte-as1gqa{inset-inline-start:50%;transform:translateX(-50%)}.menu-flyout-anchor.placement-left.alignment-start.svelte-as1gqa,.menu-flyout-anchor.placement-right.alignment-start.svelte-as1gqa{inset-block-start:0}.menu-flyout-anchor.placement-left.alignment-end.svelte-as1gqa,.menu-flyout-anchor.placement-right.alignment-end.svelte-as1gqa{inset-block-end:0}.menu-flyout-anchor.placement-left.alignment-center.svelte-as1gqa,.menu-flyout-anchor.placement-right.alignment-center.svelte-as1gqa{inset-block-start:50%;transform:translateY(-50%)}",
      map: null
    };
    MenuFlyoutWrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, [
        "open",
        "closable",
        "closeOnSelect",
        "placement",
        "alignment",
        "offset",
        "class",
        "wrapperElement",
        "anchorElement",
        "menuElement",
        "backdropElement"
      ]);
      let { open = false } = $$props;
      let { closable = true } = $$props;
      let { closeOnSelect = true } = $$props;
      let { placement = "top" } = $$props;
      let { alignment = "center" } = $$props;
      let { offset = 4 } = $$props;
      let { class: className = "" } = $$props;
      let { wrapperElement = null } = $$props;
      let { anchorElement = null } = $$props;
      let { menuElement = null } = $$props;
      let { backdropElement = null } = $$props;
      const dispatch = createEventDispatcher();
      const menuId = uid("fds-menu-flyout-anchor-");
      let menu = null;
      setContext("closeFlyout", (event) => {
        dispatch("select");
        if (closeOnSelect && closable) {
          event.stopPropagation();
          open = false;
        }
      });
      if ($$props.open === void 0 && $$bindings.open && open !== void 0)
        $$bindings.open(open);
      if ($$props.closable === void 0 && $$bindings.closable && closable !== void 0)
        $$bindings.closable(closable);
      if ($$props.closeOnSelect === void 0 && $$bindings.closeOnSelect && closeOnSelect !== void 0)
        $$bindings.closeOnSelect(closeOnSelect);
      if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0)
        $$bindings.placement(placement);
      if ($$props.alignment === void 0 && $$bindings.alignment && alignment !== void 0)
        $$bindings.alignment(alignment);
      if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0)
        $$bindings.offset(offset);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.wrapperElement === void 0 && $$bindings.wrapperElement && wrapperElement !== void 0)
        $$bindings.wrapperElement(wrapperElement);
      if ($$props.anchorElement === void 0 && $$bindings.anchorElement && anchorElement !== void 0)
        $$bindings.anchorElement(anchorElement);
      if ($$props.menuElement === void 0 && $$bindings.menuElement && menuElement !== void 0)
        $$bindings.menuElement(menuElement);
      if ($$props.backdropElement === void 0 && $$bindings.backdropElement && backdropElement !== void 0)
        $$bindings.backdropElement(backdropElement);
      $$result.css.add(css$23);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        {
          dispatch(open ? "open" : "close");
        }
        {
          if (menu && tabbable(menuElement).length > 0)
            tabbable(menuElement)[0].focus();
        }
        $$rendered = `

<div class="${"menu-flyout-wrapper svelte-as1gqa"}"${add_attribute("aria-expanded", open, 0)}${add_attribute("aria-haspopup", open, 0)}${add_attribute("aria-controls", menuId, 0)}${add_attribute("this", wrapperElement, 0)}>${slots.default ? slots.default({}) : ``}
	${open ? `<div${add_attribute("id", menuId, 0)} class="${"menu-flyout-anchor placement-" + escape(placement) + " alignment-" + escape(alignment) + " svelte-as1gqa"}" style="${"--fds-menu-flyout-offset: " + escape(offset) + "px;"}" tabindex="${"-1"}"${add_attribute("this", anchorElement, 0)}>${validate_component(MenuFlyoutSurface, "MenuFlyoutSurface").$$render($$result, Object.assign({ class: className ?? "" }, $$restProps, { element: menuElement }, { this: menu }), {
          element: ($$value) => {
            menuElement = $$value;
            $$settled = false;
          },
          this: ($$value) => {
            menu = $$value;
            $$settled = false;
          }
        }, {
          default: () => {
            return `${slots.flyout ? slots.flyout({}) : ``}`;
          }
        })}</div>
		<div class="${"menu-flyout-backdrop svelte-as1gqa"}"${add_attribute("this", backdropElement, 0)}></div>` : ``}
</div>`;
      } while (!$$settled);
      return $$rendered;
    });
    css$15 = {
      code: '.menu-flyout-item.svelte-s7v067.svelte-s7v067{align-items:center;background-color:var(--fds-subtle-fill-transparent);block-size:28px;border-radius:var(--fds-control-corner-radius);box-sizing:border-box;color:var(--fds-text-primary);cursor:default;display:flex;flex:0 0 auto;font-family:var(--fds-font-family-text);font-size:var(--fds-body-font-size);font-weight:400;inline-size:calc(100% - 8px);line-height:20px;margin:2px 4px;outline:none;padding-inline:12px;position:relative;text-decoration:none;text-overflow:ellipsis;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;white-space:nowrap}.menu-flyout-item.svelte-s7v067.svelte-s7v067:before{background-color:var(--fds-accent-default);block-size:0;border-radius:3px;content:"";inline-size:3px;inset-inline-start:0;opacity:0;position:absolute;transition:transform var(--fds-control-fast-duration) var(--fds-control-fast-out-slow-in-easing)}.menu-flyout-item.svelte-s7v067.svelte-s7v067:focus-visible{box-shadow:var(--fds-focus-stroke)}.menu-flyout-item.selected.svelte-s7v067.svelte-s7v067,.menu-flyout-item.svelte-s7v067.svelte-s7v067:hover,.menu-flyout-item[aria-expanded=true].svelte-s7v067.svelte-s7v067{background-color:var(--fds-subtle-fill-secondary)}.menu-flyout-item.checked.svelte-s7v067 .menu-flyout-item-bullet,.menu-flyout-item.checked.svelte-s7v067 .menu-flyout-item-checkmark{visibility:visible}.menu-flyout-item.svelte-s7v067.svelte-s7v067:active{background-color:var(--fds-subtle-fill-tertiary)}.menu-flyout-item.svelte-s7v067.svelte-s7v067:active:before{transform:scaleY(.625)}.menu-flyout-item.disabled.svelte-s7v067.svelte-s7v067{background-color:var(--fds-subtle-fill-transparent);color:var(--fds-text-disabled);pointer-events:none}.menu-flyout-item.disabled.selected.svelte-s7v067.svelte-s7v067{background-color:var(--fds-subtle-fill-secondary)}.menu-flyout-item.disabled.selected.svelte-s7v067.svelte-s7v067:before{background-color:var(--fds-accent-disabled)}.menu-flyout-item.disabled.svelte-s7v067>.menu-flyout-item-hint{color:var(--fds-text-disabled)}.menu-flyout-item.selected.svelte-s7v067.svelte-s7v067:before{block-size:16px;opacity:1}.menu-flyout-item.indented.svelte-s7v067.svelte-s7v067{-webkit-padding-start:40px;padding-inline-start:40px}.menu-flyout-item-bullet.svelte-s7v067.svelte-s7v067,.menu-flyout-item-checkmark.svelte-s7v067.svelte-s7v067{visibility:hidden}.menu-flyout-item.svelte-s7v067 .menu-flyout-item-arrow.svelte-s7v067{-webkit-margin-end:0;-webkit-margin-start:auto;-webkit-padding-start:24px;block-size:12px;box-sizing:content-box;inline-size:12px;margin-inline-end:0;margin-inline-start:auto;padding-inline-start:24px}.menu-flyout-item-checkmark.svelte-s7v067.svelte-s7v067{-webkit-margin-start:2px;-webkit-margin-end:14px;align-items:center;block-size:12px;display:flex;inline-size:12px;justify-content:center;margin-inline-end:14px;margin-inline-start:2px}.menu-flyout-item-bullet.svelte-s7v067.svelte-s7v067{-webkit-margin-start:6px;-webkit-margin-end:18px;background-color:currentColor;block-size:4px;border-radius:4px;inline-size:4px;margin-inline-end:18px;margin-inline-start:6px}.menu-flyout-item-input-label.svelte-s7v067.svelte-s7v067{display:contents}.menu-flyout-item.svelte-s7v067>svg{fill:currentColor;-webkit-margin-end:12px;block-size:auto;inline-size:16px;margin-inline-end:12px}.menu-flyout-item.svelte-s7v067>.menu-flyout-item-hint{color:var(--fds-text-secondary);flex:1 1 auto;overflow:hidden;padding-left:24px;text-align:end;text-overflow:ellipsis}.menu-flyout-submenu-anchor.svelte-s7v067.svelte-s7v067{--fds-menu-flyout-transition-offset:-50%;inset-block-start:0;inset-inline-start:100%;position:absolute;z-index:10000}',
      map: null
    };
    MenuFlyoutItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, [
        "variant",
        "cascading",
        "hint",
        "selected",
        "checked",
        "indented",
        "group",
        "value",
        "disabled",
        "open",
        "__depth",
        "class",
        "element",
        "inputElement",
        "inputLabelElement",
        "subMenuAnchorElement",
        "subMenuElement"
      ]);
      let $$slots = compute_slots(slots);
      let { variant = "standard" } = $$props;
      let { cascading = false } = $$props;
      let { hint = void 0 } = $$props;
      let { selected = false } = $$props;
      let { checked = false } = $$props;
      let { indented = false } = $$props;
      let { group = [] } = $$props;
      let { value = void 0 } = $$props;
      let { disabled = false } = $$props;
      let { open = false } = $$props;
      let { __depth = false } = $$props;
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      let { inputElement = null } = $$props;
      let { inputLabelElement = null } = $$props;
      let { subMenuAnchorElement = null } = $$props;
      let { subMenuElement = null } = $$props;
      createEventForwarder(get_current_component());
      const dispatch = createEventDispatcher();
      getContext("closeFlyout");
      const menuId = uid("fds-menu-flyout-submenu-");
      let menu = null;
      if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
        $$bindings.variant(variant);
      if ($$props.cascading === void 0 && $$bindings.cascading && cascading !== void 0)
        $$bindings.cascading(cascading);
      if ($$props.hint === void 0 && $$bindings.hint && hint !== void 0)
        $$bindings.hint(hint);
      if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
        $$bindings.selected(selected);
      if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
        $$bindings.checked(checked);
      if ($$props.indented === void 0 && $$bindings.indented && indented !== void 0)
        $$bindings.indented(indented);
      if ($$props.group === void 0 && $$bindings.group && group !== void 0)
        $$bindings.group(group);
      if ($$props.value === void 0 && $$bindings.value && value !== void 0)
        $$bindings.value(value);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.open === void 0 && $$bindings.open && open !== void 0)
        $$bindings.open(open);
      if ($$props.__depth === void 0 && $$bindings.__depth && __depth !== void 0)
        $$bindings.__depth(__depth);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      if ($$props.inputElement === void 0 && $$bindings.inputElement && inputElement !== void 0)
        $$bindings.inputElement(inputElement);
      if ($$props.inputLabelElement === void 0 && $$bindings.inputLabelElement && inputLabelElement !== void 0)
        $$bindings.inputLabelElement(inputLabelElement);
      if ($$props.subMenuAnchorElement === void 0 && $$bindings.subMenuAnchorElement && subMenuAnchorElement !== void 0)
        $$bindings.subMenuAnchorElement(subMenuAnchorElement);
      if ($$props.subMenuElement === void 0 && $$bindings.subMenuElement && subMenuElement !== void 0)
        $$bindings.subMenuElement(subMenuElement);
      $$result.css.add(css$15);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        {
          dispatch(open ? "open" : "close");
        }
        {
          if (open && menu && tabbable(subMenuElement).length > 0)
            tabbable(subMenuElement)[0].focus();
        }
        $$rendered = `${variant === "standard" || __depth ? `<li${spread([
          {
            tabindex: escape_attribute_value(disabled ? -1 : 0)
          },
          { role: "menuitem" },
          {
            "aria-expanded": escape_attribute_value($$slots.flyout && !disabled && open)
          },
          {
            "aria-haspopup": escape_attribute_value($$slots.flyout && !disabled && open)
          },
          {
            "aria-controls": escape_attribute_value($$slots.flyout && !disabled && menuId)
          },
          {
            "aria-selected": escape_attribute_value(selected || checked)
          },
          {
            class: "menu-flyout-item type-" + escape(variant) + " " + escape(className)
          },
          escape_object($$restProps)
        ], {
          classes: (cascading ? "cascading" : "") + " " + (selected ? "selected" : "") + " " + (checked ? "checked" : "") + " " + (disabled ? "disabled" : "") + " " + (indented ? "indented" : "") + " svelte-s7v067"
        })}${add_attribute("this", element, 0)}>${slots.icon ? slots.icon({}) : ``}
		${slots.default ? slots.default({}) : ``}
		${hint ? `${validate_component(TextBlock, "TextBlock").$$render($$result, {
          class: "menu-flyout-item-hint",
          variant: "caption"
        }, {}, {
          default: () => {
            return `${escape(hint)}`;
          }
        })}` : ``}
		${cascading ? `<svg class="${"menu-flyout-item-arrow svelte-s7v067"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"12"}" height="${"12"}" viewBox="${"0 0 12 12"}" fill="${"none"}"><path d="${"M4.64645 2.14645C4.45118 2.34171 4.45118 2.65829 4.64645 2.85355L7.79289 6L4.64645 9.14645C4.45118 9.34171 4.45118 9.65829 4.64645 9.85355C4.84171 10.0488 5.15829 10.0488 5.35355 9.85355L8.85355 6.35355C9.04882 6.15829 9.04882 5.84171 8.85355 5.64645L5.35355 2.14645C5.15829 1.95118 4.84171 1.95118 4.64645 2.14645Z"}" fill="${"currentColor"}"></path></svg>
			${open && $$slots.flyout && !disabled ? `<div${add_attribute("id", menuId, 0)} class="${"menu-flyout-submenu-anchor svelte-s7v067"}"${add_attribute("this", subMenuAnchorElement, 0)}>${validate_component(MenuFlyoutSurface, "MenuFlyoutSurface").$$render($$result, { element: subMenuElement, this: menu }, {
          element: ($$value) => {
            subMenuElement = $$value;
            $$settled = false;
          },
          this: ($$value) => {
            menu = $$value;
            $$settled = false;
          }
        }, {
          default: () => {
            return `${slots.flyout ? slots.flyout({}) : ``}`;
          }
        })}</div>` : ``}` : ``}</li>` : `${variant === "radio" || variant === "toggle" ? `
	<label class="${"menu-flyout-item-input-label svelte-s7v067"}"${add_attribute("this", inputLabelElement, 0)}>${validate_component(MenuFlyoutItem, "svelte:self").$$render($$result, {
          checked: checked || group === value,
          selected,
          variant,
          indented,
          group,
          disabled,
          __depth: true
        }, {}, {
          icon: () => {
            return `${slots.icon ? slots.icon({ slot: "icon" }) : ``}`;
          },
          default: () => {
            return `<div class="${"menu-flyout-item-" + escape(variant === "radio" ? "bullet" : "checkmark") + " svelte-s7v067"}">${variant === "toggle" ? `<svg width="${"12"}" height="${"12"}" viewBox="${"0 0 12 12"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M9.85355 3.14645C10.0488 3.34171 10.0488 3.65829 9.85355 3.85355L5.35355 8.35355C5.15829 8.54882 4.84171 8.54882 4.64645 8.35355L2.64645 6.35355C2.45118 6.15829 2.45118 5.84171 2.64645 5.64645C2.84171 5.45118 3.15829 5.45118 3.35355 5.64645L5 7.29289L9.14645 3.14645C9.34171 2.95118 9.65829 2.95118 9.85355 3.14645Z"}" fill="${"currentColor"}"></path></svg>` : ``}</div>
			${slots.default ? slots.default({}) : ``}`;
          }
        })}

		${variant === "radio" ? `<input type="${"radio"}" hidden${add_attribute("value", value, 0)} ${checked ? "checked" : ""} ${disabled ? "disabled" : ""}${value === group ? add_attribute("checked", true, 1) : ""}${add_attribute("this", inputElement, 0)}>` : `<input type="${"checkbox"}" hidden ${disabled ? "disabled" : ""}${add_attribute("this", inputElement, 0)}${add_attribute("checked", checked, 1)}${add_attribute("value", value, 0)}>`}</label>` : ``}`}`;
      } while (!$$settled);
      return $$rendered;
    });
    Share = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.75 4h3.46a.75.75 0 01.1 1.5H6.75c-1.2 0-2.17.92-2.25 2.1v9.65c0 1.19.92 2.17 2.1 2.24l.15.01h9.5c1.19 0 2.16-.93 2.24-2.1v-.65a.75.75 0 011.5-.1v.6c0 2-1.56 3.64-3.54 3.74l-.2.01h-9.5c-2 0-3.64-1.57-3.75-3.55v-9.7c0-2 1.57-3.64 3.55-3.75h3.66-3.46zm7.75 2.52V3.75c0-.62.7-.96 1.19-.61l.08.07 6 5.75c.27.27.3.7.07 1l-.08.08-5.99 5.75a.75.75 0 01-1.26-.43v-2.83l-.35.03c-2.4.25-4.7 1.33-6.92 3.26a.75.75 0 01-1.23-.66c.66-5.32 3.44-8.25 8.2-8.62l.3-.02V3.75v2.77zM16 5.5v1.74c0 .41-.34.75-.75.75-3.87 0-6.27 1.68-7.31 5.16l-.08.28.35-.24a12.68 12.68 0 017.04-2.2c.38 0 .7.28.74.65l.01.1v1.74l4.16-3.99-4.16-4z"/></svg>';
    ArrowLeft = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.73 19.8a.75.75 0 001.04-1.1l-6.25-5.95h14.73a.75.75 0 000-1.5H5.52l6.25-5.95a.75.75 0 00-1.04-1.1l-7.42 7.08a1 1 0 000 1.44l7.42 7.07z"/></svg>';
    css17 = {
      code: ".blog-post.svelte-1i6jy0o.svelte-1i6jy0o{display:flex;justify-content:center;padding:48px}.blog-post.svelte-1i6jy0o article.svelte-1i6jy0o{max-inline-size:768px}.blog-post.svelte-1i6jy0o .markdown-body.svelte-1i6jy0o{font-size:1.6rem;line-height:2.6rem}.back-button{color:var(--fds-text-tertiary)}.post-title.svelte-1i6jy0o.svelte-1i6jy0o{-webkit-margin-start:-48px;align-items:center;display:flex;gap:12px;margin-inline-start:-48px}.post-title.svelte-1i6jy0o h1.svelte-1i6jy0o{font-size:3.6rem;font-weight:600;margin:0}@media screen and (max-width:1023px){.post-title.svelte-1i6jy0o.svelte-1i6jy0o{align-items:flex-start;flex-direction:column;margin:0}}.post-info.svelte-1i6jy0o.svelte-1i6jy0o{-webkit-margin-after:24px;-webkit-border-after:1px solid var(--fds-divider-stroke-default);align-items:center;background-color:var(--fds-solid-background-secondary);border-block-end:1px solid var(--fds-divider-stroke-default);color:var(--fds-text-tertiary);display:flex;gap:12px;margin-block-end:24px;padding:18px 0}.post-info.svelte-1i6jy0o img.svelte-1i6jy0o{block-size:32px;border:1px solid var(--fds-card-stroke-default);border-radius:50%;inline-size:32px}.post-info.svelte-1i6jy0o .menu-flyout{min-inline-size:120px}.post-info.svelte-1i6jy0o .menu-flyout-container{-webkit-margin-start:auto;margin-inline-start:auto}.post-thumbnail.svelte-1i6jy0o.svelte-1i6jy0o{-webkit-margin-after:48px;border:1px solid var(--fds-card-stroke-default);border-radius:var(--fds-overlay-corner-radius);margin-block-end:48px;max-inline-size:100%}",
      map: null
    };
    load3 = async ({ url, fetch: fetch3 }) => ({
      props: {
        post: await fetch3(`${url.pathname}.json`).then((response) => response.json())
      }
    });
    _layout2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { post } = $$props;
      const { title, thumbnail, author, date } = post.metadata;
      if ($$props.post === void 0 && $$bindings.post && post !== void 0)
        $$bindings.post(post);
      $$result.css.add(css17);
      return `${$$result.head += `${validate_component(Metadata, "Metadata").$$render($$result, { title, image: thumbnail }, {}, {})}`, ""}

<section class="${"blog-post svelte-1i6jy0o"}"><article class="${"svelte-1i6jy0o"}"><div class="${"post-title svelte-1i6jy0o"}"><div style="display: contents; --icon-color:${"var(--text-color-secondary)"};">${validate_component(IconButton, "IconButton").$$render($$result, {
        "aria-label": "Back to Blog",
        class: "back-button",
        href: "/blog",
        title: "Back to Blog"
      }, {}, {
        default: () => {
          return `<!-- HTML_TAG_START -->${ArrowLeft}<!-- HTML_TAG_END -->`;
        }
      })}</div>
			<h1 class="${"svelte-1i6jy0o"}">${escape(title)}</h1></div>
		<div class="${"post-info svelte-1i6jy0o"}"><img alt="${escape(author) + " avatar"}" src="${"https://github.com/" + escape(author) + ".png"}" class="${"svelte-1i6jy0o"}">
			<a${spread([
        { class: "hyperlink" },
        {
          href: "https://github.com/" + escape(author)
        },
        escape_object(externalLink)
      ], { classes: "svelte-1i6jy0o" })}>@${escape(author)}</a>
			<span>\u2022</span>
			${escape(new Date(date.replace(/-/g, "/").replace(/T.+/, "")).toLocaleDateString("en-US", {
        year: "numeric",
        day: "numeric",
        month: "short"
      }))}
			${validate_component(MenuFlyoutWrapper, "MenuFlyout").$$render($$result, { placement: "bottom" }, {}, {
        flyout: () => {
          return `${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, {}, {}, {
            default: () => {
              return `Copy URL
					`;
            }
          })}
				`;
        },
        default: () => {
          return `${validate_component(IconButton, "IconButton").$$render($$result, {
            size: 20,
            "aria-label": "Share",
            class: "share-button",
            title: "Share"
          }, {}, {
            default: () => {
              return `<!-- HTML_TAG_START -->${Share}<!-- HTML_TAG_END -->`;
            }
          })}`;
        }
      })}</div>
		${thumbnail ? `<img class="${"post-thumbnail svelte-1i6jy0o"}"${add_attribute("src", thumbnail, 0)} alt="${"Thumbnail"}">` : ``}
		<div class="${"markdown-body svelte-1i6jy0o"}">${slots.default ? slots.default({}) : ``}</div></article>
</section>`;
    });
  }
});

// .svelte-kit/output/server/nodes/5.js
var __exports6 = {};
__export(__exports6, {
  css: () => css18,
  entry: () => entry6,
  js: () => js6,
  module: () => layout_svelte_exports2
});
var entry6, js6, css18;
var init__6 = __esm({
  ".svelte-kit/output/server/nodes/5.js"() {
    init_layout_svelte2();
    entry6 = "pages/blog/posts/__layout.svelte-dfb7c157.js";
    js6 = ["pages/blog/posts/__layout.svelte-dfb7c157.js", "chunks/vendor-ec6aa394.js", "chunks/BlogCard.svelte_svelte_type_style_lang-3569a11f.js", "chunks/Metadata-25f018aa.js", "chunks/utils-9a9bd3c9.js"];
    css18 = ["assets/pages/blog/posts/__layout.svelte-e881c1aa.css", "assets/vendor-20988698.css", "assets/BlogCard.svelte_svelte_type_style_lang-32dcf37c.css"];
  }
});

// .svelte-kit/output/server/entries/pages/blog/posts/solstice-pre.md.js
var solstice_pre_md_exports = {};
__export(solstice_pre_md_exports, {
  default: () => Solstice_pre,
  metadata: () => metadata
});
var metadata, Solstice_pre;
var init_solstice_pre_md = __esm({
  ".svelte-kit/output/server/entries/pages/blog/posts/solstice-pre.md.js"() {
    init_index_9a0d4ca8();
    metadata = {
      "title": "Solstice - the video platform",
      "description": "A stylish fluent work-in-progress video platform.",
      "thumbnail": "/screenshots/solstice.png",
      "date": "2022-5-10",
      "author": "DeveloperWOW64"
    };
    Solstice_pre = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<p>A project I\u2019ve been working on - Solstice. It\u2019s an amazing video platform built in fluent-svelte, based on Codrex. It\u2019s still a work-in-progress, of course, but it will be fantastical at launch.</p>
<p>Of course, it still needs developers: the preview is hosted via Vercel <a href="${"https://watch.codrex.dev"}" rel="${"nofollow"}">here</a>.
As well as this, you can submit PRs and issues <a href="${"https://github.com/Fluxduct/Solstice"}" rel="${"nofollow"}">here</a>.</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/6.js
var __exports7 = {};
__export(__exports7, {
  css: () => css19,
  entry: () => entry7,
  js: () => js7,
  module: () => solstice_pre_md_exports
});
var entry7, js7, css19;
var init__7 = __esm({
  ".svelte-kit/output/server/nodes/6.js"() {
    init_solstice_pre_md();
    entry7 = "pages/blog/posts/solstice-pre.md-325979db.js";
    js7 = ["pages/blog/posts/solstice-pre.md-325979db.js", "chunks/vendor-ec6aa394.js"];
    css19 = ["assets/vendor-20988698.css"];
  }
});

// .svelte-kit/output/server/entries/pages/blog/posts/web-release.md.js
var web_release_md_exports = {};
__export(web_release_md_exports, {
  default: () => Web_release,
  metadata: () => metadata2
});
var metadata2, Web_release;
var init_web_release_md = __esm({
  ".svelte-kit/output/server/entries/pages/blog/posts/web-release.md.js"() {
    init_index_9a0d4ca8();
    metadata2 = {
      "title": "The website is ready!",
      "description": "After a long time of hard work - and a lot of bugs - Codrex is finally public on its own domain!",
      "thumbnail": "/branding/banner.jpg",
      "date": "2022-5-8",
      "author": "DeveloperWOW64"
    };
    Web_release = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<p>After a long time of hard work - and a lot of bugs - Codrex is finally public on its own domain! This means people will be able to publically view this post, (and of course the many more posts to come), the documentation on my personal and open-source projects, and more. As well as this, it\u2019s my birthday today! Two special things happening today, now.</p>
<p>I\u2019d also like to thank the <a href="${"https://files.community/"}" rel="${"nofollow"}">Files Team</a> for inspiration and help on this website. As well as this, I\u2019d like to thank my family for helping me on the design; giving their preference.</p>
<p>The thumbnail of this post includes the Codrex banner logo - Cod is fish, Rex is latin for King. It\u2019s not actually what Codrex was orginally meant to be - but it is cool. </p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/7.js
var __exports8 = {};
__export(__exports8, {
  css: () => css20,
  entry: () => entry8,
  js: () => js8,
  module: () => web_release_md_exports
});
var entry8, js8, css20;
var init__8 = __esm({
  ".svelte-kit/output/server/nodes/7.js"() {
    init_web_release_md();
    entry8 = "pages/blog/posts/web-release.md-252cc370.js";
    js8 = ["pages/blog/posts/web-release.md-252cc370.js", "chunks/vendor-ec6aa394.js"];
    css20 = ["assets/vendor-20988698.css"];
  }
});

// .svelte-kit/output/server/entries/pages/docs/__layout.svelte.js
var layout_svelte_exports3 = {};
__export(layout_svelte_exports3, {
  default: () => _layout3,
  load: () => load4
});
function findPages(docsStructure) {
  if (Array.isArray(docsStructure)) {
    return docsStructure.map((page2) => findPages(page2)).flat(Infinity);
  } else {
    if (docsStructure.type === "category") {
      return docsStructure.pages.map((page2) => findPages(page2)).flat(Infinity);
    } else {
      return [docsStructure];
    }
  }
}
var css$24, TextBox, css$16, TextBoxButton, css21, load4, _layout3;
var init_layout_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/docs/__layout.svelte.js"() {
    init_index_9a0d4ca8();
    init_docs_898f1134();
    init_BlogCard_svelte_svelte_type_style_lang_5e5f1546();
    init_internal_82ab3b7f();
    init_Metadata_6271aef0();
    init_TextBlock_8742300e();
    css$24 = {
      code: '.text-box.svelte-8anify.svelte-8anify{background-color:transparent;border:none;border-radius:var(--fds-control-corner-radius);box-sizing:border-box;color:var(--fds-text-primary);cursor:unset;flex:1 1 auto;font-family:var(--fds-font-family-text);font-size:var(--fds-body-font-size);font-weight:400;inline-size:100%;line-height:20px;margin:0;min-block-size:30px;outline:none;padding-inline:10px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.text-box.svelte-8anify.svelte-8anify::-moz-placeholder{color:var(--fds-text-secondary);-moz-user-select:none;user-select:none}.text-box.svelte-8anify.svelte-8anify:-ms-input-placeholder{color:var(--fds-text-secondary);-ms-user-select:none;user-select:none}.text-box.svelte-8anify.svelte-8anify::placeholder{color:var(--fds-text-secondary);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.text-box.svelte-8anify.svelte-8anify::-webkit-search-cancel-button,.text-box.svelte-8anify.svelte-8anify::-webkit-search-decoration,.text-box.svelte-8anify.svelte-8anify::-webkit-search-results-button,.text-box.svelte-8anify.svelte-8anify::-webkit-search-results-decoration{-webkit-appearance:none}.text-box.svelte-8anify.svelte-8anify::-ms-reveal{display:none}.text-box.svelte-8anify.svelte-8anify:disabled{color:var(--fds-text-disabled)}.text-box.svelte-8anify.svelte-8anify:disabled::-moz-placeholder{color:var(--fds-text-disabled)}.text-box.svelte-8anify.svelte-8anify:disabled:-ms-input-placeholder{color:var(--fds-text-disabled)}.text-box.svelte-8anify.svelte-8anify:disabled::placeholder{color:var(--fds-text-disabled)}.text-box-container.svelte-8anify.svelte-8anify{align-items:center;background-clip:padding-box;background-color:var(--fds-control-fill-default);border:1px solid var(--fds-control-stroke-default);border-radius:var(--fds-control-corner-radius);cursor:text;display:flex;inline-size:100%;position:relative}.text-box-container.svelte-8anify.svelte-8anify:hover{background-color:var(--fds-control-fill-secondary)}.text-box-container.disabled.svelte-8anify.svelte-8anify{background-color:var(--fds-control-fill-disabled);cursor:default}.text-box-container.disabled.svelte-8anify .text-box-underline.svelte-8anify{display:none}.text-box-container.svelte-8anify.svelte-8anify:focus-within{background-color:var(--fds-control-fill-input-active)}.text-box-container.svelte-8anify:focus-within .text-box.svelte-8anify::-moz-placeholder{color:var(--fds-text-tertiary)}.text-box-container.svelte-8anify:focus-within .text-box.svelte-8anify:-ms-input-placeholder{color:var(--fds-text-tertiary)}.text-box-container.svelte-8anify:focus-within .text-box.svelte-8anify::placeholder{color:var(--fds-text-tertiary)}.text-box-container.svelte-8anify:focus-within .text-box-underline.svelte-8anify:after{border-bottom:2px solid var(--fds-accent-default)}.text-box-container.svelte-8anify:focus-within .text-box-clear-button{display:flex}.text-box-underline.svelte-8anify.svelte-8anify{block-size:calc(100% + 2px);border-radius:var(--fds-control-corner-radius);inline-size:calc(100% + 2px);inset-block-start:-1px;inset-inline-start:-1px;overflow:hidden;pointer-events:none;position:absolute}.text-box-underline.svelte-8anify.svelte-8anify:after{block-size:100%;border-bottom:1px solid var(--fds-control-strong-stroke-default);box-sizing:border-box;content:"";inline-size:100%;inset-block-end:0;inset-inline-start:0;position:absolute}.text-box-buttons.svelte-8anify.svelte-8anify{align-items:center;cursor:default;display:flex;flex:0 0 auto}.text-box-buttons.svelte-8anify>.text-box-button{-webkit-margin-start:6px;margin-inline-start:6px}.text-box-buttons.svelte-8anify>.text-box-button:first-of-type{-webkit-margin-start:0;margin-inline-start:0}.text-box-buttons.svelte-8anify>.text-box-button:last-of-type{-webkit-margin-end:4px;margin-inline-end:4px}.text-box-buttons.svelte-8anify .text-box-clear-button{display:none}',
      map: null
    };
    TextBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, [
        "value",
        "type",
        "placeholder",
        "clearButton",
        "searchButton",
        "revealButton",
        "readonly",
        "disabled",
        "class",
        "inputElement",
        "containerElement",
        "buttonsContainerElement",
        "clearButtonElement",
        "searchButtonElement",
        "revealButtonElement"
      ]);
      let { value = "" } = $$props;
      let { type = "text" } = $$props;
      let { placeholder = void 0 } = $$props;
      let { clearButton = true } = $$props;
      let { searchButton = true } = $$props;
      let { revealButton = true } = $$props;
      let { readonly = false } = $$props;
      let { disabled = false } = $$props;
      let { class: className = "" } = $$props;
      let { inputElement = null } = $$props;
      let { containerElement = null } = $$props;
      let { buttonsContainerElement = null } = $$props;
      let { clearButtonElement = null } = $$props;
      let { searchButtonElement = null } = $$props;
      let { revealButtonElement = null } = $$props;
      createEventDispatcher();
      createEventForwarder(get_current_component(), ["clear", "search", "reveal", "outermousedown"]);
      const inputProps = __spreadValues({
        class: "text-box",
        disabled: disabled || void 0,
        readonly: readonly || void 0,
        placeholder: placeholder || void 0
      }, $$restProps);
      if ($$props.value === void 0 && $$bindings.value && value !== void 0)
        $$bindings.value(value);
      if ($$props.type === void 0 && $$bindings.type && type !== void 0)
        $$bindings.type(type);
      if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
        $$bindings.placeholder(placeholder);
      if ($$props.clearButton === void 0 && $$bindings.clearButton && clearButton !== void 0)
        $$bindings.clearButton(clearButton);
      if ($$props.searchButton === void 0 && $$bindings.searchButton && searchButton !== void 0)
        $$bindings.searchButton(searchButton);
      if ($$props.revealButton === void 0 && $$bindings.revealButton && revealButton !== void 0)
        $$bindings.revealButton(revealButton);
      if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0)
        $$bindings.readonly(readonly);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.inputElement === void 0 && $$bindings.inputElement && inputElement !== void 0)
        $$bindings.inputElement(inputElement);
      if ($$props.containerElement === void 0 && $$bindings.containerElement && containerElement !== void 0)
        $$bindings.containerElement(containerElement);
      if ($$props.buttonsContainerElement === void 0 && $$bindings.buttonsContainerElement && buttonsContainerElement !== void 0)
        $$bindings.buttonsContainerElement(buttonsContainerElement);
      if ($$props.clearButtonElement === void 0 && $$bindings.clearButtonElement && clearButtonElement !== void 0)
        $$bindings.clearButtonElement(clearButtonElement);
      if ($$props.searchButtonElement === void 0 && $$bindings.searchButtonElement && searchButtonElement !== void 0)
        $$bindings.searchButtonElement(searchButtonElement);
      if ($$props.revealButtonElement === void 0 && $$bindings.revealButtonElement && revealButtonElement !== void 0)
        $$bindings.revealButtonElement(revealButtonElement);
      $$result.css.add(css$24);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `<div class="${[
          "text-box-container " + escape(className) + " svelte-8anify",
          disabled ? "disabled" : ""
        ].join(" ").trim()}"${add_attribute("this", containerElement, 0)}>
	
	${type === "text" ? `<input${spread([{ type: "text" }, escape_object(inputProps)], { classes: "svelte-8anify" })}${add_attribute("value", value, 0)}${add_attribute("this", inputElement, 0)}>` : `${type === "number" ? `<input${spread([{ type: "number" }, escape_object(inputProps)], { classes: "svelte-8anify" })}${add_attribute("value", value, 0)}${add_attribute("this", inputElement, 0)}>` : `${type === "search" ? `<input${spread([{ type: "search" }, escape_object(inputProps)], { classes: "svelte-8anify" })}${add_attribute("value", value, 0)}${add_attribute("this", inputElement, 0)}>` : `${type === "password" ? `<input${spread([{ type: "password" }, escape_object(inputProps)], { classes: "svelte-8anify" })}${add_attribute("value", value, 0)}${add_attribute("this", inputElement, 0)}>` : `${type === "email" ? `<input${spread([{ type: "email" }, escape_object(inputProps)], { classes: "svelte-8anify" })}${add_attribute("value", value, 0)}${add_attribute("this", inputElement, 0)}>` : `${type === "tel" ? `<input${spread([{ type: "tel" }, escape_object(inputProps)], { classes: "svelte-8anify" })}${add_attribute("value", value, 0)}${add_attribute("this", inputElement, 0)}>` : `${type === "url" ? `<input${spread([{ type: "url" }, escape_object(inputProps)], { classes: "svelte-8anify" })}${add_attribute("value", value, 0)}${add_attribute("this", inputElement, 0)}>` : `${type === "date" ? `<input${spread([{ type: "date" }, escape_object(inputProps)], { classes: "svelte-8anify" })}${add_attribute("value", value, 0)}${add_attribute("this", inputElement, 0)}>` : `${type === "datetime-local" ? `<input${spread([{ type: "datetime-local" }, escape_object(inputProps)], { classes: "svelte-8anify" })}${add_attribute("value", value, 0)}${add_attribute("this", inputElement, 0)}>` : `${type === "month" ? `<input${spread([{ type: "month" }, escape_object(inputProps)], { classes: "svelte-8anify" })}${add_attribute("value", value, 0)}${add_attribute("this", inputElement, 0)}>` : `${type === "time" ? `<input${spread([{ type: "time" }, escape_object(inputProps)], { classes: "svelte-8anify" })}${add_attribute("value", value, 0)}${add_attribute("this", inputElement, 0)}>` : `${type === "week" ? `<input${spread([{ type: "week" }, escape_object(inputProps)], { classes: "svelte-8anify" })}${add_attribute("value", value, 0)}${add_attribute("this", inputElement, 0)}>` : ``}`}`}`}`}`}`}`}`}`}`}`}
	<div class="${"text-box-underline svelte-8anify"}"></div>
	<div class="${"text-box-buttons svelte-8anify"}"${add_attribute("this", buttonsContainerElement, 0)}>${!disabled ? `${clearButton && value && !readonly ? `${validate_component(TextBoxButton, "TextBoxButton").$$render($$result, {
          class: "text-box-clear-button",
          "aria-label": "Clear value",
          element: clearButtonElement
        }, {
          element: ($$value) => {
            clearButtonElement = $$value;
            $$settled = false;
          }
        }, {
          default: () => {
            return `<svg aria-hidden="${"true"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"12"}" height="${"12"}" viewBox="${"0 0 12 12"}"><path fill="${"currentColor"}" d="${"M2.08859 2.21569L2.14645 2.14645C2.32001 1.97288 2.58944 1.9536 2.78431 2.08859L2.85355 2.14645L6 5.293L9.14645 2.14645C9.34171 1.95118 9.65829 1.95118 9.85355 2.14645C10.0488 2.34171 10.0488 2.65829 9.85355 2.85355L6.707 6L9.85355 9.14645C10.0271 9.32001 10.0464 9.58944 9.91141 9.78431L9.85355 9.85355C9.67999 10.0271 9.41056 10.0464 9.21569 9.91141L9.14645 9.85355L6 6.707L2.85355 9.85355C2.65829 10.0488 2.34171 10.0488 2.14645 9.85355C1.95118 9.65829 1.95118 9.34171 2.14645 9.14645L5.293 6L2.14645 2.85355C1.97288 2.67999 1.9536 2.41056 2.08859 2.21569L2.14645 2.14645L2.08859 2.21569Z"}"></path></svg>`;
          }
        })}` : ``}
            ${type === "search" && searchButton ? `${validate_component(TextBoxButton, "TextBoxButton").$$render($$result, {
          "aria-label": "Search",
          element: searchButtonElement
        }, {
          element: ($$value) => {
            searchButtonElement = $$value;
            $$settled = false;
          }
        }, {
          default: () => {
            return `<svg aria-hidden="${"true"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"12"}" height="${"12"}" viewBox="${"0 0 12 12"}"><path d="${"M5.00038 1C2.79103 1 1 2.7909 1 5.00008C1 7.20927 2.79103 9.00017 5.00038 9.00017C5.92463 9.00017 6.77568 8.68675 7.45302 8.1604L10.1464 10.8536C10.3416 11.0488 10.6583 11.0488 10.8535 10.8536C11.0488 10.6583 11.0488 10.3417 10.8535 10.1464L8.16028 7.45337C8.68705 6.77595 9.00075 5.92465 9.00075 5.00008C9.00075 2.7909 7.20972 1 5.00038 1ZM2.00009 5.00008C2.00009 3.34319 3.34337 2.00002 5.00038 2.00002C6.65739 2.00002 8.00066 3.34319 8.00066 5.00008C8.00066 6.65697 6.65739 8.00015 5.00038 8.00015C3.34337 8.00015 2.00009 6.65697 2.00009 5.00008Z"}" fill="${"currentColor"}"></path></svg>`;
          }
        })}` : ``}
            ${type === "password" && value && revealButton ? `${validate_component(TextBoxButton, "TextBoxButton").$$render($$result, {
          "aria-label": "Reveal password",
          element: revealButtonElement
        }, {
          element: ($$value) => {
            revealButtonElement = $$value;
            $$settled = false;
          }
        }, {
          default: () => {
            return `<svg aria-hidden="${"true"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"10"}" height="${"10"}" viewBox="${"0 171 1024 683"}"><path d="${"M0,554.5C0,550.833 0.5,547.167 1.5,543.5C11.5,505.833 25.75,470.417 44.25,437.25C62.75,404.083 84.5833,373.667 109.75,346C134.917,318.333 162.75,293.667 193.25,272C223.75,250.333 256.25,231.917 290.75,216.75C325.25,201.583 361.167,190.083 398.5,182.25C435.833,174.417 473.667,170.5 512,170.5C550,170.5 587.583,174.417 624.75,182.25C661.917,190.083 697.75,201.5 732.25,216.5C766.75,231.5 799.417,249.917 830.25,271.75C861.083,293.583 889.083,318.25 914.25,345.75C939.417,373.25 961.25,403.5 979.75,436.5C998.25,469.5 1012.5,504.833 1022.5,542.5C1023.5,546.167 1024,550 1024,554C1024,566 1019.92,576.083 1011.75,584.25C1003.58,592.417 993.5,596.5 981.5,596.5C971.5,596.5 962.917,593.667 955.75,588C948.583,582.333 943.333,574.833 940,565.5C937,556.167 934.083,547.5 931.25,539.5C928.417,531.5 925.5,523.583 922.5,515.75C919.5,507.917 916.167,500.167 912.5,492.5C908.833,484.833 904.333,476.667 899,468C879.333,435 855.583,405.417 827.75,379.25C799.917,353.083 769.333,330.917 736,312.75C702.667,294.583 667.417,280.583 630.25,270.75C593.083,260.917 555.5,256 517.5,256L506.5,256C468.5,256 430.917,260.917 393.75,270.75C356.583,280.583 321.333,294.667 288,313C254.667,331.333 224,353.583 196,379.75C168,405.917 144.333,435.5 125,468.5C119.667,477.167 115.167,485.417 111.5,493.25C107.833,501.083 104.5,508.833 101.5,516.5C98.5,524.167 95.5833,532 92.75,540C89.9167,548 87,556.667 84,566C80.6667,575.333 75.5,582.917 68.5,588.75C61.5,594.583 52.8333,597.5 42.5,597.5C36.8333,597.5 31.4167,596.333 26.25,594C21.0833,591.667 16.5833,588.583 12.75,584.75C8.91667,580.917 5.83333,576.417 3.5,571.25C1.16667,566.083 0,560.5 0,554.5ZM256,597.5L256,592.5C256,557.833 262.917,525.25 276.75,494.75C290.583,464.25 309.25,437.667 332.75,415C356.25,392.333 383.417,374.417 414.25,361.25C445.083,348.083 477.667,341.5 512,341.5C547.333,341.5 580.583,348.167 611.75,361.5C642.917,374.833 670.083,393.083 693.25,416.25C716.417,439.417 734.667,466.583 748,497.75C761.333,528.917 768,562.167 768,597.5C768,632.833 761.333,666.083 748,697.25C734.667,728.417 716.417,755.583 693.25,778.75C670.083,801.917 642.917,820.167 611.75,833.5C580.583,846.833 547.333,853.5 512,853.5C476.667,853.5 443.417,846.833 412.25,833.5C381.083,820.167 353.917,801.917 330.75,778.75C307.583,755.583 289.333,728.417 276,697.25C262.667,666.083 256,632.833 256,597.5ZM682.5,597.5L682.5,594C682.5,571 677.917,549.333 668.75,529C659.583,508.667 647.167,490.917 631.5,475.75C615.833,460.583 597.667,448.583 577,439.75C556.333,430.917 534.667,426.5 512,426.5C488.333,426.5 466.167,431 445.5,440C424.833,449 406.833,461.25 391.5,476.75C376.167,492.25 364,510.417 355,531.25C346,552.083 341.5,574.167 341.5,597.5C341.5,621.167 346,643.333 355,664C364,684.667 376.167,702.667 391.5,718C406.833,733.333 424.833,745.5 445.5,754.5C466.167,763.5 488.333,768 512,768C535.333,768 557.417,763.5 578.25,754.5C599.083,745.5 617.167,733.333 632.5,718C647.833,702.667 660,684.667 669,664C678,643.333 682.5,621.167 682.5,597.5Z"}" fill="${"currentColor"}"></path></svg>`;
          }
        })}` : ``}` : ``}
		${slots.buttons ? slots.buttons({}) : ``}</div>
	${slots.default ? slots.default({}) : ``}
</div>`;
      } while (!$$settled);
      return $$rendered;
    });
    css$16 = {
      code: ".text-box-button.svelte-159a5xt{align-items:center;background-color:var(--fds-subtle-fill-transparent);border:none;border-radius:var(--fds-control-corner-radius);box-sizing:border-box;color:var(--fds-text-secondary);display:flex;justify-content:center;min-block-size:22px;min-inline-size:26px;outline:none;padding:3px 5px}.text-box-button.svelte-159a5xt:focus-visible{box-shadow:var(--fds-focus-stroke)}.text-box-button.svelte-159a5xt:hover{background-color:var(--fds-subtle-fill-secondary)}.text-box-button.svelte-159a5xt:active{background-color:var(--fds-subtle-fill-tertiary);color:var(--fds-text-tertiary)}.text-box-button.svelte-159a5xt:disabled{background-color:var(--fds-subtle-fill-tertiary);color:var(--fds-text-disabled)}.text-box-button.svelte-159a5xt svg{fill:currentColor;min-block-size:12px;min-inline-size:12px;pointer-events:none}",
      map: null
    };
    TextBoxButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["type", "class", "element"]);
      let { type = "button" } = $$props;
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      createEventForwarder(get_current_component());
      if ($$props.type === void 0 && $$bindings.type && type !== void 0)
        $$bindings.type(type);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      $$result.css.add(css$16);
      return `<button${spread([
        {
          class: "text-box-button " + escape(className)
        },
        { type: escape_attribute_value(type) },
        escape_object($$restProps)
      ], { classes: "svelte-159a5xt" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}
</button>`;
    });
    css21 = {
      code: ".docs.svelte-10e5sa4.svelte-10e5sa4{background-color:var(--fds-solid-background-base);display:flex;flex:1 1 auto;max-block-size:calc(100vh - 58px);overflow:hidden}@media screen and (max-width:647px){.docs.svelte-10e5sa4.svelte-10e5sa4{block-size:calc(100vh - 64px)}}.page.svelte-10e5sa4.svelte-10e5sa4{-webkit-border-before:1px solid var(--fds-card-stroke-default);-webkit-border-start:1px solid var(--fds-card-stroke-default);background-clip:padding-box;background-color:var(--fds-layer-background-default);border-block-start:1px solid var(--fds-card-stroke-default);border-inline-start:1px solid var(--fds-card-stroke-default);border-top-left-radius:var(--fds-overlay-corner-radius);display:flex;flex:1 1 auto;flex-direction:column}.page-inner.svelte-10e5sa4.svelte-10e5sa4{flex:1 1 auto;padding:44px 56px}.page.svelte-10e5sa4 header.svelte-10e5sa4{-webkit-margin-after:-20px;align-items:center;color:var(--fds-text-tertiary);display:flex;justify-content:space-between;margin-block-end:-20px;white-space:nowrap}.page.svelte-10e5sa4 header span.svelte-10e5sa4{overflow:hidden;text-overflow:ellipsis}.page.svelte-10e5sa4 .header-right.svelte-10e5sa4{align-items:center;display:flex}.sidebar.svelte-10e5sa4.svelte-10e5sa4{display:flex;flex:0 0 auto;flex-direction:column;inline-size:316px;padding:0 4px}.search.svelte-10e5sa4.svelte-10e5sa4{background-color:var(--fds-solid-background-base);inset-block-start:0;margin:4px 12px 12px;position:-webkit-sticky;position:sticky;z-index:1}.search.svelte-10e5sa4 hr.svelte-10e5sa4{-webkit-border-before:1px solid var(--fds-divider-stroke-default);border:none;border-block-start:1px solid var(--fds-divider-stroke-default);margin:12px 0 0}.search-mobile.svelte-10e5sa4.svelte-10e5sa4{-webkit-border-after:1px solid var(--fds-divider-stroke-default);border-block-end:1px solid var(--fds-divider-stroke-default);display:none;padding:12px}.autosuggest-wrapper.svelte-10e5sa4.svelte-10e5sa4{position:relative}.autosuggest-flyout.svelte-10e5sa4.svelte-10e5sa4{background-color:var(--fds-solid-background-quarternary);border:1px solid var(--fds-surface-stroke-flyout);border-radius:0 0 var(--fds-overlay-corner-radius) var(--fds-overlay-corner-radius);box-shadow:var(--fds-flyout-shadow);inline-size:100%;inset-block-start:100%;inset-inline-start:0;max-block-size:350px;padding:2px 0;position:absolute;z-index:10}@media screen and (max-width:647px){.docs.svelte-10e5sa4.svelte-10e5sa4{-webkit-margin-before:2px;-webkit-border-before:1px solid var(--fds-card-stroke-default);border-block-start:1px solid var(--fds-card-stroke-default);flex-direction:column;margin-block-start:2px;max-block-size:calc(100vh - 66px)}.sidebar.svelte-10e5sa4.svelte-10e5sa4{display:none}.page.svelte-10e5sa4.svelte-10e5sa4{border:none;border-radius:0}.page-inner.svelte-10e5sa4.svelte-10e5sa4{padding:16px 24px 24px}.search-mobile.svelte-10e5sa4.svelte-10e5sa4{display:block}}",
      map: null
    };
    load4 = ({ url }) => {
      const docsPages = findPages(docs);
      return {
        props: {
          pagePath: url.pathname,
          currentPage: docsPages.find((p) => `/docs${p.path}` === url.pathname),
          docsPages
        }
      };
    };
    _layout3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let pageTitle;
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value2) => $page = value2);
      let { pagePath = "" } = $$props;
      let { docsPages } = $$props;
      let { currentPage = { name: "Overview", path: "" } } = $$props;
      let value = "";
      let searchQuery = "";
      let autoSuggestVisible = false;
      if ($$props.pagePath === void 0 && $$bindings.pagePath && pagePath !== void 0)
        $$bindings.pagePath(pagePath);
      if ($$props.docsPages === void 0 && $$bindings.docsPages && docsPages !== void 0)
        $$bindings.docsPages(docsPages);
      if ($$props.currentPage === void 0 && $$bindings.currentPage && currentPage !== void 0)
        $$bindings.currentPage(currentPage);
      $$result.css.add(css21);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        pageTitle = currentPage.name;
        docsPages.filter((page2) => page2.name.toLowerCase().replace(/ /gi, "").includes(searchQuery.toLowerCase().replace(/ /gi, "")));
        $$rendered = `${$$result.head += `${validate_component(Metadata, "Metadata").$$render($$result, {
          title: pageTitle ? `${pageTitle}` : "Docs",
          image: "docs"
        }, {}, {})}`, ""}

<section class="${"docs svelte-10e5sa4"}"><aside class="${"sidebar svelte-10e5sa4"}"><div class="${"search svelte-10e5sa4"}"><div class="${"autosuggest-wrapper svelte-10e5sa4"}">${validate_component(TextBox, "TextBox").$$render($$result, {
          flyoutVisible: autoSuggestVisible,
          placeholder: "Search Documentation",
          type: "search",
          value
        }, {
          value: ($$value) => {
            value = $$value;
            $$settled = false;
          }
        }, {})}
				${``}</div>
			
			<hr role="${"separator"}" class="${"svelte-10e5sa4"}"></div>
		${validate_component(TreeView, "TreeView").$$render($$result, { tree: docs }, {}, {})}</aside>
	<article class="${"page scroller svelte-10e5sa4"}"><div class="${"search-mobile svelte-10e5sa4"}"><div class="${"autosuggest-wrapper svelte-10e5sa4"}">${validate_component(TextBox, "TextBox").$$render($$result, {
          flyoutVisible: autoSuggestVisible,
          placeholder: "Search Documentation",
          type: "search",
          value
        }, {
          value: ($$value) => {
            value = $$value;
            $$settled = false;
          }
        }, {})}
				${``}</div></div>
		<div class="${"page-inner markdown-body svelte-10e5sa4"}"><header class="${"svelte-10e5sa4"}"><span class="${"svelte-10e5sa4"}">${escape($page.url.pathname.split("/").join(" / ").substring(2))}
						${escape($page.url.pathname === "/docs" ? " / overview" : "")}</span>
					<div class="${"header-right svelte-10e5sa4"}"></div></header>
				${slots.default ? slots.default({}) : ``}</div></article>
</section>`;
      } while (!$$settled);
      $$unsubscribe_page();
      return $$rendered;
    });
  }
});

// .svelte-kit/output/server/nodes/8.js
var __exports9 = {};
__export(__exports9, {
  css: () => css22,
  entry: () => entry9,
  js: () => js9,
  module: () => layout_svelte_exports3
});
var entry9, js9, css22;
var init__9 = __esm({
  ".svelte-kit/output/server/nodes/8.js"() {
    init_layout_svelte3();
    entry9 = "pages/docs/__layout.svelte-5432accc.js";
    js9 = ["pages/docs/__layout.svelte-5432accc.js", "chunks/vendor-ec6aa394.js", "chunks/docs-82f518cd.js", "chunks/BlogCard.svelte_svelte_type_style_lang-3569a11f.js", "chunks/singletons-a6a7384f.js", "chunks/Metadata-25f018aa.js"];
    css22 = ["assets/pages/docs/__layout.svelte-d6ee57d6.css", "assets/vendor-20988698.css", "assets/BlogCard.svelte_svelte_type_style_lang-32dcf37c.css"];
  }
});

// .svelte-kit/output/server/entries/pages/docs/index.md.js
var index_md_exports = {};
__export(index_md_exports, {
  default: () => Docs
});
var Docs;
var init_index_md = __esm({
  ".svelte-kit/output/server/entries/pages/docs/index.md.js"() {
    init_index_9a0d4ca8();
    Docs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<h1 id="${"-overview"}">\u{1F440} Overview</h1>
<h3 id="${"what-is-this"}">What is this?</h3>
<p>This is the documentation for me, my personal projects and my open-source projects.</p>
<h6 id="${"\uFE0F-access-documentation-from-the-sidebar"}">\u2B05\uFE0F Access documentation from the sidebar</h6>`;
    });
  }
});

// .svelte-kit/output/server/nodes/9.js
var __exports10 = {};
__export(__exports10, {
  css: () => css23,
  entry: () => entry10,
  js: () => js10,
  module: () => index_md_exports
});
var entry10, js10, css23;
var init__10 = __esm({
  ".svelte-kit/output/server/nodes/9.js"() {
    init_index_md();
    entry10 = "pages/docs/index.md-d0423c31.js";
    js10 = ["pages/docs/index.md-d0423c31.js", "chunks/vendor-ec6aa394.js"];
    css23 = ["assets/vendor-20988698.css"];
  }
});

// .svelte-kit/output/server/entries/pages/docs/fluxduct/index.md.js
var index_md_exports2 = {};
__export(index_md_exports2, {
  default: () => Fluxduct
});
var Fluxduct;
var init_index_md2 = __esm({
  ".svelte-kit/output/server/entries/pages/docs/fluxduct/index.md.js"() {
    init_index_9a0d4ca8();
    Fluxduct = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<h1 id="${"-welcome-to-fluxduct"}">\u{1F44B} Welcome to Fluxduct!</h1>
<h3 id="${"what-is-flux"}">What is Flux?</h3>
<p>Flux is the name of an \u2018fkcd\u2019 programming language. Flux aims to bring coding to all ages, as well as making it easier for those already coding.</p>
<h3 id="${"what-is-fkcd"}">What is \u2018fkcd\u2019?</h3>
<p>\u2018Fkcd\u2019 or, \u2018fakeCommand\u2019 is basically the way Fluxduct works. Fluxduct interprets its own code, translates it into Python and then executes it. Because it is based on Python, those who have already been coding for quite some time can gradually change to Flux, as Python code still works.</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/10.js
var __exports11 = {};
__export(__exports11, {
  css: () => css24,
  entry: () => entry11,
  js: () => js11,
  module: () => index_md_exports2
});
var entry11, js11, css24;
var init__11 = __esm({
  ".svelte-kit/output/server/nodes/10.js"() {
    init_index_md2();
    entry11 = "pages/docs/fluxduct/index.md-5706e2be.js";
    js11 = ["pages/docs/fluxduct/index.md-5706e2be.js", "chunks/vendor-ec6aa394.js"];
    css24 = ["assets/vendor-20988698.css"];
  }
});

// .svelte-kit/output/server/entries/pages/docs/fluxduct/syntax/index.md.js
var index_md_exports3 = {};
__export(index_md_exports3, {
  default: () => Syntax
});
var Syntax;
var init_index_md3 = __esm({
  ".svelte-kit/output/server/entries/pages/docs/fluxduct/syntax/index.md.js"() {
    init_index_9a0d4ca8();
    Syntax = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<h1 id="${"-syntax"}">\u{1F4BE} Syntax</h1>
<h3 id="${"what-is-this-repository"}">What is this repository?</h3>
<p>This repository contains the syntax for Project Fluxduct; the Flux programming language. All of the syntax is entirely defined in <a href="${"https://github.com/Fluxduct/syntax/blob/main/stx.py"}" rel="${"nofollow"}">stx.py</a>. This repo also contains files used by the Flux Capacitor - which at the time of writing is not yet released.</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/11.js
var __exports12 = {};
__export(__exports12, {
  css: () => css25,
  entry: () => entry12,
  js: () => js12,
  module: () => index_md_exports3
});
var entry12, js12, css25;
var init__12 = __esm({
  ".svelte-kit/output/server/nodes/11.js"() {
    init_index_md3();
    entry12 = "pages/docs/fluxduct/syntax/index.md-9f7249eb.js";
    js12 = ["pages/docs/fluxduct/syntax/index.md-9f7249eb.js", "chunks/vendor-ec6aa394.js"];
    css25 = ["assets/vendor-20988698.css"];
  }
});

// .svelte-kit/output/server/entries/pages/docs/fluxduct/style/index.md.js
var index_md_exports4 = {};
__export(index_md_exports4, {
  default: () => Style
});
var Style;
var init_index_md4 = __esm({
  ".svelte-kit/output/server/entries/pages/docs/fluxduct/style/index.md.js"() {
    init_index_9a0d4ca8();
    Style = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<h1 id="${"\uFE0F-rules"}">\u{1F3DB}\uFE0F Rules</h1>
<h3 id="${"what-is-the-purpose-of-this-file"}">What is the purpose of this file?</h3>
<p>To ensure all Fluxduct repositories are created properly.</p>
<p>On Codrex, this file also makes sure the documentation is created properly.</p>
<h4 id="${"--not-in-order-of-importance--"}">- <em>Not in order of importance</em> -</h4>
<h2 id="${"1"}">1:</h2>
<p>All README\u2019s and markdown files must be created with this template and key:</p>
<h6 id="${"template"}">Template:</h6>
<pre class="${"language-undefined"}"><!-- HTML_TAG_START -->${`<code class="language-undefined"># \u{1F4CE} Rules Example

### What is this?

Lorem ipsum dolor sit amet nonummy justo consequat kasd tempor dolores.

### Some more questions?

Lorem ipsum dolor sit amet nulla lorem sed facer sea erat.</code>`}<!-- HTML_TAG_END --></pre>
<h6 id="${"key"}">Key:</h6>
<h1 id="${"headingsnames"}">Headings/Names</h1>
<h2 id="${"rulesimportant"}">Rules/Important</h2>
<h3 id="${"questions"}">Questions</h3>
<h4 id="${"--notesdisclaimer-italicised--"}"><em>- Notes/Disclaimer (Italicised) -</em></h4>
<h5 id="${"steps"}">Steps</h5>
<h6 id="${"guidance"}">Guidance</h6>
<p><code>Code/Templates</code></p>
<p>All Headings must have an emoji.</p>
<h2 id="${"2"}">2:</h2>
<p>All repositories with Flux code in them must have an appropriate <code>.gitattributes</code> file with the Flux code identifier in it.</p>
<h6 id="${"identifier"}">Identifier:</h6>
<p><code>*.flx linguist-language=Flux</code></p>
<h2 id="${"3"}">3:</h2>
<p>Bundle identifiers must follow the correct format.</p>
<table><thead><tr><th>TLD*</th>
<th>.</th>
<th>Company*</th>
<th>.</th>
<th>Application*</th>
<th>Sub-application</th>
<th>Service</th></tr></thead>
<tbody><tr><td>dev</td>
<td>.</td>
<td>fluxduct</td>
<td>.</td>
<td>syntax</td>
<td>-</td>
<td><a href="${"https://github.com/pipeline"}"><strong>@pipeline</strong></a></td></tr>
<tr><td>dev</td>
<td>.</td>
<td>fluxduct</td>
<td>.</td>
<td>capacitor</td>
<td>creator</td>
<td><a href="${"https://github.com/repo"}"><strong>@repo</strong></a></td></tr></tbody></table>
<p><em>-</em> <em>Those marked with</em>  * <em>are required</em> <em>-</em></p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/12.js
var __exports13 = {};
__export(__exports13, {
  css: () => css26,
  entry: () => entry13,
  js: () => js13,
  module: () => index_md_exports4
});
var entry13, js13, css26;
var init__13 = __esm({
  ".svelte-kit/output/server/nodes/12.js"() {
    init_index_md4();
    entry13 = "pages/docs/fluxduct/style/index.md-0780187a.js";
    js13 = ["pages/docs/fluxduct/style/index.md-0780187a.js", "chunks/vendor-ec6aa394.js"];
    css26 = ["assets/vendor-20988698.css"];
  }
});

// .svelte-kit/output/server/entries/pages/docs/personal/index.md.js
var index_md_exports5 = {};
__export(index_md_exports5, {
  default: () => Personal
});
var Personal;
var init_index_md5 = __esm({
  ".svelte-kit/output/server/entries/pages/docs/personal/index.md.js"() {
    init_index_9a0d4ca8();
    Personal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<h2 id="${"hello-pleased-to-meet-you-"}">Hello! Pleased to meet you! \u{1F468}\u200D\u{1F4BB}</h2>
<h4 id="${"im-a-developer-from-the-uk"}">I\u2019m a developer from the UK.</h4>
<ul><li>\u{1F4BB} I like to spend my time coding Python and XAML</li>
<li>\u{1F331} I\u2019m still learning UWP and computer development, so if I get something wrong, please tell me!</li>
<li>\u{1F4BE} Check out a cool project called <a href="${"https://github.com/files-community/"}" rel="${"nofollow"}">Files</a>. It\u2019s a file-explorer app that looks really nice and has some fantastic features!</li>
<li>\u26A1 Fun Fact: I can recite <a href="${"https://www.piday.org/"}" rel="${"nofollow"}">\u03C0</a> to 14 decimal places (off by-heart and for no reason).</li>
<li>\u{1F4EE} Have a question about a project or something else? Feel free to submit an issue, chat in a discusion, or if you want to be more discrete, send me an <a href="${"mailto:devwow64@gmail.com"}">email!</a></li>
<li>\u2642\uFE0F Pronouns: he/him</li></ul>
<h4 id="${"languages--tools"}">Languages &amp; Tools</h4>
<p><a href="${"https://codrex.dev"}" rel="${"nofollow"}"><img src="${"https://skillicons.dev/icons?i=py,svelte,md,dotnet,cs,visualstudio,vscode,arduino,git,github,discord,stackoverflow,raspberrypi,linux,&theme=dark"}" alt="${"My Skills"}"></a></p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/13.js
var __exports14 = {};
__export(__exports14, {
  css: () => css27,
  entry: () => entry14,
  js: () => js14,
  module: () => index_md_exports5
});
var entry14, js14, css27;
var init__14 = __esm({
  ".svelte-kit/output/server/nodes/13.js"() {
    init_index_md5();
    entry14 = "pages/docs/personal/index.md-ff4d1abd.js";
    js14 = ["pages/docs/personal/index.md-ff4d1abd.js", "chunks/vendor-ec6aa394.js"];
    css27 = ["assets/vendor-20988698.css"];
  }
});

// .svelte-kit/output/server/entries/pages/docs/depth/index.md.js
var index_md_exports6 = {};
__export(index_md_exports6, {
  default: () => Depth
});
var Depth;
var init_index_md6 = __esm({
  ".svelte-kit/output/server/entries/pages/docs/depth/index.md.js"() {
    init_index_9a0d4ca8();
    Depth = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<h1 id="${"-the-cdls-protocol"}">\u{1F9F8} The CDLS Protocol</h1>
<h3 id="${"what-is-the-cdls-protocol"}">What is the CDLS Protocol?</h3>
<p>The Cuddles Depth Library System; the CDLS Protocol - my largest project yet. The CDLS Protocol is a library of assets and games for all ages. Some of the standard games include the original \u2018Cuddles\u2019 as well as various titles such as \u2018Turtle\u2019 and more. Developers can also create their own games using the assets and system; still running on the same platform and service. Not <em>yet</em> set to release.</p>
<h3 id="${"when-is-the-release-date"}">When is the release date?</h3>
<p>The CDLS Protocol doesn\u2019t have a release date - <em>yet</em> - but for all I know it could be scrapped.</p>
<h3 id="${"what-does-cdls-mean"}">What does CDLS mean?</h3>
<p>CDLS means Cuddles Depth Library System - \u2018S\u2019 can mean Service in some scenarios.
Each individual word has a meaning and explanation attributed to it.</p>
<p>Cuddles - its originally intended title and inspiration</p>
<p>Depth - its codename</p>
<p>Library - its library of \u2018assets\u2019</p>
<p>System/Service - self-explanatory</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/14.js
var __exports15 = {};
__export(__exports15, {
  css: () => css28,
  entry: () => entry15,
  js: () => js15,
  module: () => index_md_exports6
});
var entry15, js15, css28;
var init__15 = __esm({
  ".svelte-kit/output/server/nodes/14.js"() {
    init_index_md6();
    entry15 = "pages/docs/depth/index.md-14aba399.js";
    js15 = ["pages/docs/depth/index.md-14aba399.js", "chunks/vendor-ec6aa394.js"];
    css28 = ["assets/vendor-20988698.css"];
  }
});

// .svelte-kit/output/server/entries/pages/docs/depth/assets/index.md.js
var index_md_exports7 = {};
__export(index_md_exports7, {
  default: () => Assets
});
var Assets;
var init_index_md7 = __esm({
  ".svelte-kit/output/server/entries/pages/docs/depth/assets/index.md.js"() {
    init_index_9a0d4ca8();
    Assets = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<h1 id="${"-asset-storage"}">\u{1F4E6} Asset Storage</h1>
<h3 id="${"how-are-assets-stored"}">How are assets stored?</h3>
<p>Assets are to be accessed and stored as <code>meta.cdl</code> files mentioned below.
These contain metadata about the asset, such as name, gender, favourite colour, and so on.</p>
<h3 id="${"symbolic-links"}">Symbolic Links</h3>
<p>There are two ways of accesing the asset\u2019s cdl file.</p>
<h5 id="${"a-using-the-assets-hash-or-tag"}">a) Using the asset\u2019s hash or tag</h5>
<p>Each asset has a \u2018hash\u2019. This is a SHA1 encryption of their last name, spaced by their first name, <strong>at the start of the game</strong>. These are accesed in <code>%cdls%\\Assets\\%hash%\\cdlpackage\\meta.cdl</code></p>
<h5 id="${"b-using-the-assets-index-link"}">b) Using the asset\u2019s index link</h5>
<p>Each asset can be accesed at <code>%cdls%\\Assets\\index\\%CDLlastName%\\%CDLfirstName%\\.cdlpackage\\meta.cdl</code>.
<code>%CDLfirstName%</code> is a symbolic link to their hash.</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/15.js
var __exports16 = {};
__export(__exports16, {
  css: () => css29,
  entry: () => entry16,
  js: () => js16,
  module: () => index_md_exports7
});
var entry16, js16, css29;
var init__16 = __esm({
  ".svelte-kit/output/server/nodes/15.js"() {
    init_index_md7();
    entry16 = "pages/docs/depth/assets/index.md-2dd743e7.js";
    js16 = ["pages/docs/depth/assets/index.md-2dd743e7.js", "chunks/vendor-ec6aa394.js"];
    css29 = ["assets/vendor-20988698.css"];
  }
});

// .svelte-kit/output/server/entries/endpoints/blog/index.json.ts.js
var index_json_ts_exports = {};
__export(index_json_ts_exports, {
  get: () => get
});
var get;
var init_index_json_ts = __esm({
  ".svelte-kit/output/server/entries/endpoints/blog/index.json.ts.js"() {
    get = async () => {
      const modules = { "./posts/solstice-pre.md": () => Promise.resolve().then(() => (init_solstice_pre_md(), solstice_pre_md_exports)), "./posts/web-release.md": () => Promise.resolve().then(() => (init_web_release_md(), web_release_md_exports)) };
      let body = [];
      for (const path in modules) {
        body.push(modules[path]().then(({ metadata: metadata3 }) => {
          return {
            metadata: metadata3,
            path
          };
        }));
      }
      const posts = await Promise.all(body);
      posts.sort((a, b) => {
        return +new Date(b.metadata.date) - +new Date(a.metadata.date);
      });
      return { body: posts };
    };
  }
});

// .svelte-kit/output/server/entries/endpoints/blog/posts/_slug_.json.ts.js
var slug_json_ts_exports = {};
__export(slug_json_ts_exports, {
  get: () => get2
});
var slugFromPath, get2;
var init_slug_json_ts = __esm({
  ".svelte-kit/output/server/entries/endpoints/blog/posts/_slug_.json.ts.js"() {
    slugFromPath = (path) => {
      var _a4;
      return ((_a4 = path.match(/([\w-]+)\.(md|svx)/i)) == null ? void 0 : _a4[1]) ?? null;
    };
    get2 = async ({ params }) => {
      const modules = { "./solstice-pre.md": () => Promise.resolve().then(() => (init_solstice_pre_md(), solstice_pre_md_exports)), "./web-release.md": () => Promise.resolve().then(() => (init_web_release_md(), web_release_md_exports)) };
      let match;
      for (const [path, resolver] of Object.entries(modules)) {
        if (slugFromPath(path) === params.slug) {
          match = [path, resolver];
          break;
        }
      }
      if (!match)
        return { status: 404 };
      const post = await match[1]();
      return { body: post };
    };
  }
});

// .svelte-kit/vercel-tmp/entry.js
__export(exports, {
  default: () => entry_default
});

// .svelte-kit/vercel-tmp/shims.js
init_install_fetch();
__fetch_polyfill();

// node_modules/.pnpm/@sveltejs+kit@1.0.0-next.260_sass@1.49.7+svelte@3.46.4/node_modules/@sveltejs/kit/dist/node.js
var import_stream = __toModule(require("stream"));
function get_raw_body(req) {
  return new Promise((fulfil, reject) => {
    const h2 = req.headers;
    if (!h2["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length = Number(h2["content-length"]);
    if (isNaN(length) && h2["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data = new Uint8Array(length || 0);
    if (length > 0) {
      let offset = 0;
      req.on("data", (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data, 0);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      fulfil(data);
    });
  });
}
async function getRequest(base2, req) {
  let headers = req.headers;
  if (req.httpVersionMajor === 2) {
    headers = Object.assign({}, headers);
    delete headers[":method"];
    delete headers[":path"];
    delete headers[":authority"];
    delete headers[":scheme"];
  }
  return new Request(base2 + req.url, {
    method: req.method,
    headers,
    body: await get_raw_body(req)
  });
}
async function setResponse(res, response) {
  const headers = Object.fromEntries(response.headers);
  if (response.headers.has("set-cookie")) {
    headers["set-cookie"] = response.headers.raw()["set-cookie"];
  }
  res.writeHead(response.status, headers);
  if (response.body instanceof import_stream.Readable) {
    response.body.pipe(res);
  } else {
    if (response.body) {
      res.write(await response.arrayBuffer());
    }
    res.end();
  }
}

// .svelte-kit/output/server/app.js
init_index_9a0d4ca8();
var __accessCheck2 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet2 = (obj, member, getter) => {
  __accessCheck2(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd2 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet2 = (obj, member, value, setter) => {
  __accessCheck2(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _use_hashes;
var _dev;
var _script_needs_csp;
var _style_needs_csp;
var _directives;
var _script_src;
var _style_src;
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  let { props_3 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  if ($$props.props_3 === void 0 && $$bindings.props_3 && props_3 !== void 0)
    $$bindings.props_3(props_3);
  {
    stores.page.set(page2);
  }
  return `


${components[1] ? `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => {
      return `${components[2] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
        default: () => {
          return `${components[3] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {
            default: () => {
              return `${validate_component(components[3] || missing_component, "svelte:component").$$render($$result, Object.assign(props_3 || {}), {}, {})}`;
            }
          })}` : `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}`}`;
        }
      })}` : `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {})}`}`;
    }
  })}` : `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {})}`}

${``}`;
});
function to_headers(object) {
  const headers = new Headers();
  if (object) {
    for (const key2 in object) {
      const value = object[key2];
      if (!value)
        continue;
      if (typeof value === "string") {
        headers.set(key2, value);
      } else {
        value.forEach((value2) => {
          headers.append(key2, value2);
        });
      }
    }
  }
  return headers;
}
function hash(value) {
  let hash2 = 5381;
  let i2 = value.length;
  if (typeof value === "string") {
    while (i2)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i2);
  } else {
    while (i2)
      hash2 = hash2 * 33 ^ value[--i2];
  }
  return (hash2 >>> 0).toString(36);
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = params[key2].replace(/%23/g, "#").replace(/%3[Bb]/g, ";").replace(/%2[Cc]/g, ",").replace(/%2[Ff]/g, "/").replace(/%3[Ff]/g, "?").replace(/%3[Aa]/g, ":").replace(/%40/g, "@").replace(/%26/g, "&").replace(/%3[Dd]/g, "=").replace(/%2[Bb]/g, "+").replace(/%24/g, "$");
  }
  return params;
}
function is_pojo(body) {
  if (typeof body !== "object")
    return false;
  if (body) {
    if (body instanceof Uint8Array)
      return false;
    if (body._readableState && body._writableState && body._events)
      return false;
    if (typeof ReadableStream !== "undefined" && body instanceof ReadableStream)
      return false;
  }
  return true;
}
function error(body) {
  return new Response(body, {
    status: 500
  });
}
function is_string(s22) {
  return typeof s22 === "string" || s22 instanceof String;
}
var text_types = new Set([
  "application/xml",
  "application/json",
  "application/x-www-form-urlencoded",
  "multipart/form-data"
]);
function is_text(content_type) {
  if (!content_type)
    return true;
  const type = content_type.split(";")[0].toLowerCase();
  return type.startsWith("text/") || type.endsWith("+xml") || text_types.has(type);
}
async function render_endpoint(event, mod) {
  const handler = mod[event.request.method.toLowerCase().replace("delete", "del")];
  if (!handler) {
    return;
  }
  const response = await handler(event);
  const preface = `Invalid response from route ${event.url.pathname}`;
  if (typeof response !== "object") {
    return error(`${preface}: expected an object, got ${typeof response}`);
  }
  if (response.fallthrough) {
    return;
  }
  const { status = 200, body = {} } = response;
  const headers = response.headers instanceof Headers ? response.headers : to_headers(response.headers);
  const type = headers.get("content-type");
  if (!is_text(type) && !(body instanceof Uint8Array || is_string(body))) {
    return error(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if (is_pojo(body) && (!type || type.startsWith("application/json"))) {
    headers.set("content-type", "application/json; charset=utf-8");
    normalized_body = JSON.stringify(body);
  } else {
    normalized_body = body;
  }
  if ((typeof normalized_body === "string" || normalized_body instanceof Uint8Array) && !headers.has("etag")) {
    const cache_control = headers.get("cache-control");
    if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
      headers.set("etag", `"${hash(normalized_body)}"`);
    }
  }
  return new Response(normalized_body, {
    status,
    headers
  });
}
var chars$1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped2 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key2) {
            return walk(thing[key2]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry17) {
    return entry17[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry17, i2) {
    names.set(entry17[0], getName(i2));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i2) {
          return i2 in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key2) {
          return safeKey(key2) + ":" + stringify(thing[key2]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i2) {
            statements_1.push(name + "[" + i2 + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a4) {
            var k = _a4[0], v = _a4[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key2) {
            statements_1.push("" + name + safeProp(key2) + "=" + stringify(thing[key2]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars$1[num % chars$1.length] + name;
    num = ~~(num / chars$1.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped2[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escapeUnsafeChars(JSON.stringify(key2));
}
function safeProp(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? "." + key2 : "[" + escapeUnsafeChars(JSON.stringify(key2)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i2 = 0; i2 < str.length; i2 += 1) {
    var char = str.charAt(i2);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped2) {
      result += escaped2[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i2 + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i2];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop3() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop3) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop3) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop3;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
var escape_json_string_in_html_dict = {
  '"': '\\"',
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape_json_string_in_html(str) {
  return escape2(str, escape_json_string_in_html_dict, (code) => `\\u${code.toString(16).toUpperCase()}`);
}
var escape_html_attr_dict = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function escape_html_attr(str) {
  return '"' + escape2(str, escape_html_attr_dict, (code) => `&#${code};`) + '"';
}
function escape2(str, dict, unicode_encoder) {
  let result = "";
  for (let i2 = 0; i2 < str.length; i2 += 1) {
    const char = str.charAt(i2);
    const code = char.charCodeAt(0);
    if (char in dict) {
      result += dict[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i2 + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i2];
      } else {
        result += unicode_encoder(code);
      }
    } else {
      result += char;
    }
  }
  return result;
}
var s2 = JSON.stringify;
function create_prerendering_url_proxy(url) {
  return new Proxy(url, {
    get: (target, prop, receiver) => {
      if (prop === "search" || prop === "searchParams") {
        throw new Error(`Cannot access url.${prop} on a page with prerendering enabled`);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
var encoder = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array = encode(data);
  for (let i2 = 0; i2 < array.length; i2 += 16) {
    const w = array.subarray(i2, i2 + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i22 = 0; i22 < 64; i22++) {
      if (i22 < 16) {
        tmp = w[i22];
      } else {
        a = w[i22 + 1 & 15];
        b = w[i22 + 14 & 15];
        tmp = w[i22 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i22 & 15] + w[i22 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i22];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x2) {
    return (x2 - Math.floor(x2)) * 4294967296;
  }
  let prime = 2;
  for (let i2 = 0; i2 < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i2 < 8) {
        init[i2] = frac(prime ** (1 / 2));
      }
      key[i2] = frac(prime ** (1 / 3));
      i2++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i2 = 0; i2 < bytes.length; i2 += 4) {
    const a = bytes[i2 + 0];
    const b = bytes[i2 + 1];
    const c = bytes[i2 + 2];
    const d = bytes[i2 + 3];
    bytes[i2 + 0] = d;
    bytes[i2 + 1] = c;
    bytes[i2 + 2] = b;
    bytes[i2 + 3] = a;
  }
}
function encode(str) {
  const encoded = encoder.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i2;
  for (i2 = 2; i2 < l; i2 += 3) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars[(bytes[i2 - 1] & 15) << 2 | bytes[i2] >> 6];
    result += chars[bytes[i2] & 63];
  }
  if (i2 === l + 1) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4];
    result += "==";
  }
  if (i2 === l) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars[(bytes[i2 - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var csp_ready;
var generate_nonce;
var generate_hash;
if (typeof crypto !== "undefined") {
  const array = new Uint8Array(16);
  generate_nonce = () => {
    crypto.getRandomValues(array);
    return base64(array);
  };
  generate_hash = sha256;
} else {
  const name = "crypto";
  csp_ready = import(name).then((crypto2) => {
    generate_nonce = () => {
      return crypto2.randomBytes(16).toString("base64");
    };
    generate_hash = (input) => {
      return crypto2.createHash("sha256").update(input, "utf-8").digest().toString("base64");
    };
  });
}
var quoted = new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var Csp = class {
  constructor({ mode, directives }, { dev, prerender, needs_nonce }) {
    __privateAdd2(this, _use_hashes, void 0);
    __privateAdd2(this, _dev, void 0);
    __privateAdd2(this, _script_needs_csp, void 0);
    __privateAdd2(this, _style_needs_csp, void 0);
    __privateAdd2(this, _directives, void 0);
    __privateAdd2(this, _script_src, void 0);
    __privateAdd2(this, _style_src, void 0);
    __privateSet2(this, _use_hashes, mode === "hash" || mode === "auto" && prerender);
    __privateSet2(this, _directives, dev ? __spreadValues({}, directives) : directives);
    __privateSet2(this, _dev, dev);
    const d = __privateGet2(this, _directives);
    if (dev) {
      const effective_style_src2 = d["style-src"] || d["default-src"];
      if (effective_style_src2 && !effective_style_src2.includes("unsafe-inline")) {
        d["style-src"] = [...effective_style_src2, "unsafe-inline"];
      }
    }
    __privateSet2(this, _script_src, []);
    __privateSet2(this, _style_src, []);
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    __privateSet2(this, _script_needs_csp, !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0);
    __privateSet2(this, _style_needs_csp, !dev && !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0);
    this.script_needs_nonce = __privateGet2(this, _script_needs_csp) && !__privateGet2(this, _use_hashes);
    this.style_needs_nonce = __privateGet2(this, _style_needs_csp) && !__privateGet2(this, _use_hashes);
    if (this.script_needs_nonce || this.style_needs_nonce || needs_nonce) {
      this.nonce = generate_nonce();
    }
  }
  add_script(content) {
    if (__privateGet2(this, _script_needs_csp)) {
      if (__privateGet2(this, _use_hashes)) {
        __privateGet2(this, _script_src).push(`sha256-${generate_hash(content)}`);
      } else if (__privateGet2(this, _script_src).length === 0) {
        __privateGet2(this, _script_src).push(`nonce-${this.nonce}`);
      }
    }
  }
  add_style(content) {
    if (__privateGet2(this, _style_needs_csp)) {
      if (__privateGet2(this, _use_hashes)) {
        __privateGet2(this, _style_src).push(`sha256-${generate_hash(content)}`);
      } else if (__privateGet2(this, _style_src).length === 0) {
        __privateGet2(this, _style_src).push(`nonce-${this.nonce}`);
      }
    }
  }
  get_header(is_meta = false) {
    const header = [];
    const directives = __spreadValues({}, __privateGet2(this, _directives));
    if (__privateGet2(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet2(this, _style_src)
      ];
    }
    if (__privateGet2(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet2(this, _script_src)
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = directives[key2];
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
  get_meta() {
    const content = escape_html_attr(this.get_header(true));
    return `<meta http-equiv="content-security-policy" content=${content}>`;
  }
};
_use_hashes = new WeakMap();
_dev = new WeakMap();
_script_needs_csp = new WeakMap();
_style_needs_csp = new WeakMap();
_directives = new WeakMap();
_script_src = new WeakMap();
_style_src = new WeakMap();
var updated = __spreadProps(__spreadValues({}, readable(false)), {
  check: () => false
});
async function render_response({
  branch,
  options,
  state,
  $session,
  page_config,
  status,
  error: error2,
  url,
  params,
  ssr,
  stuff
}) {
  if (state.prerender) {
    if (options.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options.template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %svelte.nonce%");
    }
  }
  const stylesheets = new Set(options.manifest._.entry.css);
  const modulepreloads = new Set(options.manifest._.entry.js);
  const styles = new Map();
  const serialized_data = [];
  let shadow_props;
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options.get_stack(error2);
  }
  if (ssr) {
    branch.forEach(({ node, props: props2, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url2) => stylesheets.add(url2));
      if (node.js)
        node.js.forEach((url2) => modulepreloads.add(url2));
      if (node.styles)
        Object.entries(node.styles).forEach(([k, v]) => styles.set(k, v));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (props2)
        shadow_props = props2;
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session,
        updated
      },
      page: {
        url: state.prerender ? create_prerendering_url_proxy(url) : url,
        params,
        status,
        error: error2,
        stuff
      },
      components: branch.map(({ node }) => node.module.default)
    };
    const print_error = (property, replacement) => {
      Object.defineProperty(props.page, property, {
        get: () => {
          throw new Error(`$page.${property} has been replaced by $page.url.${replacement}`);
        }
      });
    };
    print_error("origin", "origin");
    print_error("path", "pathname");
    print_error("query", "searchParams");
    for (let i2 = 0; i2 < branch.length; i2 += 1) {
      props[`props_${i2}`] = await branch[i2].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let { head, html: body } = rendered;
  const inlined_style = Array.from(styles.values()).join("\n");
  await csp_ready;
  const csp = new Csp(options.csp, {
    dev: options.dev,
    prerender: !!state.prerender,
    needs_nonce: options.template_contains_nonce
  });
  const target = hash(body);
  const init_app = `
		import { start } from ${s2(options.prefix + options.manifest._.entry.file)};
		start({
			target: document.querySelector('[data-hydrate="${target}"]').parentNode,
			paths: ${s2(options.paths)},
			session: ${try_serialize($session, (error3) => {
    throw new Error(`Failed to serialize session data: ${error3.message}`);
  })},
			route: ${!!page_config.router},
			spa: ${!ssr},
			trailing_slash: ${s2(options.trailing_slash)},
			hydrate: ${ssr && page_config.hydrate ? `{
				status: ${status},
				error: ${serialize_error(error2)},
				nodes: [
					${(branch || []).map(({ node }) => `import(${s2(options.prefix + node.entry)})`).join(",\n						")}
				],
				url: new URL(${s2(url.href)}),
				params: ${devalue(params)}
			}` : "null"}
		});
	`;
  const init_service_worker = `
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('${options.service_worker}');
		}
	`;
  if (options.amp) {
    head += `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>

		<style amp-custom>${inlined_style}
${rendered.css.code}</style>`;
    if (options.service_worker) {
      head += '<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"><\/script>';
      body += `<amp-install-serviceworker src="${options.service_worker}" layout="nodisplay"></amp-install-serviceworker>`;
    }
  } else {
    if (inlined_style) {
      const attributes = [];
      if (options.dev)
        attributes.push(" data-svelte");
      if (csp.style_needs_nonce)
        attributes.push(` nonce="${csp.nonce}"`);
      csp.add_style(inlined_style);
      head += `
	<style${attributes.join("")}>${inlined_style}</style>`;
    }
    head += Array.from(stylesheets).map((dep) => {
      const attributes = [
        'rel="stylesheet"',
        `href="${options.prefix + dep}"`
      ];
      if (csp.style_needs_nonce) {
        attributes.push(`nonce="${csp.nonce}"`);
      }
      if (styles.has(dep)) {
        attributes.push("disabled", 'media="(max-width: 0)"');
      }
      return `
	<link ${attributes.join(" ")}>`;
    }).join("");
    if (page_config.router || page_config.hydrate) {
      head += Array.from(modulepreloads).map((dep) => `
	<link rel="modulepreload" href="${options.prefix + dep}">`).join("");
      const attributes = ['type="module"', `data-hydrate="${target}"`];
      csp.add_script(init_app);
      if (csp.script_needs_nonce) {
        attributes.push(`nonce="${csp.nonce}"`);
      }
      body += `
		<script ${attributes.join(" ")}>${init_app}<\/script>`;
      body += serialized_data.map(({ url: url2, body: body2, json }) => {
        let attributes2 = `type="application/json" data-type="svelte-data" data-url=${escape_html_attr(url2)}`;
        if (body2)
          attributes2 += ` data-body="${hash(body2)}"`;
        return `<script ${attributes2}>${json}<\/script>`;
      }).join("\n	");
      if (shadow_props) {
        body += `<script type="application/json" data-type="svelte-props">${s2(shadow_props)}<\/script>`;
      }
    }
    if (options.service_worker) {
      csp.add_script(init_service_worker);
      head += `
				<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_service_worker}<\/script>`;
    }
  }
  if (state.prerender) {
    const http_equiv = [];
    const csp_headers = csp.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (maxage) {
      http_equiv.push(`<meta http-equiv="cache-control" content="max-age=${maxage}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  }
  const segments = url.pathname.slice(options.paths.base.length).split("/").slice(2);
  const assets2 = options.paths.assets || (segments.length > 0 ? segments.map(() => "..").join("/") : ".");
  const html = options.template({ head, body, assets: assets2, nonce: csp.nonce });
  const headers = new Headers({
    "content-type": "text/html",
    etag: `"${hash(html)}"`
  });
  if (maxage) {
    headers.set("cache-control", `${is_private ? "private" : "public"}, max-age=${maxage}`);
  }
  if (!options.floc) {
    headers.set("permissions-policy", "interest-cohort=()");
  }
  if (!state.prerender) {
    const csp_header = csp.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
  }
  return new Response(html, {
    status,
    headers
  });
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize(__spreadProps(__spreadValues({}, error2), { name, message, stack }));
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return {
        status: status || 500,
        error: new Error()
      };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  if (loaded.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded;
}
var absolute = /^([a-z]+:)?\/?\//;
var scheme = /^[a-z]+:/;
function resolve(base2, path) {
  if (scheme.test(path))
    return path;
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i2 = 0; i2 < pathparts.length; i2 += 1) {
    const part = pathparts[i2];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
function is_root_relative(path) {
  return path[0] === "/" && path[1] !== "/";
}
async function load_node({
  event,
  options,
  state,
  route,
  url,
  params,
  node,
  $session,
  stuff,
  is_error,
  is_leaf,
  status,
  error: error2
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  let set_cookie_headers = [];
  let loaded;
  const shadow = is_leaf ? await load_shadow_data(route, event, !!state.prerender) : {};
  if (shadow.fallthrough)
    return;
  if (shadow.cookies) {
    set_cookie_headers.push(...shadow.cookies);
  }
  if (shadow.error) {
    loaded = {
      status: shadow.status,
      error: shadow.error
    };
  } else if (shadow.redirect) {
    loaded = {
      status: shadow.status,
      redirect: shadow.redirect
    };
  } else if (module2.load) {
    const load_input = {
      url: state.prerender ? create_prerendering_url_proxy(url) : url,
      params,
      props: shadow.body || {},
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let requested;
        if (typeof resource === "string") {
          requested = resource;
        } else {
          requested = resource.url;
          opts = __spreadValues({
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity
          }, opts);
        }
        opts.headers = new Headers(opts.headers);
        for (const [key2, value] of event.request.headers) {
          if (key2 !== "authorization" && key2 !== "cookie" && key2 !== "host" && key2 !== "if-none-match" && !opts.headers.has(key2)) {
            opts.headers.set(key2, value);
          }
        }
        opts.headers.set("referer", event.url.href);
        const resolved = resolve(event.url.pathname, requested.split("?")[0]);
        let response;
        let dependency;
        const prefix = options.paths.assets || options.paths.base;
        const filename = decodeURIComponent(resolved.startsWith(prefix) ? resolved.slice(prefix.length) : resolved).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = options.manifest.assets.has(filename);
        const is_asset_html = options.manifest.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (options.read) {
            const type = is_asset ? options.manifest._.mime[filename.slice(filename.lastIndexOf("."))] : "text/html";
            response = new Response(options.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          } else {
            response = await fetch(`${url.origin}/${file}`, opts);
          }
        } else if (is_root_relative(resolved)) {
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            const cookie = event.request.headers.get("cookie");
            const authorization = event.request.headers.get("authorization");
            if (cookie) {
              opts.headers.set("cookie", cookie);
            }
            if (authorization && !opts.headers.has("authorization")) {
              opts.headers.set("authorization", authorization);
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          response = await respond(new Request(new URL(requested, event.url).href, opts), options, {
            fetched: requested,
            initiator: route
          });
          if (state.prerender) {
            dependency = { response, body: null };
            state.prerender.dependencies.set(resolved, dependency);
          }
        } else {
          if (resolved.startsWith("//")) {
            throw new Error(`Cannot request protocol-relative URL (${requested}) in server-side fetch`);
          }
          if (`.${new URL(requested).hostname}`.endsWith(`.${event.url.hostname}`) && opts.credentials !== "omit") {
            uses_credentials = true;
            const cookie = event.request.headers.get("cookie");
            if (cookie)
              opts.headers.set("cookie", cookie);
          }
          const external_request = new Request(requested, opts);
          response = await options.hooks.externalFetch.call(null, external_request);
        }
        const proxy = new Proxy(response, {
          get(response2, key2, _receiver) {
            async function text() {
              const body = await response2.text();
              const headers = {};
              for (const [key3, value] of response2.headers) {
                if (key3 === "set-cookie") {
                  set_cookie_headers = set_cookie_headers.concat(value);
                } else if (key3 !== "etag") {
                  headers[key3] = value;
                }
              }
              if (!opts.body || typeof opts.body === "string") {
                fetched.push({
                  url: requested,
                  body: opts.body,
                  json: `{"status":${response2.status},"statusText":${s2(response2.statusText)},"headers":${s2(headers)},"body":"${escape_json_string_in_html(body)}"}`
                });
              }
              if (dependency) {
                dependency.body = body;
              }
              return body;
            }
            if (key2 === "arrayBuffer") {
              return async () => {
                const buffer = await response2.arrayBuffer();
                if (dependency) {
                  dependency.body = new Uint8Array(buffer);
                }
                return buffer;
              };
            }
            if (key2 === "text") {
              return text;
            }
            if (key2 === "json") {
              return async () => {
                return JSON.parse(await text());
              };
            }
            return Reflect.get(response2, key2, response2);
          }
        });
        return proxy;
      },
      stuff: __spreadValues({}, stuff)
    };
    if (options.dev) {
      Object.defineProperty(load_input, "page", {
        get: () => {
          throw new Error("`page` in `load` functions has been replaced by `url` and `params`");
        }
      });
    }
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded = await module2.load.call(null, load_input);
    if (!loaded) {
      throw new Error(`load function must return a value${options.dev ? ` (${node.entry})` : ""}`);
    }
  } else if (shadow.body) {
    loaded = {
      props: shadow.body
    };
  } else {
    loaded = {};
  }
  if (loaded.fallthrough && !is_error) {
    return;
  }
  if (shadow.body && state.prerender) {
    const pathname = `${event.url.pathname}/__data.json`;
    const dependency = {
      response: new Response(void 0),
      body: JSON.stringify(shadow.body)
    };
    state.prerender.dependencies.set(pathname, dependency);
  }
  return {
    node,
    props: shadow.body,
    loaded: normalize(loaded),
    stuff: loaded.stuff || stuff,
    fetched,
    set_cookie_headers,
    uses_credentials
  };
}
async function load_shadow_data(route, event, prerender) {
  if (!route.shadow)
    return {};
  try {
    const mod = await route.shadow();
    if (prerender && (mod.post || mod.put || mod.del || mod.patch)) {
      throw new Error("Cannot prerender pages that have shadow endpoints with mutative methods");
    }
    const method = event.request.method.toLowerCase().replace("delete", "del");
    const handler = mod[method];
    if (!handler) {
      return {
        status: 405,
        error: new Error(`${method} method not allowed`)
      };
    }
    const data = {
      status: 200,
      cookies: [],
      body: {}
    };
    if (method !== "get") {
      const result = await handler(event);
      if (result.fallthrough)
        return result;
      const { status = 200, headers = {}, body = {} } = result;
      validate_shadow_output(headers, body);
      if (headers["set-cookie"]) {
        data.cookies.push(...headers["set-cookie"]);
      }
      if (status >= 300 && status < 400) {
        return {
          status,
          redirect: headers instanceof Headers ? headers.get("location") : headers.location
        };
      }
      data.status = status;
      data.body = body;
    }
    if (mod.get) {
      const result = await mod.get.call(null, event);
      if (result.fallthrough)
        return result;
      const { status = 200, headers = {}, body = {} } = result;
      validate_shadow_output(headers, body);
      if (headers["set-cookie"]) {
        data.cookies.push(...headers["set-cookie"]);
      }
      if (status >= 400) {
        return {
          status,
          error: new Error("Failed to load data")
        };
      }
      if (status >= 300) {
        return {
          status,
          redirect: headers instanceof Headers ? headers.get("location") : headers.location
        };
      }
      data.body = __spreadValues(__spreadValues({}, body), data.body);
    }
    return data;
  } catch (e2) {
    return {
      status: 500,
      error: coalesce_to_error(e2)
    };
  }
}
function validate_shadow_output(headers, body) {
  if (headers instanceof Headers && headers.has("set-cookie")) {
    throw new Error("Shadow endpoint request handler cannot use Headers interface with Set-Cookie headers");
  }
  if (!is_pojo(body)) {
    throw new Error("Body returned from shadow endpoint request handler must be a plain object");
  }
}
async function respond_with_error({ event, options, state, $session, status, error: error2, ssr }) {
  try {
    const default_layout = await options.manifest._.nodes[0]();
    const default_error = await options.manifest._.nodes[1]();
    const params = {};
    const layout_loaded = await load_node({
      event,
      options,
      state,
      route: null,
      url: event.url,
      params,
      node: default_layout,
      $session,
      stuff: {},
      is_error: false,
      is_leaf: false
    });
    const error_loaded = await load_node({
      event,
      options,
      state,
      route: null,
      url: event.url,
      params,
      node: default_error,
      $session,
      stuff: layout_loaded ? layout_loaded.stuff : {},
      is_error: true,
      is_leaf: false,
      status,
      error: error2
    });
    return await render_response({
      options,
      state,
      $session,
      page_config: {
        hydrate: options.hydrate,
        router: options.router
      },
      stuff: error_loaded.stuff,
      status,
      error: error2,
      branch: [layout_loaded, error_loaded],
      url: event.url,
      params,
      ssr
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return new Response(error3.stack, {
      status: 500
    });
  }
}
async function respond$1(opts) {
  const { event, options, state, $session, route, ssr } = opts;
  let nodes;
  if (!ssr) {
    return await render_response(__spreadProps(__spreadValues({}, opts), {
      branch: [],
      page_config: {
        hydrate: true,
        router: true
      },
      status: 200,
      url: event.url,
      stuff: {}
    }));
  }
  try {
    nodes = await Promise.all(route.a.map((n) => options.manifest._.nodes[n] && options.manifest._.nodes[n]()));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return await respond_with_error({
      event,
      options,
      state,
      $session,
      status: 500,
      error: error3,
      ssr
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options);
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return new Response(void 0, {
      status: 204
    });
  }
  let branch = [];
  let status = 200;
  let error2;
  let set_cookie_headers = [];
  let stuff = {};
  ssr:
    if (ssr) {
      for (let i2 = 0; i2 < nodes.length; i2 += 1) {
        const node = nodes[i2];
        let loaded;
        if (node) {
          try {
            loaded = await load_node(__spreadProps(__spreadValues({}, opts), {
              url: event.url,
              node,
              stuff,
              is_error: false,
              is_leaf: i2 === nodes.length - 1
            }));
            if (!loaded)
              return;
            set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
            if (loaded.loaded.redirect) {
              return with_cookies(new Response(void 0, {
                status: loaded.loaded.status,
                headers: {
                  location: loaded.loaded.redirect
                }
              }), set_cookie_headers);
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            }
          } catch (err) {
            const e2 = coalesce_to_error(err);
            options.handle_error(e2, event);
            status = 500;
            error2 = e2;
          }
          if (loaded && !error2) {
            branch.push(loaded);
          }
          if (error2) {
            while (i2--) {
              if (route.b[i2]) {
                const error_node = await options.manifest._.nodes[route.b[i2]]();
                let node_loaded;
                let j = i2;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  const error_loaded = await load_node(__spreadProps(__spreadValues({}, opts), {
                    url: event.url,
                    node: error_node,
                    stuff: node_loaded.stuff,
                    is_error: true,
                    is_leaf: false,
                    status,
                    error: error2
                  }));
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  page_config = get_page_config(error_node.module, options);
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  stuff = __spreadValues(__spreadValues({}, node_loaded.stuff), error_loaded.stuff);
                  break ssr;
                } catch (err) {
                  const e2 = coalesce_to_error(err);
                  options.handle_error(e2, event);
                  continue;
                }
              }
            }
            return with_cookies(await respond_with_error({
              event,
              options,
              state,
              $session,
              status,
              error: error2,
              ssr
            }), set_cookie_headers);
          }
        }
        if (loaded && loaded.loaded.stuff) {
          stuff = __spreadValues(__spreadValues({}, stuff), loaded.loaded.stuff);
        }
      }
    }
  try {
    return with_cookies(await render_response(__spreadProps(__spreadValues({}, opts), {
      stuff,
      url: event.url,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    })), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return with_cookies(await respond_with_error(__spreadProps(__spreadValues({}, opts), {
      status: 500,
      error: error3
    })), set_cookie_headers);
  }
}
function get_page_config(leaf, options) {
  if ("ssr" in leaf) {
    throw new Error("`export const ssr` has been removed \u2014 use the handle hook instead: https://kit.svelte.dev/docs#hooks-handle");
  }
  return {
    router: "router" in leaf ? !!leaf.router : options.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    set_cookie_headers.forEach((value) => {
      response.headers.append("set-cookie", value);
    });
  }
  return response;
}
async function render_page(event, route, options, state, ssr) {
  if (state.initiator === route) {
    return new Response(`Not found: ${event.url.pathname}`, {
      status: 404
    });
  }
  if (route.shadow) {
    const type = negotiate(event.request.headers.get("accept") || "text/html", [
      "text/html",
      "application/json"
    ]);
    if (type === "application/json") {
      return render_endpoint(event, await route.shadow());
    }
  }
  const $session = await options.hooks.getSession(event);
  const response = await respond$1({
    event,
    options,
    state,
    $session,
    route,
    params: event.params,
    ssr
  });
  if (response) {
    return response;
  }
  if (state.fetched) {
    return new Response(`Bad request in load function: failed to fetch ${state.fetched}`, {
      status: 500
    });
  }
}
function negotiate(accept, types2) {
  const parts = accept.split(",").map((str, i2) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      return { type, subtype, q: +q, i: i2 };
    }
    throw new Error(`Invalid Accept header: ${accept}`);
  }).sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types2) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex((part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*"));
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
var DATA_SUFFIX = "/__data.json";
async function respond(request, options, state = {}) {
  var _a4;
  const url = new URL(request.url);
  if (url.pathname !== "/" && options.trailing_slash !== "ignore") {
    const has_trailing_slash = url.pathname.endsWith("/");
    if (has_trailing_slash && options.trailing_slash === "never" || !has_trailing_slash && options.trailing_slash === "always" && !(url.pathname.split("/").pop() || "").includes(".")) {
      url.pathname = has_trailing_slash ? url.pathname.slice(0, -1) : url.pathname + "/";
      if (url.search === "?")
        url.search = "";
      return new Response(void 0, {
        status: 301,
        headers: {
          location: url.pathname + url.search
        }
      });
    }
  }
  const { parameter, allowed } = options.method_override;
  const method_override = (_a4 = url.searchParams.get(parameter)) == null ? void 0 : _a4.toUpperCase();
  if (method_override) {
    if (request.method === "POST") {
      if (allowed.includes(method_override)) {
        request = new Proxy(request, {
          get: (target, property, _receiver) => {
            if (property === "method")
              return method_override;
            return Reflect.get(target, property, target);
          }
        });
      } else {
        const verb = allowed.length === 0 ? "enabled" : "allowed";
        const body = `${parameter}=${method_override} is not ${verb}. See https://kit.svelte.dev/docs#configuration-methodoverride`;
        return new Response(body, {
          status: 400
        });
      }
    } else {
      throw new Error(`${parameter}=${method_override} is only allowed with POST requests`);
    }
  }
  const event = {
    request,
    url,
    params: {},
    locals: {},
    platform: state.platform
  };
  const removed = (property, replacement, suffix = "") => ({
    get: () => {
      throw new Error(`event.${property} has been replaced by event.${replacement}` + suffix);
    }
  });
  const details = ". See https://github.com/sveltejs/kit/pull/3384 for details";
  const body_getter = {
    get: () => {
      throw new Error("To access the request body use the text/json/arrayBuffer/formData methods, e.g. `body = await request.json()`" + details);
    }
  };
  Object.defineProperties(event, {
    method: removed("method", "request.method", details),
    headers: removed("headers", "request.headers", details),
    origin: removed("origin", "url.origin"),
    path: removed("path", "url.pathname"),
    query: removed("query", "url.searchParams"),
    body: body_getter,
    rawBody: body_getter
  });
  let ssr = true;
  try {
    const response = await options.hooks.handle({
      event,
      resolve: async (event2, opts) => {
        if (opts && "ssr" in opts)
          ssr = opts.ssr;
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            url: event2.url,
            params: event2.params,
            options,
            state,
            $session: await options.hooks.getSession(event2),
            page_config: { router: true, hydrate: true },
            stuff: {},
            status: 200,
            branch: [],
            ssr: false
          });
        }
        let decoded = decodeURI(event2.url.pathname);
        if (options.paths.base) {
          if (!decoded.startsWith(options.paths.base)) {
            return new Response(void 0, { status: 404 });
          }
          decoded = decoded.slice(options.paths.base.length) || "/";
        }
        const is_data_request = decoded.endsWith(DATA_SUFFIX);
        if (is_data_request)
          decoded = decoded.slice(0, -DATA_SUFFIX.length) || "/";
        for (const route of options.manifest._.routes) {
          const match = route.pattern.exec(decoded);
          if (!match)
            continue;
          event2.params = route.params ? decode_params(route.params(match)) : {};
          let response2;
          if (is_data_request && route.type === "page" && route.shadow) {
            response2 = await render_endpoint(event2, await route.shadow());
            if (response2 && response2.status >= 300 && response2.status < 400 && request.headers.get("x-sveltekit-noredirect") === "true") {
              const location = response2.headers.get("location");
              if (location) {
                response2 = new Response(void 0, {
                  status: 204,
                  headers: {
                    "x-sveltekit-location": location
                  }
                });
              }
            }
          } else {
            response2 = route.type === "endpoint" ? await render_endpoint(event2, await route.load()) : await render_page(event2, route, options, state, ssr);
          }
          if (response2) {
            if (response2.status === 200 && response2.headers.has("etag")) {
              let if_none_match_value = request.headers.get("if-none-match");
              if (if_none_match_value == null ? void 0 : if_none_match_value.startsWith('W/"')) {
                if_none_match_value = if_none_match_value.substring(2);
              }
              const etag = response2.headers.get("etag");
              if (if_none_match_value === etag) {
                const headers = new Headers({ etag });
                for (const key2 of [
                  "cache-control",
                  "content-location",
                  "date",
                  "expires",
                  "vary"
                ]) {
                  const value = response2.headers.get(key2);
                  if (value)
                    headers.set(key2, value);
                }
                return new Response(void 0, {
                  status: 304,
                  headers
                });
              }
            }
            return response2;
          }
        }
        if (!state.initiator) {
          const $session = await options.hooks.getSession(event2);
          return await respond_with_error({
            event: event2,
            options,
            state,
            $session,
            status: 404,
            error: new Error(`Not found: ${event2.url.pathname}`),
            ssr
          });
        }
        return await fetch(request);
      },
      get request() {
        throw new Error("request in handle has been replaced with event" + details);
      }
    });
    if (response && !(response instanceof Response)) {
      throw new Error("handle must return a Response object" + details);
    }
    return response;
  } catch (e2) {
    const error2 = coalesce_to_error(e2);
    options.handle_error(error2, event);
    try {
      const $session = await options.hooks.getSession(event);
      return await respond_with_error({
        event,
        options,
        state,
        $session,
        status: 500,
        error: error2,
        ssr
      });
    } catch (e22) {
      const error3 = coalesce_to_error(e22);
      return new Response(options.dev ? error3.stack : error3.message, {
        status: 500
      });
    }
  }
}
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
var template = ({ head, body, assets: assets2, nonce }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8">\n		<meta content="width=device-width, initial-scale=1" name="viewport">\n		' + head + '\n	</head>\n\n	<body class="scroller">\n		' + body + "\n	</body>\n</html>\n";
var read = null;
set_paths({ "base": "", "assets": "" });
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
  handleError: hooks.handleError || (({ error: error2 }) => console.error(error2.stack)),
  externalFetch: hooks.externalFetch || fetch
});
var App = class {
  constructor(manifest2) {
    const hooks = get_hooks(user_hooks);
    this.options = {
      amp: false,
      csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
      dev: false,
      floc: false,
      get_stack: (error2) => String(error2),
      handle_error: (error2, event) => {
        hooks.handleError({
          error: error2,
          event,
          get request() {
            throw new Error("request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details");
          }
        });
        error2.stack = this.options.get_stack(error2);
      },
      hooks,
      hydrate: true,
      manifest: manifest2,
      method_override: { "parameter": "_method", "allowed": [] },
      paths: { base, assets },
      prefix: assets + "/_app/",
      prerender: true,
      read,
      root: Root,
      service_worker: null,
      router: true,
      template,
      template_contains_nonce: false,
      trailing_slash: "never"
    };
  }
  render(request, options = {}) {
    if (!(request instanceof Request)) {
      throw new Error("The first argument to app.render must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details");
    }
    return respond(request, this.options, options);
  }
};

// .svelte-kit/vercel-tmp/manifest.js
var manifest = {
  appDir: "_app",
  assets: new Set(["about-resources/cats.png", "blog-resources/filesv2/Files21_V2_ColumnView_Light_RGB.jpg", "blog-resources/filesv2/Files21_V2_ContextMenu_Light_RGB.jpg", "blog-resources/filesv2/Files21_V2_Themes_Dark_RGB.jpg", "blog-resources/filesv2/FilesV2Banner.jpg", "blog-resources/filesv2-1/HeroImage.jpg", "blog-resources/filesv2-1/PropertiesDialog.jpg", "blog-resources/setting-custom-background/HeroImage.jpg", "blog-resources/web-release/web.png", "branding/logo.png", "branding/map.png", "branding/vercel-dark.svg", "branding/vercel-light.svg", "docs-resources/male-sign.png", "docs-resources/Settings-Dialog-Experimental.png", "docs-resources/Text-translate.png", "docs-resources/Toolkit-translate.png", "docs-resources/vs-architecture-config.png", "fonts/Inter-italic.var.woff2", "fonts/Inter-roman.var.woff2", "LICENSE", "preview-samples/index.html", "preview-samples/waves.png", "screenshots/code-dark.png", "screenshots/code-light.png", "screenshots/desktop-dark.png", "screenshots/desktop-light.png", "screenshots/folder-list-dark.png", "screenshots/folder-list-light.png", "screenshots/hero-dark.png", "screenshots/hero-light.png", "screenshots/solstice.png", "ui/exported/calendar-dark.svg", "ui/exported/calendar-light.svg", "ui/exported/calendar-theme-2.svg", "ui/exported/calendar-theme-3.svg", "ui/exported/calendar-theme-4.svg", "ui/exported/calendar-theme-5.svg", "ui/exported/calendar-theme-6.svg", "ui/exported/drive-dark.svg", "ui/exported/drive-light.svg", "ui/exported/drive-theme-2.svg", "ui/exported/drive-theme-3.svg", "ui/exported/drive-theme-4.svg", "ui/exported/drive-theme-5.svg", "ui/exported/drive-theme-6.svg", "ui/exported/layout-dark.svg", "ui/exported/layout-light.svg", "ui/exported/layout-theme-2.svg", "ui/exported/layout-theme-3.svg", "ui/exported/layout-theme-4.svg", "ui/exported/layout-theme-5.svg", "ui/exported/layout-theme-6.svg", "ui/exported/properties-dark.svg", "ui/exported/properties-light.svg", "ui/exported/properties-theme-2.svg", "ui/exported/properties-theme-3.svg", "ui/exported/properties-theme-4.svg", "ui/exported/properties-theme-5.svg", "ui/exported/properties-theme-6.svg", "ui/exported/tabs-dark.svg", "ui/exported/tabs-light.svg", "ui/exported/tabs-theme-2.svg", "ui/exported/tabs-theme-3.svg", "ui/exported/tabs-theme-4.svg", "ui/exported/tabs-theme-5.svg", "ui/exported/tabs-theme-6.svg", "ui/hero-mask.png", "ui/icons/98-error.png", "ui/icons/cpp.svg", "ui/icons/desktop.png", "ui/icons/discord.svg", "ui/icons/documents.png", "ui/icons/exe.png", "ui/icons/file.png", "ui/icons/folder.png", "ui/icons/github.svg", "ui/icons/music.png", "ui/icons/picture.png", "ui/icons/pictures.png", "ui/icons/twitter.svg", "ui/icons/video.png", "ui/icons/zip.png"]),
  _: {
    mime: { ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".html": "text/html" },
    entry: { "file": "start-f2160e34.js", "js": ["start-f2160e34.js", "chunks/vendor-ec6aa394.js", "chunks/singletons-a6a7384f.js"], "css": ["assets/vendor-20988698.css"] },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2)),
      () => Promise.resolve().then(() => (init__3(), __exports3)),
      () => Promise.resolve().then(() => (init__4(), __exports4)),
      () => Promise.resolve().then(() => (init__5(), __exports5)),
      () => Promise.resolve().then(() => (init__6(), __exports6)),
      () => Promise.resolve().then(() => (init__7(), __exports7)),
      () => Promise.resolve().then(() => (init__8(), __exports8)),
      () => Promise.resolve().then(() => (init__9(), __exports9)),
      () => Promise.resolve().then(() => (init__10(), __exports10)),
      () => Promise.resolve().then(() => (init__11(), __exports11)),
      () => Promise.resolve().then(() => (init__12(), __exports12)),
      () => Promise.resolve().then(() => (init__13(), __exports13)),
      () => Promise.resolve().then(() => (init__14(), __exports14)),
      () => Promise.resolve().then(() => (init__15(), __exports15)),
      () => Promise.resolve().then(() => (init__16(), __exports16))
    ],
    routes: [
      {
        type: "page",
        pattern: /^\/$/,
        params: null,
        path: "/",
        shadow: null,
        a: [0, 2],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/about\/?$/,
        params: null,
        path: "/about",
        shadow: null,
        a: [0, 3],
        b: [1]
      },
      {
        type: "endpoint",
        pattern: /^\/blog\.json$/,
        params: null,
        load: () => Promise.resolve().then(() => (init_index_json_ts(), index_json_ts_exports))
      },
      {
        type: "page",
        pattern: /^\/blog\/?$/,
        params: null,
        path: "/blog",
        shadow: null,
        a: [0, 4],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/blog\/posts\/solstice-pre\/?$/,
        params: null,
        path: "/blog/posts/solstice-pre",
        shadow: null,
        a: [0, 5, 6],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/blog\/posts\/web-release\/?$/,
        params: null,
        path: "/blog/posts/web-release",
        shadow: null,
        a: [0, 5, 7],
        b: [1]
      },
      {
        type: "endpoint",
        pattern: /^\/blog\/posts\/([^/]+?)\.json$/,
        params: (m2) => ({ slug: m2[1] }),
        load: () => Promise.resolve().then(() => (init_slug_json_ts(), slug_json_ts_exports))
      },
      {
        type: "page",
        pattern: /^\/docs\/?$/,
        params: null,
        path: "/docs",
        shadow: null,
        a: [0, 8, 9],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/docs\/fluxduct\/?$/,
        params: null,
        path: "/docs/fluxduct",
        shadow: null,
        a: [0, 8, 10],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/docs\/fluxduct\/syntax\/?$/,
        params: null,
        path: "/docs/fluxduct/syntax",
        shadow: null,
        a: [0, 8, 11],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/docs\/fluxduct\/style\/?$/,
        params: null,
        path: "/docs/fluxduct/style",
        shadow: null,
        a: [0, 8, 12],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/docs\/personal\/?$/,
        params: null,
        path: "/docs/personal",
        shadow: null,
        a: [0, 8, 13],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/docs\/depth\/?$/,
        params: null,
        path: "/docs/depth",
        shadow: null,
        a: [0, 8, 14],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/docs\/depth\/assets\/?$/,
        params: null,
        path: "/docs/depth/assets",
        shadow: null,
        a: [0, 8, 15],
        b: [1]
      }
    ]
  }
};

// .svelte-kit/vercel-tmp/entry.js
var app = new App(manifest);
var entry_default = async (req, res) => {
  let request;
  try {
    request = await getRequest(`https://${req.headers.host}`, req);
  } catch (err) {
    res.statusCode = err.status || 400;
    return res.end(err.reason || "Invalid request body");
  }
  setResponse(res, await app.render(request));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/*!
* tabbable 5.2.1
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
