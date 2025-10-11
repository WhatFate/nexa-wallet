# Nexa Wallet

**Nexa Wallet** is an Account Abstraction-enabled smart wallet designed to simplify cryptocurrency management for beginners and provide a seamless user experience. The project integrates an **AI Agent**, **Blockscout MCP**, and **Avail Nexus SDK**, allowing users to get intelligent insights about their transactions and tokens directly in the chat while performing cross-chain operations seamlessly.

## Key Features

### 1. DeFi & Cross-Chain Integration
- Users can select from available DeFi projects (e.g., UniSwap) and swap cryptocurrencies directly on the platform.
- Supports cross-chain operations using **Avail Nexus SDK** for:
  - Transferring tokens between Ethereum, Polygon, and other networks.
  - Unified gas refuel and cross-chain swaps (XCS).
  - "Bridge & Execute" functionality to combine multiple actions into one transaction.

### 2. AI Agent with On-Chain Data
- Built-in AI agent (uAgent via ASI:One) answers user questions in chat.
- Capabilities include:
  - Querying user balances and token holdings.
  - Displaying recent transaction history via Blockscout MCP.
  - Analyzing wallet activity across DeFi protocols and cross-chain operations.
  - Explaining smart contracts and transactions in plain language.

### 3. Transaction History
- Blockscout MCP provides verified on-chain transaction data.
- The AI agent can answer questions like:
  > “What was my last wallet transaction?”  
  > “How do I transfer tokens between Ethereum and other networks?”  
  > “What is the current value of my portfolio?”

## User Flow

### 1. Wallet Creation
- Users sign up on the site.
- Choose a unique wallet name linked to a smart contract address.
- Set a wallet password.
- Gas fees for wallet creation are covered by the project’s main smart contract.

### 2. Using the Wallet
Currently supports **Ethereum Sepolia** network and cross-chain operations.  
Main functionalities:
- **Send Crypto** — send tokens across supported networks.
- **Receive Crypto** — display smart contract address for receiving funds.
- **Swap** — swap tokens via UniSwap or other supported protocols.
- **Bridge & Execute** — transfer tokens and execute multiple operations in a single transaction via Avail Nexus SDK.
- **Stake** — stake tokens in supported DeFi protocols.
- **DeFi Hub** — browse available DeFi projects and services.
- **Settings** — manage wallet password, notifications, and preferences.
- **History** — view transaction history with AI-generated insights.
- **Portfolio Value** — check balances and token holdings in real-time.

### 3. AI Agent
- A chat interface is available on every page.
- Provides insights into transactions, token holdings, and cross-chain operations.
- Uses Blockscout MCP and Avail Nexus SDK to fetch verified on-chain data.
- Explains smart contract actions and DeFi protocol operations in plain language.


## Technologies & Integrations

| Technology / Project                  | Role in Nexa Wallet                                                  | Examples |
| ------------------------------------ | ------------------------------------------------------------------- | ------- |
| **AI Agent (uAgent via ASI:One)**    | Answers user questions, explains transactions and smart contracts   | Chat bot: “What was my last transaction?”, analyzes DeFi activity |
| **Blockscout MCP**                    | Provides verified on-chain transaction history and balances        | Displays recent transactions, calculates received ETH |
| **Avail Nexus SDK**                   | Enables cross-chain operations, unified access to on-chain assets, and advanced DeFi interactions | Bridge & Execute, cross-chain swaps (XCS), unified gas refuel, deposit assets across networks |

## Future Roadmap

| Status | Feature | Description |
|--------|---------|-------------|
| ⚙️ **In Progress** | Wallet Structure & Account Abstraction | Minimal smart contract wallet deployed; basic frontend landing page with login/signup. |
| ⏳ **Planned**     | AI Agent Interface | Chat UI implemented (currently placeholder, non-functional), ready for future AI integration. |
| ⏳ **Planned**     | DeFi & Cross-Chain Skeleton | Basic Swap, Send/Receive buttons in frontend; Avail Nexus SDK structure integrated for future cross-chain operations. |
| ⏳ **Planned**     | Transaction History | Integrating Blockscout MCP to fetch verified on-chain data and display user transactions in frontend. |
| ⏳ **Planned**     | AI Agent Logic | Connecting AI agent to on-chain data, preparing responses for wallet queries and DeFi operations. |
| ⏳ **Planned**     | Cross-Chain Features | Testing Avail Nexus SDK “Bridge & Execute” and cross-chain swap functionalities. |
| ⏳ **Planned**     | Full DeFi Hub | Display all available DeFi projects, swap options, staking, and analytics dashboards. |
| ⏳ **Planned**     | Portfolio Management | Real-time portfolio value, asset allocation, advanced analytics with AI insights. |
| ⏳ **Planned**     | Multi-Network Support | Expand beyond Ethereum Sepolia to Polygon and other chains, fully integrated via Avail Nexus SDK. |
| ⏳ **Planned**     | Advanced AI Features | Smart contract explanations, cross-chain operation guidance, personalized DeFi recommendations. |

