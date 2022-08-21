"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateURL = void 0;
require("dotenv/config");
const axios_1 = __importDefault(require("axios"));
const { SECRET_KEY } = process.env;
function urlParse(value) {
    let newValue;
    newValue = value.replace(/:\/\//gi, "%3A%2F%2F");
    newValue = newValue.replace(/\//gi, "");
    return newValue;
}
function catchError(error) {
    return {
        success: false,
        data: error.message,
    };
}
function validateURL(url) {
    return axios_1.default.request({
        method: "GET",
        url: `https://ipqualityscore.com/api/json/url/${SECRET_KEY}/${urlParse(url)}`,
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        if (response.status !== 200)
            throw response;
        const { data } = response;
        if (!data.success)
            throw data;
        return {
            success: true,
            data: {
                id: data.request_id,
                domain: data.domain,
                ip_address: data.ip_address,
                category: data.category,
                risk_score: data.risk_score,
                check: {
                    adult: data.adult,
                    suspicious: data.suspicious,
                    unsafe: data.unsafe,
                    spamming: data.spamming,
                    malware: data.malware,
                    phishing: data.phishing,
                    dns_valid: data.dns_valid,
                    parking: data.parking,
                },
            }
        };
    }).catch(catchError);
}
exports.validateURL = validateURL;
