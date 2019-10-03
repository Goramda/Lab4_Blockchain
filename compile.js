const path = require('path');
const fs = require('fs');
const solc = require('solc');
const greetingPath = path.resolve(__dirname, 'contracts', 'greeting.sol');
const source = fs.readFileSync(greetingPath, 'utf8');
//console.log(solc.compile(source,1));
/* 
    ได้ json ที่ข้อมูลเป็น 
    Contract : {
        :(ชือ Contract) : {
            bytecode : ... ,
            ...
            interface : ... (ABI)
        }
    }
*/
module.exports = solc.compile(source,1).contracts[':Greetings'];