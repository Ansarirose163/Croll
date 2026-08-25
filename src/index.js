// ==========================================
// CRUNCHYROLL PROXY - Cloudflare Worker
// ==========================================

// ==========================================
// 🔒 HARD-CODED CONFIG (Sirf captured data se)
// ==========================================
const CONFIG = {
    // 🔥 API Base URLs
    ssoApi: 'https://sso.crunchyroll.com',
    api: 'https://www.crunchyroll.com',
    cdn: 'https://vod-fy-mod.crunchyrollcdn.com',

    // 🔥 Device Details (Hard-coded)
    device: {
        model: 'SM-S928B',
        brand: 'samsung',
        manufacturer: 'samsung',
        osVersion: '16',
        platform: 'Android',
        userAgent: 'Mozilla/5.0 (Linux; Android 16; SM-S928B Build/BP4A.251205.006; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/151.0.7922.169 Mobile Safari/537.36',
        advertisingId: '61304354-728a-4058-8586-4607eefa339e',
        androidId: '8299d36e5ed5f03b3b1890d4a627ae5629042006cee1a064965ae28647166e99',
        appVersion: '3.116.0',
        appBuild: '1173',
        carrier: 'airtel',
        country: 'IN',
        locale: 'en-GB'
    },

    // 🔥 Account Details (Captured)
    account: {
        accountId: 'fc968def-4e2d-5385-9c36-e1e6b8971b8f',
        externalId: '1294445098',
        email: 'tumharejija7@gmail.com',
        profileId: 'fc968def-4e2d-5385-9c36-e1e6b8971b8f'
    },

    // 🔥 Tokens (Hard-coded)
    tokens: {
        bearer: 'eyJhbGciOiJSUzI1NiIsImtpZCI6InZ6YlpmV0tUeHp4emJtTDQ1LXJmSEEiLCJ0eXAiOiJKV1QifQ.eyJhbm9ueW1vdXNfaWQiOiIwYzJlZmU4MS0xMzQwLTRjMDAtOWYyMC1hODU1ZTM0YTI4NDciLCJiZW5lZml0cyI6WyJhbm51YWxfZGlzY291bnQucGVyY2VudF8xNiIsImNhdGFsb2ciLCJjb25jdXJyZW50X3N0cmVhbXMuNCIsImNyX2JlbnRvIiwiY3JfZmFuX3BhY2siLCJjcl9wcmVtaXVtIiwibm9fYWRzIiwib2ZmbGluZV92aWV3aW5nIiwic2ltdWxjYXN0Il0sImNsaWVudF9pZCI6ImNyX2FuZHJvaWQiLCJjbGllbnRfdGFnIjoiMy4xMTQuMCIsImNvdW50cnkiOiJJTiIsImRldmljZV9pZCI6ImNkNzMzM2Q4LTZhMWEtNDRlZi05Mzg2LTlmMDJjZTliZDkzNSIsImV0cF91c2VyX2lkIjoiZmM5NjhkZWYtNGUyZC01Mzg1LTljMzYtZTFlNmI4OTcxYjhmIiwiZXhwIjoxNzg3NjYxNjE5LCJleHRlbmRlZF9tYXR1cml0eSI6eyJBVSI6IlIgMTgrIiwiQlIiOiIxOCIsIklOIjoiQSIsIktSIjoiMTkiLCJVTiI6IjE4In0sImp0aSI6IjM1OGFlZTgyLTMxZTktNDNkYi1hNDNmLWUzODZhMDkxYmUzNiIsIm1hdHVyaXR5IjoiTTMiLCJvYXV0aF9zY29wZXMiOiJhY2NvdW50IGNvbnRlbnQgbXAgb2ZmbGluZV9hY2Nlc3MgcGlucyB0ZWVuLXByb2ZpbGUiLCJwcm9maWxlX2lkIjoiZmM5NjhkZWYtNGUyZC01Mzg1LTljMzYtZTFlNmI4OTcxYjhmIiwicHJvZmlsZV90eXBlIjoiYWdncmV0c3VrbyIsInJ0X2lkIjoiZGE2b28xczNwcTlidTc1Z2JpdGciLCJzY29wZXMiOnsiY3IiOnsiYWNjX2lkIjoiZmM5NjhkZWYtNGUyZC01Mzg1LTljMzYtZTFlNmI4OTcxYjhmIiwiZXh0X2lkIjoiMTI5NDQ0NTA5OCJ9fSwic3RhdHVzIjoiUEVORElORyIsInRudCI6ImNyIiwidmFsaWRhdGlvbl9oaW50cyI6WyJWYWxpZGF0ZS1FbWFpbC1BZGRyZXNzIiwiU2V0LVVzZXJuYW1lIl19.lhuvV7Lyb25aBeZdsFA9tsBGcLAEExEBjU6P6KDe5S2l2uVhvGwLzRwrPFB6XS1VO6RsFRlIeB18-pqtJysEC0QVxyaMZbKz1-C0jwZOjuDmeVyR9xkZIocprjCyUYIFQndBlyHNaSw_AFYngHdXyKNTkjoR90tRuZJZs-vjeF-a0Jod2atGf8Qo09MzYHHYcrpYhELP90LD7AT_AkGEp5u_zOdUtGc06PESi86fUuq6hJMnfNfr6wN--I9AWcvx89Mx166AajJ-kRgH71R3wfAjXFd3Az0QurHpZGSAm0YBrcT4Sc9gVBfyZextlLiTTI62xJIGohI8SHurp00MWQ'
    },

    // 🔥 Branding
    branding: '@Crunchyroll Premium'
};

