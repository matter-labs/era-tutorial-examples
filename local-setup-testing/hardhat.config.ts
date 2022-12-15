import { HardhatUserConfig } from 'hardhat/config';

import '@matterlabs/hardhat-zksync-deploy';
import '@matterlabs/hardhat-zksync-solc';
import '@matterlabs/hardhat-zksync-chai-matchers';

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
    settings: {},
  },
  defaultNetwork: 'zkSyncTestnet',
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
