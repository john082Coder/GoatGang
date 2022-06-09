var fs = require('fs');

var GoatGang = artifacts.require("../contracts/GOATGANG.sol");


const configs = require("../config.json");

module.exports = async function(deployer) {
  try {
    let dataParse = {};

    if (!configs.GoatGang) {
      await deployer.deploy(GoatGang, {
        gas: 30000000
      });
    
      dataParse['GoatGang'] = GoatGang.address;
      
    }
    else {
      dataParse['GoatGang'] = configs.GoatGang;
    }
  

    const updatedData = JSON.stringify(dataParse);
		await fs.promises.writeFile('contracts.json', updatedData);

  } catch (error) {
    console.log(error);
  }

};