// ==========================================
// 🚫 BLOCKED ENDPOINTS
// ==========================================
const BLOCKED_ENDPOINTS = ['/logout', '/delete', '/deactivate', '/signout'];
const BLOCKED_PATTERNS = [
    '/recaptcha/enterprise', '/firebaselogging', '/sdk-api-v1.singular.net',
    '/litix.io', '/doubleclick.net', '/content-autofill.googleapis.com',
    '/analytics', '/track', '/log', '/heartbeat', '/impression'
];

// ==========================================
// 🏷️ BRANDING FUNCTION
// ==========================================
function addBranding(obj) {
    if (!obj || typeof obj !== 'object') return obj;
    const tag = ` [${CONFIG.branding}]`;
    const targetKeys = ['title', 'name', 'display_name', 'username', 'nickname', 'profile_name'];
    
    if (Array.isArray(obj)) {
        return obj.map(item => addBranding(item));
    }
    for (const key in obj) {
        if (typeof obj[key] === 'string' && targetKeys.includes(key)) {
            if (!obj[key].includes(CONFIG.branding)) {
                obj[key] = obj[key].trim() + tag;
            }
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            addBranding(obj[key]);
        }
    }
    return obj;
}

// ==========================================
// 🎯 VIP SPOOF
// ==========================================
function spoofVIP(data) {
    if (!data || typeof data !== 'object') return data;
    
    if (data.subscription_state || data.subStatus) {
        data.subStatus = 'Premium';
        data.subscription_state = 'active';
        data.isPremium = true;
        data.hasPremium = true;
        data.plan = 'Annual Mega Fan';
    }
    
    if (data.benefits && Array.isArray(data.benefits)) {
        data.benefits = ['no_ads', 'offline_viewing', 'cr_premium', 'cr_fan_pack', 'catalog'];
    }
    
    if (data.profiles && Array.isArray(data.profiles)) {
        const primary = data.profiles.find(p => p.is_primary === true);
        if (primary) data.profiles = [primary];
    }
    
    if (data.account_id || data.email) {
        data.account_id = CONFIG.account.accountId;
        data.email = CONFIG.account.email;
        data.isPremium = true;
        data.hasPremium = true;
    }
    
    return data;
}

// ==========================================
// 🔧 BUILD HEADERS
// ==========================================
function buildHeaders(req) {
    const headers = {};
    const device = CONFIG.device;
    
    headers['User-Agent'] = device.userAgent;
    headers['X-Requested-With'] = 'com.crunchyroll.crunchyroid';
    headers['ETP-Anonymous-ID'] = CONFIG.account.accountId;
    headers['Authorization'] = `Bearer ${CONFIG.tokens.bearer}`;
    headers['X-Advertising-ID'] = device.advertisingId;
    headers['X-Android-ID'] = device.androidId;
    headers['X-Country'] = device.country;
    headers['X-Locale'] = device.locale;
    headers['Accept'] = 'application/json';
    headers['Accept-Charset'] = 'UTF-8';
    
    const cookies = [
        `c_locale=${device.locale}`,
        `ajs_anonymous_id=${CONFIG.account.accountId}`,
        `cr_exp=${CONFIG.account.accountId}${CONFIG.account.accountId}`,
        `NEXT_LOCALE=${device.locale}`,
        `sso_client_name=CR%20Android`,
        `client_id=yvewurtkqamlsyijwwmw`
    ];
    headers['Cookie'] = cookies.join('; ');
    
    return headers;
}

