import "dotenv/config";
import fs from "fs";
import {validateURL} from "./ipqualityscore.controller";

export const local: {
    name: string;
    checks: string[];
}[] = [];

function getUrls() {
    const fileData = fs.readFileSync( `${__dirname}/../../urls.json`, "utf8");
    const {urls: urlsData} = JSON.parse(fileData);
    return urlsData;
}

export async function getCheckData() {
    const urlsData = getUrls();
    for (const url of urlsData) {
        const {data: urlData} = await validateURL(url);
        if (typeof urlData === "object" && urlData) {
            const checks: string[] = [];
            if (urlData.risk_score > 0) {
                if (urlData.check.adult) checks.push("adult");
                if (urlData.check.malware) checks.push("malware");
                if (urlData.check.spamming) checks.push("spamming");
                if (urlData.check.phishing) checks.push("phishing");
                if (urlData.check.unsafe) checks.push("unsafe");
                if (urlData.check.suspicious) checks.push("suspicious");
            } else checks.push("secure");
            local.push({
                name: urlData.domain,
                checks,
            });
        }
    }
    return local;
}

