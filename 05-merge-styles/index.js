const {readdir} = require('fs/promises');
const path = require('path');
const fs = require('fs');

let name = __dirname + '/styles'
let bundle = __dirname + '/project-dist' + '/bundle.css';
let namePath = path.join(name)
let bundlePath = path.join(bundle)

let newStream = fs.createWriteStream(bundlePath, 'utf8');

readdir(namePath, { withFileTypes: true }).then(file => file.forEach(files => {
    if(files.isFile()){ 
        let way = path.join(namePath, files.name);
        if (path.extname(way) === '.css') {
            let wayPath = fs.createReadStream(way, 'utf8');
            wayPath.on("data", function(chunk){ 
                 newStream.write(chunk)
                 })
        }  
    }}))