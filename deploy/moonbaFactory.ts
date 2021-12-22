import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer: from, feeToSetter } = await getNamedAccounts();

  await deploy("MoonbaFactory", {
    from,
    skipIfAlreadyDeployed: true,
    args: [feeToSetter],
    log: true,
  });
};
func.tags = ["MoonbaFactory"];

export default func;
