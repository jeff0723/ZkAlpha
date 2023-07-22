import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-foundry";
import "hardhat-deploy";
import "hardhat-contract-sizer";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: false,
    strict: true,
    only: [],
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
      },
      chainId: 1337,
    },
  neontestnet: {
    url: process.env.NEONTESTNETRPCURL || "",
    accounts: [process.env.GNOSISPK || ""],
    chainId: 245022926
  },
  mantletestnet: {
    url: process.env.MANTLETESTNETRPCURL || "",
    accounts: [process.env.GNOSISPK || ""],
    chainId: 5001
  },
  celotestnet: {
    url: process.env.CELOTESNETRPCURL || "",
    accounts: [process.env.GNOSISPK || ""],
    chainId: 44787,
  },
  gnosis: {
    url: process.env.GNOSISRPCURL || "",
    accounts: [process.env.GNOSISPK || ""],
    chainId: 100,
  },
  aurora: {
    url: process.env.AURORARPCURL || "",
    accounts: [process.env.GNOSISPK || ""],
    chainId: 1313161554,
  },
  auroratestnet: {
    url: process.env.AURORATESTRPCURL || "",
    accounts: [process.env.GNOSISPK || ""],
    chainId: 1313161555,
  },
  polygonzkevm: {
    url: process.env.POLYGONZKEVMRPCURL || "",
    accounts: [process.env.GNOSISPK || ""],
    chainId: 1101,
  },
  polygonzkevmtestnet: {
    url: process.env.POLYGONZKEVMTESTNETRPCURL || "",
    accounts: [process.env.GNOSISPK || ""],
    chainId: 1442,
  },
  mainnet: {
    url: process.env.MAINNETRPCURL || "",
    accounts:
      process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    chainId: 1,
  },
  linea: {
    url: process.env.LINEARPCURL || "",
    accounts: [process.env.GNOSISPK || ""],
    chainId: 59140, 
  }, 
  filecoinCalibration: {
    url: process.env.FILECOINTESTNETRPCURL || "",
    accounts: [process.env.GNOSISPK || ""],
    chainId: 314159, 
  }
},
etherscan: {
  apiKey: {
    arbitrumOne: process.env.ARBISCAN_API_KEY || "",
    avalanche: process.env.SNOWTRACE_API_KEY || "",
    bsc: process.env.BSCSCAN_API_KEY || "",
    gnosis: process.env.GNOSISSCAN_API_KEY || "",
    goerli: process.env.ETHERSCAN_API_KEY || "",
    mainnet: process.env.ETHERSCAN_API_KEY || "",
    optimisticEthereum: process.env.OPTIMISM_API_KEY || "",
    polygon: process.env.POLYGONSCAN_API_KEY || "",
    polygonMumbai: process.env.POLYGONSCAN_API_KEY || "",
    sepolia: process.env.ETHERSCAN_API_KEY || "",
    aurora: process.env.AURORA_MAINNET_RPC || "",
    auroratestnet: process.env.AURORA_TESTNET_RPC || "",
  },  
}
}

export default config;
