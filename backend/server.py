import requests
import os
from uagents import Agent, Context, Model

class ASI1Query(Model):
    query: str
    sender_address: str

class ASI1Response(Model):
    response: str

mainAgent = Agent(
    name="asi1_chat_agent",
    port=5068,
    endpoint="http://localhost:5068/submit",
    seed="nexa_wallet"
)

def get_asi1_response(query: str) -> str:
    api_key = os.environ.get("ASI1_API_KEY")
    if not api_key:
        return "Error: ASI1_API_KEY environment variable not set"

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    data = {
    "model": "asi1-mini",
    "messages": [
        {
            "role": "system",
            "content": (
                "You are the Nexa AI assistant. Your task is to help users understand and use the Nexa Wallet. "
                "Nexa Wallet is an Account Abstraction (AA) smart wallet designed to make crypto management simple, secure, and intuitive. "
                "It allows users to send and receive ETH and ERC-20 tokens, swap ETH↔WETH, view real-time token prices via Pyth Network, "
                "and manage their account without handling private keys directly. "
                "You are aware of the current functionality, including completed, in-progress, and planned features, such as AI Agent chat, "
                "portfolio dashboard, DeFi integrations, and advanced AI features. "
                "You know the user flow: wallet creation, viewing dashboard with live USD/ETH token values, using AI chat for questions, "
                "sending/receiving tokens, and logging out via Settings. "
                "You also understand future roadmap items like transaction history analysis, multi-chain support, AI-powered DeFi insights, "
                "portfolio tracking, and full DeFi hub features. "
                "Provide clear, accurate, and helpful guidance, including step-by-step instructions where appropriate, "
                "and ensure your advice is consistent with Nexa Wallet's current features and roadmap. "
                "Always keep security best practices in mind, such as safe handling of private keys and API keys."
            )
        },
        {"role": "user", "content": query}
    ]
}


    try:
        response = requests.post("https://api.asi1.ai/v1/chat/completions", json=data, headers=headers)
        print("ASI1 API status:", response.status_code)
        print("Response text:", response.text[:500])
        if response.status_code == 200:
            result = response.json()
            content = result.get("choices", [{}])[0].get("message", {}).get("content", "").strip()
            return content or "Empty response from ASI1 API"
        else:
            return f"ASI1 API Error {response.status_code}: {response.text}"
    except Exception as e:
        return f"Error contacting ASI1 API: {str(e)}"


@mainAgent.on_event("startup")
async def startup(ctx: Context):
    ctx.logger.info(f"Agent {ctx.agent.name} started at {ctx.agent.address}")

@mainAgent.on_message(model=ASI1Query)
async def handle_query(ctx: Context, sender: str, msg: ASI1Query):
    ctx.logger.info(f"Received query: {msg.query}")
    answer = get_asi1_response(msg.query)
    await ctx.send(sender, ASI1Response(response=answer))

if __name__ == "__main__":
    mainAgent.run()
