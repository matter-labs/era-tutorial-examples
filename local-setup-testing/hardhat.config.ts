import { HardhatUserConfig } from 'hardhat/config';

require('@matterlabs/hardhat-zksync-deploy');
require('@matterlabs/hardhat-zksync-solc');

// dynamically changes endpoints for local tests
const zkSyncTestnet =
  process.env.NODE_ENV == 'test'
    ? {
        url: 'http://localhost:3050',
        ethNetwork: 'http://localhost:8545',
        zksync: true,
      }
    : {
        url: 'https://zksync2-testnet.zksync.dev',
        ethNetwork: 'goerli',
        zksync: true,
      };

const config: HardhatUserConfig = {
  zksolc: {
    version: '1.2.1',
    compilerSource: 'binary',
    settings: {
      experimental: {
        dockerImage: 'matterlabs/zksolc',
        tag: 'v1.2.0',
      },
    },
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      // @ts-ignore
      zksync: true,
    },
    zkSyncTestnet,
  },
  solidity: {
    version: '0.8.16',
  },
};

export default config;
