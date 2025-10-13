from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route("/api/get-env", methods=["GET"])
def get_env():
    rpc_url = os.getenv("ALCHEMY_RPC_URL")
    private_key = os.getenv("PRIVATE_KEY")
    entry_point = os.getenv("ENTRYPOINT_ADDRESS")
    return jsonify({
        "rpc_url": rpc_url,
        "private_key": private_key,
        "entry_point": entry_point
    })

if __name__ == "__main__":
    app.run(port=5000, debug=True)
