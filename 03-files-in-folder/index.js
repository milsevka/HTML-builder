const {readdir} = require('fs/promises');
const path = require('path');
const fs = require('fs');

let name = __dirname + '/secret-folder'
let resultName = path.join(name)

readdir(resultName, { withFileTypes: true }).then(file => file.forEach(files => {
    if(files.isFile()){
        let way = path.join(resultName, files.name);
        let stringName = String(files.name)
        let extension = path.extname(stringName).slice(1)
        let shortName = stringName.split('.')[0]
        fs.stat(way, function(err, stats) {
            let weight = stats.size;
            return console.log(`${shortName} - ${extension} - ${weight}kb`)
        })
    }
}))