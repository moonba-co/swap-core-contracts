import hre from "hardhat";
import { MoonbaFactory } from "../typechain";

(async () => {
  const { feeToSetter, feeTo } = await hre.getNamedAccounts();
  const signer = await hre.ethers.getSigner(feeToSetter);

  const moonbaFactory: MoonbaFactory | null =
    await hre.ethers.getContractOrNull("MoonbaFactory", signer);
  if (!moonbaFactory) {
    console.log("\x1b[31m MoonbaFactory not deployed, skipping.\x1b[0m");
    return;
  }

  const addr = await moonbaFactory.callStatic.feeTo();
  if (addr === feeTo) {
    console.log(`\x1b[31m feeTo address set (as "${addr}"), skipping.\x1b[0m`);
    return;
  }

  console.log(`\x1b[33m Starting to add feeTo address "${feeTo}"...\x1b[0m`);
  const receipt = await moonbaFactory.setFeeTo(feeTo).then((tx) => tx.wait());
  console.log(
    `\x1b[32m feeTo address "${feeTo}" added, using ${receipt.gasUsed} gas\x1b[0m`
  );
})();
