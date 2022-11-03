const fs = require('fs');
const path = require('path');

let name = __dirname + '/text.txt'
let resultName = path.join(name)
let newStream = fs.createWriteStream(resultName, 'utf8');

const process = require('process');
let readline = require('readline'); 
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Enter text\n'
});

rl.prompt();
rl.on('line', (input) => {
    if (input === 'exit') {
        rl.setPrompt('Bye!');
        rl.prompt();
        rl.close();
    } else {
        newStream.write(input)
        newStream.write('\n')
    }
});
rl.on('SIGINT', () =>{
    rl.setPrompt('Bye\n')
    rl.prompt();
    rl.close();
})