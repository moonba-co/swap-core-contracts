import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-web3";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-deploy";
import "hardhat-contract-sizer";

import { getNodeUrl, getAccounts } from "./network";

dotenv.config();

task("accounts", "Prints the list of accounts with balances").setAction(
  async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    const accounts = await hre.getNamedAccounts();

    console.log(`===== Available accounts for "${hre.network.name}" =====`);
    const balances = await Promise.all(
      Object.keys(accounts).map((accKey) =>
        hre.web3.eth.getBalance(accounts[accKey])
      )
    ).then((result) => result);

    Object.keys(accounts).forEach((accKey, i) => {
      const address = accounts[accKey];
      console.log(
        `Key: "${accKey}", address: "${address}", balance: "${hre.ethers.utils.formatEther(
          balances[i]
        )}"`
      );
    });
  }
);

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999,
          },
          evmVersion: "istanbul",
        },
      },
    ],
  },
  networks: {
    oneledger: {
      chainId: 311752642,
      url: getNodeUrl("oneledger"),
      accounts: getAccounts("oneledger"),
      loggingEnabled: true,
    },
    frankenstein: {
      chainId: 4216137055,
      url: getNodeUrl("frankenstein"),
      accounts: getAccounts("frankenstein"),
      loggingEnabled: true,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: 0,
    feeToSetter: 5,
    feeTo: 6,
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
};

export default config;
