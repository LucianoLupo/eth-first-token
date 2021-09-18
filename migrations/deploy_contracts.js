var MyToken = artifacts.require("MyToken.sol");

require("dotenv").config({ path: "../.env" });

module.exports = async function (deployer) {
  await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
};
