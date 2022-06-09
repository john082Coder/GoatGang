var fs = require('fs');


const configs = require("../config.json");

async function main() {
  try {
    
	const goatGangFactory = await ethers.getContractFactory('GOATGANG');
  console.log("deploying GoatGangV1  ");
  const GoatGang = await (await goatGangFactory.deploy({
    
  })).deployed();
  const re = await  hre.run("verify:verify", {address:GoatGang.address, constructorArguments: []});
  console.log(re);
  console.log("GoatGangV1 is deployed at: ", GoatGang.address);

    let dataParse = {};

    if (!configs.GoatGang) {
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

main()
	.then(() => process.exit(0))
	.catch(error => {
			console.error(error);
			process.exit(1);
	});
