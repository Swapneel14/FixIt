const API_URL = "http://localhost:5000/api";

export const getNearbyProviders = async({
    service,
    radius,
    latitude,
    longitude
})=>{

    const params = new URLSearchParams({
        service : service || 'all',
        radius : String(radius),
        latitude : String(latitude),
        longitude : String(longitude)
    })

     const response = await fetch(
        `${API_URL}/providers/nearby?${params.toString()}`
    );

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message||"Failed to fetch NearBy Providers");
    }

    return data;
}