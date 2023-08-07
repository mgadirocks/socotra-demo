
const BASE_URL = "https://api.sandbox.socotra.com";

const POLICY_URL = `${BASE_URL}/policy/100000100`;

const AUTH_TOKEN_URL = `${BASE_URL}/account/authenticate/`;


export const getAuthTokenFromLocalStorage = () => {
    const token = localStorage.getItem("token");
    return token;
}

const setAuthTokenToLocalStorage = (token) => {
    localStorage.setItem("token", token);
}

export const getPolicy = async (params) => {
    try {
        const options = {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            }
        }

        const response = await fetch(`${BASE_URL}/${POLICY_URL}`, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error occurred:", error);
    }
}


export const getAuthToken = async (params) => {
    const loginParams = {
        username: params.username,
        password: params.password,
        hostName: `${params.hostname}-configeditor.co.sandbox.socotra.com`,
    };

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginParams),
    };

    const response = await fetch(AUTH_TOKEN_URL, requestOptions);
    const data = await response.json();
    console.log("data", data);
    setAuthTokenToLocalStorage(data?.authorizationToken);
    return data?.authorizationToken;
}


export const searchPolicyHolderByName = async (policyHolderSearch) => {
    const response = await fetch(
        `https://api.sandbox.socotra.com/entity/v1/search/frontend?query=${policyHolderSearch}`,
        {
            headers: {
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
                "Content-Type": "application/json",
            },
        }
    );

    const data = await response.json();
    return data.results;
};

export const getPoliciesByPolicyHolderId = async (policyHolderId) => {
    const response = await fetch(
        `https://api.sandbox.socotra.com/policyholder/${policyHolderId}/policies`,
        {
            headers: {
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
                "Content-Type": "application/json",
            },
        }
    );

    const data = await response.json();
    return data;
}

export const getPolicyDetailsByPolicyId = async (policyId) => {
    const response = await fetch(
        `https://api.sandbox.socotra.com/policy/${policyId}`,
        {
            headers: {
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
                "Content-Type": "application/json",
            },
        }
    );
    const data = await response.json();
    return data;
};