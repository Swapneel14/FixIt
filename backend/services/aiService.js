const AI_SERVER_URL = "http://localhost:8000";

//Send Messages to Ai
export const sendToAi = async(messages) =>{
    const start = Date.now();

    console.log("➡️ Sending request to Python");

    const response = await fetch(
        `${AI_SERVER_URL}/chat`,
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

    console.log(
        `🐍 Python responded in ${(Date.now() - start) / 1000}s`
    );


    const data = await response.json();
    console.log(data);

     if (!response.ok) {

        throw new Error(
            data.message ||
            "AI server request failed"
        );

    }


    return data;
}