import { sendToAi } from "../services/aiService.js";

export const chatWithAI = async (req, res) => {

    try {

        const { messages } = req.body;


        // Validate messages

        if (
            !messages ||
            !Array.isArray(messages)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Messages must be an array"

            });

        }


        console.log(
            "\nMessages received from frontend:"
        );

        console.log(messages);


        // ==========================================
        // SEND TO PYTHON
        // ==========================================

        const aiResponse =
            await sendToAi(messages);


        console.log(
            "\nResponse received from Python:"
        );

        console.log(aiResponse);


        // ==========================================
        // SEND RESPONSE TO FRONTEND
        // ==========================================

        return res.status(200).json({

            success: true,

            message: aiResponse.message

        });

    }

    catch (error) {

        console.error(
            "Chat controller error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to communicate with AI"

        });

    }

};