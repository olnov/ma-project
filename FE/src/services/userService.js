const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Sync user
export const syncUser = async (token, user) => {
    console.log("LINE 5");
    const payload = {
        user: user
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    };
    console.log("LINE 14");
    const response = await fetch(`${BACKEND_URL}/api/v1/users/sync`, requestOptions);
    console.log("LINE 16");
    if (!response.ok) {
        throw new Error("Failed to sync user profile")
    }
    console.log("LINE 20");
    const data = await response.json();
    console.log("LINE 22");
    return {
        status: response.status,
        data: data,
    };
}

// Get User
export const getUser = async (token) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await fetch(`${BACKEND_URL}/api/v1/users/me`, requestOptions);
    console.log("RESPONSE: ", response.json());

    if (!response.ok) {
        throw new Error("Failed to fetch user profile");
    }

    const data = await response.json();
    return {
        status: response.status,
        data: data,
    };
}