"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheckData = exports.local = void 0;
require("dotenv/config");
const fs_1 = __importDefault(require("fs"));
const ipqualityscore_controller_1 = require("./ipqualityscore.controller");
exports.local = [];
function getUrls() {
    const fileData = fs_1.default.readFileSync(`${__dirname}/../../urls.json`, "utf8");
    const { urls: urlsData } = JSON.parse(fileData);
    return urlsData;
}
function getCheckData() {
    return __awaiter(this, void 0, void 0, function* () {
        const urlsData = getUrls();
        for (const url of urlsData) {
            const { data: urlData } = yield (0, ipqualityscore_controller_1.validateURL)(url);
            if (typeof urlData === "object" && urlData) {
                const checks = [];
                if (urlData.risk_score > 0) {
                    if (urlData.check.adult)
                        checks.push("adult");
                    if (urlData.check.malware)
                        checks.push("malware");
                    if (urlData.check.spamming)
                        checks.push("spamming");
                    if (urlData.check.phishing)
                        checks.push("phishing");
                    if (urlData.check.unsafe)
                        checks.push("unsafe");
                    if (urlData.check.suspicious)
                        checks.push("suspicious");
                }
                else
                    checks.push("secure");
                exports.local.push({
                    name: urlData.domain,
                    checks,
                });
            }
        }
        return exports.local;
    });
}
exports.getCheckData = getCheckData;
