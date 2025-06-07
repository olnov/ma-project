const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Sync user
export const syncUser = async (token) => {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
    };
    
    const response = await fetch(`${BACKEND_URL}/api/v1/users/sync`, requestOptions);
    
    if (!response.ok) {
        throw new Error("Failed to sync user profile")
    }
    
    const data = await response.json();
    return {
        status: response.status,
        data: data,
    };
}

// Create User
// export const createUser = async (token, userDetails) => {

//     const payload = {
//         username: userDetails.username,
//         firstName: userDetails.firstName,
//         lastName: userDetails.lastName,
//         email: userDetails.email
//     };
    
//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//     };
//     const response = await fetch(`${BACKEND_URL}/api/v1/users`, requestOptions);
//     if (!response.ok) {
//         return { status: response.status, message: 'Network response was not ok' };
//     }
//     const data = await response.json();
//     return {
//         status: response.status,
//         data: data,
//     };
// }

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