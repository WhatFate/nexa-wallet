# Nexa Wallet

**Nexa Wallet** is an **Account Abstraction (AA)** smart wallet built to make crypto management simple, secure, and intuitive.
It combines an **AI Agent**, **real-time token prices from Pyth Network**, and a clean modern interface for sending, receiving, and swapping assets.

## Getting Started

### Prerequisites

- Node.js >= 20
- npm >= 9 (or yarn)
- Python >= 3.11
- Access to an Ethereum RPC (e.g., Alchemy, Infura)
- Backend environment variables (`.env`) setup

### Frontend Setup

1. Navigate to the frontend folder:

```bash
cd frontend
````

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. For production build:

```bash
npm run build
npm start
```

### Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
```

2. Copy `.env.example` to `.env` and fill in your keys:

```
SENDER_ADDRESS=0x...
BACKEND_PRIVATE_KEY=your_private_key
RPC_URL=https://eth-sepolia.infura.io/v3/YOUR_KEY
CHAIN_ID=11155111
ALLOWED_ORIGINS=http://localhost:3000
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Start the backend server:

```bash
python app.py
```

5. Start the Ai agent:

``bash
uvicorn app:app --port 8001 --reload
```

6. Start the Mongodb:

```bash
sudo systemctl status mongod
```

## Key Features

### 1. Account Abstraction Smart Wallet
* Smart-contract–based wallet creation and management.
* Send and receive **ETH** and **ERC-20 tokens** easily.
* Built with **AA transactions**, removing the need to handle private keys directly.

### 2. AI Agent (uAgent via ASI:One)
* Integrated AI assistant available on every page.
* Helps users navigate the wallet, explains actions, and answers questions in chat.
* Example dialogue:
  > User: ”How can I send tokens?” 
  > AI Agent: ”Just click ‘Send’, choose a token, and confirm your transaction. I’ll handle the rest!” 

### 3. Real-Time Token Prices (Pyth Network)

* Integrated with **Pyth Network** to display accurate market prices for each token.
* Users can see their total portfolio value in **USD** and **ETH**, updated live.

### 4. Token Management & Swaps

* Supports **ETH ↔ WETH swaps** directly within the wallet.
* Separate views for **Send**, **Receive**, and **Token Details**.
* Fast, intuitive, and minimal UI designed for everyday use.
* 
### 5. Settings

* Includes a **Log Out** button that clears local storage and redirects to the homepage.
* Future updates will add theme switching, wallet import/recovery, and security controls.

## Current Functionality

| Status             | Feature                    | Description                                                          |
| ------------------ | -------------------------- | -------------------------------------------------------------------- |
| ✅ **Completed**    | Account Abstraction Wallet | Smart contract wallet deployed with signup and account management.   |
| ✅ **Completed**    | Send / Receive / Swap      | Core token and ETH/WETH transfer and swap functionality implemented. |
| ⚙️ **In Progress** | AI Agent Chat              | Chat UI functional, logic integration with uAgent (ASI:One) ongoing. |
| ✅ **Completed**    | Token Prices               | Integrated **Pyth Network** for real-time token price data.          |
| ⚙️ **In Progress** | Settings Page              | Added settings screen with a working **Log Out** feature.            |
| ⏳ **Planned**      | Portfolio Dashboard        | Display token balances, total value, and analytics.                  |
| ⏳ **Planned**      | DeFi Integrations          | Add staking, liquidity pools, and token swaps with DeFi protocols.   |
| ⏳ **Planned**     | Advanced AI Features | Smart contract explanations, cross-chain operation guidance, personalized DeFi recommendations. |

## Example User Flow

1. The user creates an **Account Abstraction wallet**.
2. The dashboard displays all tokens and their live USD/ETH values via **Pyth Network**.
3. Through the **AI Chat**, the user can ask:

   > “What’s my wallet balance in dollars?”
   > “How do I swap my ETH to WETH?”
4. The user sends or receives tokens in one click.
5. To exit, they go to **Settings → Log Out**, which clears all local data securely.

## Roadmap

* 🔜 Transaction history with AI analysis
* 🔜 Multi-chain support (Polygon, Base, Arbitrum)
* 🔜 AI-powered DeFi insights and recommendations
* 🔜 Portfolio tracking and on-chain analytics
* 🔜 Full DeFi hub (swap, stake, bridge)

## License

MIT License © 2025 Nexa Wallet