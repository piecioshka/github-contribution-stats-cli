const util = require('util');
const fs = require('fs');
const path = require('path');

const readFile = util.promisify(fs.readFile);

const PACKAGE_JSON_FILE_PATH = path.join(
    __dirname, '..', 'package.json'
);

module.exports = async () => {
    const pkg = await readFile(PACKAGE_JSON_FILE_PATH);
    return JSON.parse(pkg);
};
