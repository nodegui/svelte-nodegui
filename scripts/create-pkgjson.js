const fs = require('fs')
const path = require('path')
const packageFileContent = fs.readFileSync(path.resolve(__dirname, '../package.json'), { encoding: "utf8" });
const rootPackageContent = JSON.parse(packageFileContent);

let desiredKeys = [
    "name",
    "version",
    "description",
    "author",
    "license",
    "peerDependencies"
]

let destinationPackageContent = {}

for (let key of desiredKeys) {
    destinationPackageContent[key] = rootPackageContent[key]
}

Object.assign(destinationPackageContent, {
    ...destinationPackageContent,
    "main": "index.js",
    "types": "index.d.ts"
})

const finalFileContent = JSON.stringify(destinationPackageContent, null, 4)
fs.writeFileSync(path.resolve(__dirname, "../dist/package.json"), JSON.stringify(destinationPackageContent, null, 4))

