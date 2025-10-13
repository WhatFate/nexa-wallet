import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    ALCHEMY_RPC_URL = os.getenv("ALCHEMY_RPC_URL")
    PRIVATE_KEY = os.getenv("PRIVATE_KEY")
    ENTRYPOINT_ADDRESS = os.getenv("ENTRYPOINT_ADDRESS")
    SALT = os.getenv("SALT")
    # AI_API_KEY = os.getenv("AI_API_KEY")