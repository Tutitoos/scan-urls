import "dotenv/config";
import {Result, ResultError} from "../types";
import axios, {AxiosError, AxiosResponse} from "axios";

const {SECRET_KEY} = process.env;

function urlParse(value: string): string {
    let newValue: string;
    newValue = value.replace(/:\/\//gi, "%3A%2F%2F");
    newValue = newValue.replace(/\//gi, "");
    return newValue;
}

function catchError(error: AxiosError): ResultError {
    return {
        success: false,
        data: error.message,
    };
}

export function validateURL(url: string): Promise<Result | ResultError> {
    return axios.request( {
        method: "GET",
        url: `https://ipqualityscore.com/api/json/url/${SECRET_KEY}/${urlParse(url)}`,
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response: AxiosResponse) => {
        if (response.status !== 200) throw response;
        const { data } = response;
        if (!data.success) throw data;
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
