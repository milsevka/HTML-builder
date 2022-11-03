const { readdir, mkdir, readFile, unlink} = require("fs/promises");
const path = require("path");
const fs = require("fs");

let newFile = path.join(__dirname);
let styleDirPath = path.join(__dirname + "/styles");
let mainDirPath = path.join(__dirname + "/project-dist");
let fileCssPath = path.join(mainDirPath + "/style.css");
let streamCss = fs.createWriteStream(fileCssPath, "utf8");
let fileHtml = mainDirPath + "/index.html";


// make project-dist folder //

fs.mkdir(mainDirPath, { recursive: true }, (err) => {
  if (err) throw err;
});

// make file with all styles //

readdir(styleDirPath, { withFileTypes: true }).then((file) =>
  file.forEach((files) => {
    if (files.isFile()) {
      let way = path.join(styleDirPath, files.name);
      if (path.extname(way) === ".css") {
        let wayPath = fs.createReadStream(way, "utf8");
        wayPath.on("data", function (chunk) {
          streamCss.write(chunk);
        });
      }
    }
  }));

// make html files with all components //

async function makeHTML(newFile, dir) {
  let template = await readFile(newFile + "/template.html", "utf8");
  for (let nameFile of await readdir(newFile + dir)) {
    let createFile = String(newFile + dir + nameFile);
    if (path.parse(createFile).ext === ".html") {
      let readfile = await readFile(createFile, "utf8");
      let components = new RegExp(`{{${path.parse(createFile).name}}}`);
      template = template.replace(components, readfile);
    }
  }
  stream(template);
  function stream(template) {
    fs.createWriteStream(fileHtml).write(template, "utf8");
    fs.createWriteStream(fileHtml).end();
  }
}
makeHTML(newFile, "/components/");

// make copy folder with assets //



function makeDir(newFile, mainDirPath, dir) {
  newFile = newFile + dir;
  mainDirPath = mainDirPath + dir;

  makeCopy(newFile, mainDirPath);
  function makeCopy(newFile, mainDirPath) {
    fs.mkdir(mainDirPath, { recursive: true }, function (err) {
      if (err) throw err;
    });

    readdir(newFile, { withFileTypes: true }).then((file) =>
      file.forEach((files) => {
        let pathName = path.join(newFile, files.name);
        let pathCopy = path.join(mainDirPath, files.name);
        if (files.isFile()) {
          fs.copyFile(pathName, pathCopy, function (err) {
            if (err) throw err;
          });
        } else {
          makeCopy(pathName, pathCopy, function (err) {
            if (err) throw err;
          });
        }
      })
    );
  }
 
}

makeDir(newFile, mainDirPath, "/assets/");
