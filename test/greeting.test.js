const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');
var accounts;
var greetings;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts()
    console.log(accounts);
    greetings = await
    //deploy contract ขึ้นไปบน ganache
    new web3.eth.Contract(JSON.parse(interface))
    .deploy({
        data: bytecode,
        arguments: ['Hello World'] //consturctor ต้องการ argument ตัวนึง
    }).send({
        from: accounts[0],
        gas:'1000000'
    });
});

describe('Greetings',() => {
    it('deploys a greetings contract', () => {
        //console.log(greetings);
        //console.log(greetings.options.address);
        assert.ok(greetings.options.address);//check มีค่า address
    });
    it('message is set by constructor',async ()=> {
        const message = await
        greetings.methods.message().call();//เรียกค่าใน sol code ดึงตัวแปร message
        assert.equal(message, 'Hello World');//test ว่าตรงกับค่า helloworld ไหม
    });
    it('message is set bysetMeesage() ',async () => {
        await greetings.methods.setMessage('Hello Mars')
        .send({ from: accounts[0] } );//กำหนดคนส่งด้วย  

        const message = await greetings.methods.message().call();
        assert.equal(message,'Hello Mars');
    });
});