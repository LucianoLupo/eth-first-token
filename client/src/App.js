// import React, { Component, useEffect, useState } from "react";
// import MyToken from "./contracts/MyToken.json";
// import MyTokenSale from "./contracts/MyTokenSale.json";
// import KycContract from "./contracts/KycContract.json";
// import getWeb3 from "./getWeb3";

// import "./App.css";

// const App = (props) => {
//   const [state, setState] = useState({
//     storageValue: 0,
//     web3: null,
//     accounts: null,
//     contract: null,
//   });

//   const updateUserTokens = async () => {
//     let userTokens = await state.tokenInstance.methods
//       .balanceOf(state.accounts[0])
//       .call();
//     setState({ ...state, userTokens: userTokens });
//   };

//   const listenToTokenTransfer = () => {
//     state.tokenInstance.events
//       .Transfer({ to: state.accounts[0] })
//       .on("data", updateUserTokens);
//   };

//   const handleBuyTokens = async () => {
//     await state.tokenSaleInstance.methods.buyTokens(state.accounts[0]).send({
//       from: state.accounts[0],
//       value: state.web3.utils.toWei("1", "wei"),
//     });
//   };

//   const handleInputChange = (event) => {
//     const target = event.target;
//     const value = target.type === "checkbox" ? target.checked : target.value;
//     const name = target.name;
//     setState({ ...state, [name]: value });
//   };

//   const handleKycWhitelisting = async () => {
//     await state.kycInstance.methods
//       .setKycCompleted(state.kycAddress)
//       .send({ from: state.accounts[0] });
//     alert("KYC for " + state.kycAddress + " is completed");
//   };

//   useEffect(() => {
//     const asyncFun = async () => {
//       try {
//         // Get network provider and web3 instance.
//         const web3 = await getWeb3();

//         // Use web3 to get the user's accounts.
//         const accounts = await web3.eth.getAccounts();

//         // Get the contract instance.
//         const networkId = await web3.eth.net.getId();

//         const tokenInstance = new web3.eth.Contract(
//           MyToken.abi,
//           MyToken.networks[networkId] && MyToken.networks[networkId].address
//         );

//         const tokenSaleInstance = new web3.eth.Contract(
//           MyTokenSale.abi,
//           MyTokenSale.networks[networkId] &&
//             MyTokenSale.networks[networkId].address
//         );
//         const kycInstance = new web3.eth.Contract(
//           KycContract.abi,
//           KycContract.networks[networkId] &&
//             KycContract.networks[networkId].address
//         );

//         // Set web3, accounts, and contract to the state, and then proceed with an
//         // example of interacting with the contract's methods.

//         setState(
//           {
//             ...state,
//             loaded: true,
//             tokenSaleAddress: MyTokenSale.networks[networkId].address,
//             accounts,
//             tokenInstance,
//             tokenSaleInstance,
//             kycInstance,
//             web3,
//           },
//           updateUserTokens
//         );
//       } catch (error) {
//         // Catch any errors for any of the above operations.
//         alert(
//           `Failed to load web3, accounts, or contract. Check console for details.`
//         );
//         console.error(error);
//       }
//     };
//     asyncFun();
//   }, []);

//   useEffect(() => {
//     if (state.tokenInstance && state.tokenInstance.events)
//       listenToTokenTransfer();
//   }, [state]);

//   if (!state.web3) {
//     return <div>Loading Web3, accounts, and contract...</div>;
//   }
//   return (
//     <div className="App">
//       <h1>StarDucks Cappucino Token Sale</h1>
//       <p>Get your Tokens today!</p>
//       <h2>Kyc Whitelisting</h2>
//       Address to allow:{" "}
//       <input
//         type="text"
//         name="kycAddress"
//         value={state.kycAddress}
//         onChange={handleInputChange}
//       />
//       <button type="button" onClick={handleKycWhitelisting}>
//         Add to Whitelist
//       </button>
//       <h2>Buy Tokens</h2>
//       <p>
//         If you want to buy tokens, send Wei to this address:{" "}
//         {state.tokenSaleAddress}
//       </p>
//       <p>You currently have: {state.userTokens} CAPPU Tokens</p>
//       <button type="button" onClick={handleBuyTokens}>
//         Buy more tokens
//       </button>
//     </div>
//   );
// };

// export default App;

import React, { Component, useEffect, useState } from "react";
import MyToken from "./contracts/MyToken.json";
import MyTokenSale from "./contracts/MyTokenSale.json";
import KycContract from "./contracts/KycContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

const App = (props) => {
  const [state, setState] = useState({
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
  });

  const [tokenInstance, setTokenInstance] = useState();

  const [accounts, setAccounts] = useState();

  const handleBuyTokens = async () => {
    console.log("handleBuyTokens");
    await state.tokenSaleInstance.methods.buyTokens(state.accounts[0]).send({
      from: state.accounts[0],
      value: state.web3.utils.toWei("1", "wei"),
    });
  };

  const handleInputChange = (event) => {
    console.log("handleInputChange");
  };

  const handleKycWhitelisting = async () => {
    console.log("handleKycWhitelisting");
    await state.kycInstance.methods
      .setKycCompleted(state.kycAddress)
      .send({ from: state.accounts[0] });
    alert("KYC for " + state.kycAddress + " is completed");
  };

  const updateUserTokens = async () => {
    console.log(tokenInstance);
    let userTokens = await tokenInstance.methods.balanceOf(accounts[0]).call();
    setState((prevState) => ({ ...prevState, userTokens: userTokens }));
  };

  useEffect(() => {
    const asyncFun = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();

        console.log(networkId, MyToken);
        const theTokenInstance = new web3.eth.Contract(
          MyToken.abi,
          MyToken.networks[networkId] && MyToken.networks[networkId].address
        );

        const tokenSaleInstance = new web3.eth.Contract(
          MyTokenSale.abi,
          MyTokenSale.networks[networkId] &&
            MyTokenSale.networks[networkId].address
        );
        const kycInstance = new web3.eth.Contract(
          KycContract.abi,
          KycContract.networks[networkId] &&
            KycContract.networks[networkId].address
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        console.log("===>", MyTokenSale.networks[networkId].address);
        const tokenSaleAddress = MyTokenSale.networks[networkId].address;

        setAccounts(accounts);
        setTokenInstance(theTokenInstance);
        setState({
          ...state,
          loaded: true,
          accounts,
          tokenSaleInstance,
          kycInstance,
          tokenSaleAddress,
          web3,
        });
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    };
    asyncFun();
  }, []);

  useEffect(() => {
    if (tokenInstance && accounts) updateUserTokens();
  }, [tokenInstance, accounts]);

  return (
    <div className="App">
      <h1>RANDOMCOIN</h1>
      <p>Get your Tokens today!</p>
      <h2>Kyc Whitelisting</h2>
      Address to allow:
      <input
        type="text"
        name="kycAddress"
        value={state.kycAddress}
        onChange={handleInputChange}
      />
      <button type="button" onClick={handleKycWhitelisting}>
        Add to Whitelist
      </button>
      <h2>Buy Tokens</h2>
      <p>
        If you want to buy tokens, send Wei to this address:
        {state.tokenSaleAddress}
      </p>
      <p>You currently have: {state.userTokens} RND Tokens</p>
      <button type="button" onClick={handleBuyTokens}>
        Buy more tokens
      </button>
    </div>
  );
};

export default App;
