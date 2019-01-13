var os = require("os");
const fs = require('fs');
const fsPromises = fs.promises;
const readline = require('readline');

(async () => {
  const fileStream = fs.createReadStream('README.md');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  outfile = await fsPromises.open("OUTPUT.md", "w");

  for await (const line of rl) {
    let m = line.match(/https:\/\/github.com\/(\S+?)\/(\S+?)(\/|\)|\.git)/);
    let bage;

    if (m && m[1] && m[2]) {
      bage = ` ![](https://img.shields.io/github/stars/${m[1]}/${m[2]}.svg?label=Stars&style=social?style=popout)`  
    } else {
      bage = ''
    }

    await fsPromises.writeFile(outfile, line + bage + os.EOL);
  }
})()
