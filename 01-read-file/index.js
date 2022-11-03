const fs = require('fs')
const path = require('path')
let name = __dirname + '/text.txt'
let resultName = path.join(name)
let newStream = fs.createReadStream(resultName, 'utf8');
newStream.on("data", function(chunk){ 
    console.log(chunk);
});
