const API_URL = "http://localhost:5000/api";


// ==========================================
// SEND CHAT TO BACKEND
// ==========================================

export const sendMessageToAI = async (messages) => {

    const response = await fetch(
        `${API_URL}/chat`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                messages
            })
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message ||
            "Failed to communicate with AI"
        );

    }


    return data;
};