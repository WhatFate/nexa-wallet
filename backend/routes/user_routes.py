from flask import Blueprint, request, jsonify
from models.user_model import users

user_bp = Blueprint("user_bp", __name__, url_prefix="/api/user")

@user_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    eoaAddress = data.get("eoaAddress")
    aaAddress = data.get("aaAddress")

    if not username or not eoaAddress or not aaAddress:
        return jsonify({"error": "Missing fields"}), 400

    if users.find_one({"username": username}):
        return jsonify({"error": "Username already exists"}), 400

    users.insert_one({
        "username": username,
        "eoaAddress": eoaAddress,
        "aaAddress": aaAddress
    })

    return jsonify({"message": "User registered", "eoaAddress": eoaAddress}), 201

@user_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    eoaAddress = data.get("eoaAddress")

    if not username or not eoaAddress:
        return jsonify({"success": False}), 400

    user = users.find_one({"username": username})

    if not user:
        return jsonify({"success": False}), 404

    if user["eoaAddress"] != eoaAddress:
        return jsonify({"success": False}), 401

    return jsonify({
        "success": True,
        "aaAddress": user["aaAddress"]
    }), 200


@user_bp.route("/check-username", methods=["POST"])
def check_username():
    data = request.json
    username = data.get("username")

    if not username:
        return jsonify({"error": "Missing username"}), 400

    if users.find_one({"username": username}):
        return jsonify({"exists": True}), 200

    return jsonify({"exists": False}), 200