// ==========================================
// 🔄 GET TARGET URL
// ==========================================
function getTargetUrl(url) {
    const path = new URL(url).pathname + new URL(url).search;
    
    if (path.includes('/sso.crunchyroll.com')) {
        return `https://sso.crunchyroll.com${path}`;
    }
    if (path.includes('/vod-fy-mod.crunchyrollcdn.com')) {
        return `https://vod-fy-mod.crunchyrollcdn.com${path}`;
    }
    return `https://www.crunchyroll.com${path}`;
}

// ==========================================
// 🚀 MAIN HANDLER
// ==========================================
export default {
    async fetch(request) {
        const url = new URL(request.url);
        const path = url.pathname;
        const method = request.method;
        
        // CORS
        if (method === 'OPTIONS') {
            return new Response(null, {
                status: 204,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': '*'
                }
            });
        }
        
        // Block logout
        if (BLOCKED_ENDPOINTS.some(e => path.includes(e))) {
            return new Response(JSON.stringify({ success: true, message: "Logout disabled" }), {
                status: 200,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
        }
        
        // Block analytics
        if (BLOCKED_PATTERNS.some(p => path.includes(p))) {
            return new Response(JSON.stringify({ success: true, data: {} }), {
                status: 200,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
        }
        
        // VIP Responses
        if (path.includes('/subscriptions/state')) {
            return new Response(JSON.stringify({
                subStatus: 'Premium',
                subscription_state: 'active',
                isPremium: true,
                hasPremium: true,
                plan: 'Annual Mega Fan',
                benefits: ['no_ads', 'offline_viewing', 'cr_premium', 'cr_fan_pack', 'catalog']
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
        }
        
        if (path.includes('/benefits')) {
            return new Response(JSON.stringify({
                benefits: ['no_ads', 'offline_viewing', 'cr_premium', 'cr_fan_pack', 'catalog']
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
        }
        
        if (path.includes('/multiprofile')) {
            return new Response(JSON.stringify({
                tier_max_profiles: 5,
                max_profiles: 5,
                profiles: [{
                    profile_id: CONFIG.account.profileId,
                    email: CONFIG.account.email,
                    profile_name: `Tumharejija ${CONFIG.branding}`,
                    is_primary: true,
                    is_selected: true,
                    maturity_rating: 'M3'
                }]
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
        }
        
        if (path.includes('/accounts/v1/me')) {
            return new Response(JSON.stringify({
                account_id: CONFIG.account.accountId,
                external_id: CONFIG.account.externalId,
                email: CONFIG.account.email,
                email_verified: true,
                has_password: true,
                isPremium: true,
                hasPremium: true,
                subscription_status: 'active',
                plan: 'Annual Mega Fan'
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
        }
        
        if (path.includes('/third_party_products')) {
            return new Response(JSON.stringify({ products: [] }), {
                status: 200,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
        }
        
        // Forward request
        try {
            const targetUrl = getTargetUrl(request.url);
            const headers = buildHeaders(request);
            
            let body = null;
            if (method !== 'GET' && method !== 'HEAD') {
                body = await request.text();
            }
            
            const response = await fetch(targetUrl, {
                method: method,
                headers: headers,
                body: body
            });
            
            const contentType = response.headers.get('content-type') || '';
            const responseBody = await response.text();
            
            if (contentType.includes('application/json')) {
                try {
                    let data = JSON.parse(responseBody);
                    data = spoofVIP(data);
                    data = addBranding(data);
                    return new Response(JSON.stringify(data), {
                        status: response.status,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        }
                    });
                } catch (_) {}
            }
            
            return new Response(responseBody, {
                status: response.status,
                headers: {
                    'Content-Type': contentType,
                    'Access-Control-Allow-Origin': '*'
                }
            });
            
        } catch (error) {
            return new Response(JSON.stringify({ success: false, error: error.message }), {
                status: 502,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }
};
