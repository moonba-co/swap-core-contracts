import hre from "hardhat";
import { keccak256 } from "@ethersproject/solidity";

// https://github.com/Uniswap/sdk-core/blob/5826a6d7081ecf4fd1af0d63d3f446500c1a1014/test/constants.test.ts
(async () => {
  const result = await hre.artifacts.readArtifact("MoonbaPair");
  const COMPUTED_INIT_CODE_HASH = keccak256(["bytes"], [result.bytecode]);
  console.log("Computed init code:", COMPUTED_INIT_CODE_HASH);
})();
