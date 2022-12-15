import { expect } from 'chai';
import { Wallet, Contract, utils } from 'zksync-web3';
import * as hre from 'hardhat';
import { ethers } from 'ethers';
import { Deployer } from '@matterlabs/hardhat-zksync-deploy';

const RICH_WALLET_PK =
  '0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110';

let greeter: Contract;

async function deployGreeter(deployer: Deployer) {
  try {
    console.log('Deploying contract');
    const artifact = await deployer.loadArtifact('Greeter');

    greeter = await deployer.deploy(artifact, ['Hi']);
  } catch (error) {
    console.error('Error deploying contract');
    console.error(error);
    throw new Error('Error deploying contract');
  }
}

describe('Greeter', function () {
  let deployer: Deployer;

  before('Fund the wallet', async () => {
    deployer = new Deployer(hre, new Wallet(RICH_WALLET_PK));

    const depositHandle = await deployer.zkWallet.deposit({
      to: deployer.zkWallet.address,
      token: utils.ETH_ADDRESS,
      amount: ethers.utils.parseEther('0.001'),
    });

    await depositHandle.wait();
    await deployGreeter(deployer);
  });

  it('Deployer should be valid address', async () => {
    expect(deployer.zkWallet.address).to.be.properAddress;
  });

  it("Should return the new greeting once it's changed", async () => {
    expect(await greeter.greet()).to.eq('Hi');

    const setGreetingTx = await greeter.setGreeting('Hola, mundo!');
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal('Hola, mundo!');
  });
  it('Should emit event when greet changes', async () => {
    await expect(greeter.setGreeting('new message')).to.emit(
      greeter,
      'GreetUpdated'
    );
  });
  it('Should revert with message', async () => {
    await expect(greeter.revertMethod()).to.be.revertedWithCustomError(
      greeter,
      'RevertError'
    );
  });
  it('Should revert if message is empty', async () => {
    await expect(greeter.setGreeting('')).to.be.revertedWith(
      'Message can not be empty'
    );
  });
});
