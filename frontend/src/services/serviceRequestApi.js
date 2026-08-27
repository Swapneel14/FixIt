const API_URL = "http://localhost:5000/api";

export const createServiceRequest = async(requestData,token)=>{
    const response = await fetch(
        `${API_URL}/service-requests`,
        {
            method:"POST",
            headers:{
                  "Content-Type": "application/json",

                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify(requestData)
        }
    );

    const data = await response.json();

    if(!response.ok){
         throw new Error(
            data.message ||
            "Failed to create service request"
        );
    }

    return data;
};

export const getMyBookings = async (token) => {

    const response = await fetch(
        `${API_URL}/service-requests/my-bookings`,
        {
            method: "GET",

            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.message ||
            "Failed to fetch bookings"
        );

    }

    return data;
};