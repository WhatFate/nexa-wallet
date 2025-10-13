from web3 import Web3
from config import Config

w3 = Web3(Web3.HTTPProvider(Config.ALCHEMY_URL))

def get_provider():
    return w3
