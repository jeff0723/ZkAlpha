export const DEPLOY_CONFIG = {
    mainnet: {
        rpcURL: "https://rpc.ankr.com/eth", 
        usdcContractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        wethContractAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    }, 
    goerli: {
        rpcURL:"https://rpc.ankr.com/eth_goerli",
        usdcContractAddress: "0xd35CCeEAD182dcee0F148EbaC9447DA2c4D449c4",
        wethContractAddress: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    },
    // does not have WETH
    mantletestnet: {
        rpcURL: "https://rpc.testnet.mantle.xyz",
        usdcContractAddress: "0xA20aa0968C555cf984B52D530586108856a0A134",
    },
    // does not have WETH
    celotestnet: {
        rpcURL: "https://alfajores-forno.celo-testnet.org",
        usdcContractAddress: "0x922f76238FbeaE0a47aa8935532725bA588C8a16"
    },
    gnosis: {
        rpcURL: "https://rpc.ankr.com/gnosis",
        usdcContractAddress: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
        wethContractAddress: "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1",
    },
    auroratestnet: {
        rpcURL: "https://testnet.aurora.dev",
        usdcContractAddress: "0xb12bfca5a55806aaf64e99521918a4bf0fc40802"
    },
    polygonzkevm: {
        rpcURL: "https://zkevm-rpc.com",
        usdcContractAddress: "0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035",
        wethContractAddress: "0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9"
    },
    polygonzkevmtestnet: {
        rpcURL: "https://rpc.public.zkevm-test.net/",
        usdcContractAddress: "0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035",
        wethContractAddress: "0xb008B98C2a3EB376c9B0Dcf4e626fFd7DE1c5D67"
    },
    linea: {
        rpcURL: "https://rpc.goerli.linea.build/",
        usdcContractAddress: "0x6d8727B664D3f877de683F836E75EB2de47FD197",
        wethContractAddress: "0x2C1b868d6596a18e32E61B901E4060C872647b6C"
    },
    hardhat: {
        rpcURL: "",
        usdcContractAddress: "",
        wethContractAddress: ""
    }
}

