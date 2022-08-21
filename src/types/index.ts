export interface ResultError {
    success: boolean;
    data: string;
}

export interface Result {
    success: boolean;
    data: Data;
}

export interface Data {
    id: string;
    domain: string;
    ip_address: string;
    category: string;
    risk_score: number;
    check: Check;
}

export interface Check {
    adult: boolean;
    suspicious: boolean;
    unsafe: boolean;
    spamming: boolean;
    malware: boolean;
    phishing: boolean;
    dns_valid: boolean;
    parking: boolean;
}
