const API_URL = "http://localhost:5000/api";


// ==========================================
// Get Current User
// ==========================================

export const getCurrentUser = async (getToken) => {

    const token = await getToken();

    if (!token) {
        throw new Error(
            "Authentication token not found"
        );
    }


    const response = await fetch(
        `${API_URL}/users/me`,
        {
            method: "GET",

            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message || "Failed to fetch user"
        );

    }


    return data;
};


// ==========================================
// Update Current User
// ==========================================

export const updateCurrentUser = async (
    userData,
    getToken
) => {

    const token = await getToken();
    console.log("Clerk token exists:", !!token);
    console.log(
        "Token preview:",
        token ? token.substring(0, 30) : null
    );


    if (!token) {
        throw new Error(
            "Authentication token not found"
        );
    }


    const response = await fetch(
        `${API_URL}/users/me`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify(userData),
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message ||
            "Failed to update profile"
        );

    }


    return data;
};