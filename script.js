const fs = require("fs");
const os = require("os");
const path = require("path")

const getAllFiles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  })

  return arrayOfFiles;
}

try {
  const allFileContent = getAllFiles("./cypress/e2e/")
                          .filter(f => f !== 'all.cy.js')
                          .map(f => f.replace('cypress/e2e/', ''))
                          .map(f => `import '${f}'`)
                          .join(os.EOL);

  console.log(allFileContent);
  fs.writeFileSync('./cypress/e2e/all.cy.js', allFileContent, "utf8");
} catch(e) {
  console.log(e);
}


