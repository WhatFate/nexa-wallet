import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    ALCHEMY_RPC_URL = os.getenv("ALCHEMY_RPC_URL")
    PRIVATE_KEY = os.getenv("PRIVATE_KEY")
    ENTRY_POINT_ADDRESS = os.getenv("ENTRYPOINT_ADDRESS")
    ACCOUNT_FACTORY = os.getenv("ACCOUNT_FACTORY")
    SALT = os.getenv("SALT")
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")