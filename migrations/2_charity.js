const Charity = artifacts.require("SupplyChain");
const ERC = artifacts.require("SimpleERC20Token");
module.exports = function(deployer) {
    deployer.deploy(Charity);
    deployer.deploy(ERC);
};