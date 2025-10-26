import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    ALCHEMY_RPC_URL = os.getenv("ALCHEMY_RPC_URL")
    ENTRY_POINT_ADDRESS = os.getenv("ENTRYPOINT_ADDRESS")
    PRIVATE_KEY = os.getenv("PRIVATE_KEY")
    ACCOUNT_FACTORY = os.getenv("ACCOUNT_FACTORY")
    SWAPROUTER_ADDRESS = os.getenv("SWAPROUTER_ADDRESS")
    SALT = os.getenv("SALT")
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")