# ZKCandy Token Bridge Demo  
  
This repository contains a demonstration script for bridging ERC20 tokens from Ethereum (L1) to ZKCandy (L2), a zkSync-based layer 2 solution. It showcases how to deposit custom tokens using the official zkSync bridge.  
  
## 🚀 Features  
  
- Deposit custom ERC20 tokens from Ethereum mainnet to ZKCandy L2  
- Token approval with detailed error handling  
- Transaction tracking across both L1 and L2  
- Fully configurable gas parameters for optimal performance  
  
## 📋 Prerequisites  
  
- Node.js (v18+)  
- npm or yarn  
- An Ethereum wallet with:  
  - Some ETH for gas fees  
  - The ERC20 tokens you want to bridge  
- Infura API key  
  
## 🔧 Installation  
  
1. Clone this repository:  
   ``` 
   git clone https://github.com/yourusername/zkcandy-bridge-demo.git  
   cd zkcandy-bridge-demo  
   
```  
  
2. Install dependencies:  
   ```  
   npm install  
   
```  
  
3. Create a `.env` file in the root directory with the following variables:  
   ```
  
   PRIVATE_KEY=your_ethereum_private_key  
   INFURA_API_KEY=your_infura_api_key  
   
```  
  
## 🏃‍♂️ Running the Demo  
  
To run the token deposit demo:  
  
``` 
node index.js  

```  
  
The script will:  
1. Connect to the Ethereum and ZKCandy networks  
2. Check your token balance  
3. Approve the token for the bridge  
4. Initiate the deposit to L2  
5. Track the transaction through L1 confirmation and L2 finalization  
  
## ⚙️ Configuration  
  
You can modify the following parameters in the script:  
  
- `L1_TOKEN_ADDRESS`: The Ethereum address of the token you want to bridge  
- `CUSTOM_BRIDGE_ADDRESS`: The ZKCandy bridge address   
- `AMOUNT_TO_DEPOSIT`: The amount of tokens to deposit  
- Gas parameters in the `overrides` object  
  
## 🔍 Finding the L2 Token Address  
  
After bridging your token for the first time, you'll need to get the L2 token address for future reference. You can find it by:  
  
1. Going to [ZKCandy Explorer](https://explorer.zkcandy.io)  
2. Looking up your wallet address  
3. Finding the bridge transaction  
4. Examining the transaction details to find the created L2 token address  
  
## 🌉 Adding Your Token to the Bridge UI  
  
Once you've successfully bridged your token, you can submit it to be included in the official bridge UI:  
  
1. Create a new branch in the bridge UI repository  
2. Add your token's information using this template:  
  
```  
{  
  "chainId": 1,  
  "l1Address": "your_token_l1_address",  
  "l2Address": "your_token_l2_address",  
  "learnMoreUrl": "https://your-project-website.com",  
  "bridges": [],  
  "symbol": "TOKEN",  
  "bridgedSymbol": "TOKEN",  
  "name": "Your Token Name",  
  "decimals": 18,  
  "imgUrl": "path/to/token-logo.svg"  
}  

```  
  
3. Include an SVG of your token logo in the appropriate directory  
4. Submit a pull request with your changes  
  
## 📚 Additional Resources  
  
- [ZKCandy Documentation](https://docs.zkcandyapi.com)  
- [zkSync-ethers Documentation](https://sdk.zksync.io/js/ethers)  
- [ZKCandy Explorer](https://explorer.zkcandy.io)  
  
## ⚠️ Disclaimer  
  
This is a demonstration script. Always exercise caution when using scripts that involve private keys and real funds. Verify all transaction details before confirming.  
  
## 📜 License  
  
This project is licensed under the MIT License - see the LICENSE file for details.