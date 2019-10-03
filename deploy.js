const Web3 = require("web3");
const web3 = new Web3();
web3.setProvider(new
web3.providers.HttpProvider('http://localhost:8545'));
const { interface, bytecode } = require('./compile');

const deploy = async () => {
    accounts = await web3.eth.getAccounts();
    console.log(accounts);
    greetings = await
    new web3.eth.Contract(JSON.parse(interface))
    .deploy({
        data: '0x'+bytecode,
        arguments: ['Hello World']
    }).send({
        from: accounts[0],
        gas:'1000000'
    });
    //console.log(interface);
    console.log('contract deployed to',greetings.options.address);
    const message = await
    greetings.methods.message().call();
    console.log(message);
};
deploy();