import os

from dotenv import load_dotenv

from langchain_groq import ChatGroq

from langchain_core.messages import (
    SystemMessage,
    HumanMessage,
    AIMessage
)


load_dotenv()


# ==============================
# LOAD SYSTEM PROMPT
# ==============================

PROMPT_PATH = os.path.join(
    os.path.dirname(__file__),
    "prompts",
    "system_prompts.txt"
)


with open(
    PROMPT_PATH,
    "r",
    encoding="utf-8"
) as file:

    SYSTEM_PROMPT = file.read()


llm = ChatGroq(
    model="openai/gpt-oss-20b",
  
)

# ==============================
# GENERATE RESPONSE
# ==============================

def generate_response(messages):

    chat_messages = [
        SystemMessage(
            content=SYSTEM_PROMPT
        )
    ]

    for message in messages:

        if message.role == "user":

            chat_messages.append(
                HumanMessage(
                    content=message.content
                )
            )

        elif message.role == "assistant":

            chat_messages.append(
                AIMessage(
                    content=message.content
                )
            )

    response = llm.invoke(
        chat_messages
    )

    return response.content