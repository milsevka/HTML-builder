const { readdir } = require("fs/promises");
const path = require("path");
const fs = require("fs");

let name = __dirname + "/files";
let resultName = path.join(name);
let nameCopy = __dirname + "/files-copy";
let resultNameCopy = path.join(nameCopy);

function makeDir() {
  fs.mkdir(resultNameCopy, { recursive: true }, (err) => {
    if (err) throw err;
  });
  readdir(resultNameCopy, { withFileTypes: true }).then((file) => file.forEach((files) => {
    if (files.isFile()) {
      fs.unlink(path.join(resultNameCopy, files.name), err => {
        if (err) {
          return console.log(err.message);
        } 
      })
    }}));
  readdir(resultName, { withFileTypes: true }).then((file) => file.forEach((files) => {
      if (files.isFile()) {
        let pathName = path.join(resultName, files.name);
        let pathCopy = path.join(resultNameCopy, files.name);
        fs.copyFile(pathName, pathCopy, function (err) {
          if (err) {
            return console.log(err.message);
          }
        });
      }}));
}
makeDir();
