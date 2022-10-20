require("@matterlabs/hardhat-zksync-deploy");
require("@matterlabs/hardhat-zksync-solc");

const zkSyncDeploy = process.env.NODE_ENV == 'test' ? {
  zkSyncNetwork: "http://localhost:3050",
  ethNetwork: "http://localhost:8545",
} : {
  zkSyncNetwork: "https://zksync2-testnet.zksync.dev",
  ethNetwork: "goerli",
};

module.exports = {
  zksolc: {
    version: "1.2.0",
    compilerSource: "docker",
    settings: {
      experimental: {
        dockerImage: "matterlabs/zksolc",
        tag: 'v1.2.0'
      },
    },
  },
  zkSyncDeploy,
  solidity: {
    version: "0.8.11",
  },
  networks: {
    hardhat: {
      zksync: true
    },
  },
};
