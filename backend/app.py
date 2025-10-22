import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from fastapi import FastAPI, Request
from pydantic import BaseModel
from server import get_asi1_response

from routes.user_routes import user_bp
from fastapi.middleware.wsgi import WSGIMiddleware
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

flask_app = Flask(__name__)
CORS(flask_app)

flask_app.register_blueprint(user_bp)

@flask_app.route("/api/get-env", methods=["GET"])
def get_env():
    return {
        "rpc_url": os.getenv("ALCHEMY_RPC_URL"),
        "api_key": os.getenv("ALCHEMY_API_KEY"),
        "private_key": os.getenv("PRIVATE_KEY"),
        "entry_point": os.getenv("ENTRYPOINT_ADDRESS"),
        "account_factory": os.getenv("ACCOUNT_FACTORY"),
        "salt": os.getenv("SALT"),
    }


fastapi_app = FastAPI(title="Nexa Wallet AI Agent API")
fastapi_app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserQuery(BaseModel):
    question: str


@fastapi_app.post("/ask")
async def ask_ai(request: Request):
    data = await request.json()
    question = data.get("question", "")
    print(f"Got question: {question}")

    answer = get_asi1_response(question)
    print(f"Answer: {answer[:100]}")

    return {"answer": answer}


fastapi_app.mount("/flask", WSGIMiddleware(flask_app))
app = fastapi_app

if __name__ == "__main__":
    flask_app.run(port=5000, debug=True)
