import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-foundry";
import "hardhat-deploy";
import "hardhat-contract-sizer";

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
      mining: {
        auto: !(process.env.HARDHAT_DISABLE_AUTO_MINING === "true"),
        interval: [100, 3000],
      },
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
      },
      chainId: 1337
    },
    gnosis: {
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      url: "https://rpc.gnosischain.com",
    },
  },
  etherscan: {
    apiKey: {
      gnosis: process.env.GNOSIS_API_KEY ?? "",
    }
  },
};

export default config;
