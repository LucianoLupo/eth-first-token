var MyToken = artifacts.require("MyToken");
var MyTokenSale = artifacts.require("MyTokenSale");
var MyKycContract = artifacts.require("KycContract");
require("dotenv").config({ path: "../.env" });

module.exports = async function (deployer) {
  let addr = await web3.eth.getAccounts();
  console.log("addr: " + addr);
  await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
  const myToken = await MyToken.deployed();

  await deployer.deploy(MyKycContract);
  const myKycContract = await MyKycContract.deployed();

  await deployer.deploy(
    MyTokenSale,
    1,
    addr[0],
    myToken.address,
    myKycContract.address
  );
  const myTokenSale = await MyTokenSale.deployed();

  await myToken.transfer(myTokenSale.address, process.env.INITIAL_TOKENS);
};

// export default function (deployer) {
//   web3.eth.getAccounts().then((addr) => {
//     return deployer.deploy(MyToken, process.env.INITIAL_TOKENS).then(() => {
//       return deployer.deploy(MyKycContract).then(() => {
//         return deployer
//           .deploy(
//             MyTokenSale,
//             1,
//             addr[0],
//             MyToken.address,
//             MyKycContract.address
//           )
//           .then(() => {
//             MyToken.deployed().then((instance) => {
//               return instance
//                 .transfer(MyTokenSale.address, process.env.INITIAL_TOKENS)
//                 .then(() => {
//                   console.log(success);
//                 });
//             });
//           });
//       });
//     });
//   });
// }
