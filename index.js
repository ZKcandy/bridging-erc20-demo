const { Wallet, Provider, types, utils } = require("zksync-ethers");  
const { ethers } = require("ethers"); 
require('dotenv').config() 
// const { parseEther } = require("ethers/lib/utils");  
  
async function depositTokenToL2() {  
  // Configuration  
  const PRIVATE_KEY = process.env.PRIVATE_KEY //populate value in .env file
  const L1_TOKEN_ADDRESS = "0xf9c53268e9de692ae1b2ea5216e24e1c3ad7cb1e"; // idexo token example
  const CUSTOM_BRIDGE_ADDRESS = "0xbeD1EB542f9a5aA6419Ff3deb921A372681111f6"; // elastic chain bridge 
  const AMOUNT_TO_DEPOSIT = ethers.parseEther("1"); // Adjust amount as needed  
  
  try {  
    // Setup providers and wallet  
    const zkSyncProvider = new Provider("https://rpc.zkcandy.io");  
    const ethProvider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`); //populate value in .env file    
    const wallet = new Wallet(PRIVATE_KEY, zkSyncProvider, ethProvider);  
  
    console.log("Wallet address:", await wallet.getAddress());  
      
    // Get token balance  
    const tokenContract = new ethers.Contract(  
      L1_TOKEN_ADDRESS,  
      ['function balanceOf(address) view returns (uint256)'],  
      ethProvider  
    );  
      
    const balance = await tokenContract.balanceOf(await wallet.getAddress());  
    console.log("Token balance:", ethers.formatEther(balance));   
  
    console.log("Initiating deposit...");  
      
    // Add more detailed deposit parameters  
    const depositTx = await wallet.deposit({  
      token: L1_TOKEN_ADDRESS,
      to: "0x229D54a85c23D81E852B8B03c5fc7E84B490eBe0", //change to your destination address 
      amount: AMOUNT_TO_DEPOSIT,  //adjust as needed
      approveERC20: true,    
      overrides: {
        bridgeAddress: CUSTOM_BRIDGE_ADDRESS,  
        gasLimit: 1000000n, // Add explicit gas limit for the deposit  
        maxFeePerGas: ethers.parseUnits("5", "gwei"), // Adjust as needed  
        maxPriorityFeePerGas: ethers.parseUnits("1.5", "gwei") // Adjust as needed  
      }  
    });  
  
    console.log("Deposit transaction sent:", depositTx.hash);  
  
    await depositTx.waitL1Commit();  
    console.log("Deposit transaction processed on L1!");  
  
    await depositTx.wait();  
    console.log("Deposit transaction processed on L2!");  
  
  } catch (error) {  
    console.error("Error during deposit:");  
    if (error.transaction) {  
      console.error("Transaction details:", {  
        to: error.transaction.to,  
        from: error.transaction.from,  
        data: error.transaction.data?.slice(0, 66) + "..." // Show truncated data  
      });  
    }  
    if (error.info) {  
      console.error("Error info:", error.info);  
    }  
    console.error("Error message:", error.message);  
    throw error;  
  }  
}  
  
// Execute the deposit  
depositTokenToL2()  
  .then(() => process.exit(0))  
  .catch((error) => {  
    process.exit(1);  
  });  

