from routes.user_routes import user_bp
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

app.register_blueprint(user_bp)

@app.route("/api/get-env", methods=["GET"])
def get_env():
    return {
        "rpc_url": os.getenv("ALCHEMY_RPC_URL"),
        "private_key": os.getenv("PRIVATE_KEY"),
        "entry_point": os.getenv("ENTRYPOINT_ADDRESS"),
        "account_factory": os.getenv("ACCOUNT_FACTORY"),
        "salt": os.getenv("SALT")
    }

if __name__ == "__main__":
    app.run(port=5000, debug=True)