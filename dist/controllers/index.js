"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheckData = exports.local = exports.validateURL = void 0;
const ipqualityscore_controller_1 = require("./ipqualityscore.controller");
Object.defineProperty(exports, "validateURL", { enumerable: true, get: function () { return ipqualityscore_controller_1.validateURL; } });
const urls_controller_1 = require("./urls.controller");
Object.defineProperty(exports, "local", { enumerable: true, get: function () { return urls_controller_1.local; } });
Object.defineProperty(exports, "getCheckData", { enumerable: true, get: function () { return urls_controller_1.getCheckData; } });
