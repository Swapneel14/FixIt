from fastapi import FastAPI

from schemas import ChatRequest
from chatbot import generate_response


app = FastAPI()


@app.get("/")
def home():
    return {
        "success": True,
        "message": "FixIt AI Agent is running"
    }


@app.post("/chat")
def chat(request: ChatRequest):

    try:

        # Send conversation to LangChain/Groq
        response = generate_response(
            request.messages
        )

        # This JSON is sent BACK to whoever
        # called this Python endpoint
        return {
            "success": True,
            "message": response
        }

    except Exception as error:

        print("AI Agent Error:", error)

        return {
            "success": False,
            "message": "AI processing failed"
        }