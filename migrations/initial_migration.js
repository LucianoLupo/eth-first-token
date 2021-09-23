const Migrations = resolver.require("Migrations");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
