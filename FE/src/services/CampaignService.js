const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// TODO: Add token authentication
export const createCampaign = async (campaignData) => {
    console.log('Creating campaign with data:', campaignData);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(campaignData),
    };
    const response = await fetch(`${BACKEND_URL}/api/v1/campaigns`, requestOptions);
    if (!response.ok) {
        return { status: response.status, message: 'Network response was not ok' };
    }
    const data = await response.json();
    return {
        status: response.status,
        data: data,
    };
}

// TODO: Add token authentication
export const getCampaignsByUser = async (userId) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`, 
        },
    };
    const response = await fetch(`${BACKEND_URL}/api/v1/campaigns/${userId}`, requestOptions);
    if (!response.ok) {
        return { status: response.status, message: 'Network response was not ok' };
    }
    const data = await response.json();
    return {
        status: response.status,
        data: data,
    };
};