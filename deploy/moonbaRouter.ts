import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const wrappedAddressMap: { [network: string]: string } = {
  // mainnet
  oneledger: "0x01586239B56ca158f1e31e4c6A07B3Ae59D623B5",
  // testnet
  frankenstein: "0x48e821241B953F110e295fD660Bd9bF988212B4e",
};

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  if (!wrappedAddressMap[hre.network.name]) {
    console.log(`\x1b[31m Unsupported network "${hre.network.name}" \x1b[0m`);
    return;
  }

  const factory = await hre.ethers.getContractOrNull("MoonbaFactory");
  if (!factory) {
    console.log(`\x1b[31m Factory not deployed \x1b[0m`);
    return;
  }

  const wethAddress = wrappedAddressMap[hre.network.name];
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer: from } = await getNamedAccounts();

  await deploy("MoonbaRouter", {
    from,
    skipIfAlreadyDeployed: true,
    args: [factory.address, wethAddress],
    log: true,
  });
};
func.tags = ["MoonbaRouter"];
func.dependencies = ["MoonbaFactory"];

export default func;
