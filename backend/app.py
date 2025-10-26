import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from fastapi import FastAPI, Request
from pydantic import BaseModel
from server import get_asi1_response
from web3 import Web3, HTTPProvider

from routes.user_routes import user_bp
from fastapi.middleware.wsgi import WSGIMiddleware
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

flask_app = Flask(__name__)
CORS(flask_app)

flask_app.register_blueprint(user_bp)

WEB3_PROVIDER = os.environ.get("ALCHEMY_RPC_URL")
BACKEND_PRIVATE_KEY = os.environ.get("PRIVATE_KEY")
API_KEY = os.environ.get("Y4F9hn8V68LQyPfRwqm1L")
CHAIN_ID = 11155111

w3 = Web3(HTTPProvider(WEB3_PROVIDER))
sender_account = w3.eth.account.from_key(BACKEND_PRIVATE_KEY)
SENDER_ADDRESS = sender_account.address
ALLOWED_ORIGINS = ["http://localhost:3000"]

@flask_app.route("/api/get-env", methods=["GET"])
def get_env():
    return {
        "rpc_url": os.getenv("ALCHEMY_RPC_URL"),
        "api_key": os.getenv("ALCHEMY_API_KEY"),
        "entry_point": os.getenv("ENTRYPOINT_ADDRESS"),
        "private_key": os.getenv("PRIVATE_KEY"),
        "swap_router": os.getenv("SWAPROUTER_ADDRESS"),
        "account_factory": os.getenv("ACCOUNT_FACTORY"),
        "salt": os.getenv("SALT"),
    }


@flask_app.route("/api/pay-transaction", methods=["POST"])
def pay_transaction():
    origin = request.headers.get("Origin")
    if origin not in ALLOWED_ORIGINS:
        return jsonify({"error": "Forbidden"}), 403

    data = request.get_json() or {}
    to = data.get("to")

    if not to or not w3.is_address(to):
        return jsonify({"error": "Invalid 'to' address"}), 400

    try:
        value_wei = w3.to_wei("0.00025", "ether")

        sender_balance = w3.eth.get_balance(SENDER_ADDRESS)
        if sender_balance < value_wei:
            return jsonify({
                "error": "insufficient_funds",
                "message": f"Backend balance {w3.from_wei(sender_balance, 'ether')} ETH < required {w3.from_wei(value_wei, 'ether')} ETH"
            }), 400

        latest_block = w3.eth.get_block("latest")
        base_fee = latest_block.get("baseFeePerGas", w3.to_wei("20", "gwei"))
        max_priority_fee = w3.to_wei("2", "gwei")
        max_fee_per_gas = int(base_fee * 2) + max_priority_fee

        nonce = w3.eth.get_transaction_count(SENDER_ADDRESS)
        tx = {
            "type": 2,
            "to": to,
            "value": value_wei,
            "nonce": nonce,
            "gas": 21000,
            "maxFeePerGas": max_fee_per_gas,
            "maxPriorityFeePerGas": max_priority_fee,
            "chainId": CHAIN_ID,
        }

        signed = w3.eth.account.sign_transaction(tx, private_key=BACKEND_PRIVATE_KEY)
        tx_hash = w3.eth.send_raw_transaction(signed.raw_transaction)

        print(f"[INFO] Sent 0.00022 ETH to {to}")
        return jsonify({
            "txHash": w3.to_hex(tx_hash),
            "from": SENDER_ADDRESS,
            "to": to,
            "value_eth": "0.00022",
            "chainId": CHAIN_ID,
        })

    except Exception as e:
        print(f"[ERROR] Transaction failed: {e}")
        return jsonify({
            "error": "internal_error",
            "message": str(e)
        }), 500


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
