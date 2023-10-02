// blocking import fs from "fs"
// use promises to make calls async for any computation intensive operations
const fs = require('fs/promises')
const path = require('path')
const read = async () => {
    const result = fs.readFile(path.join(__dirname, "package.json"), "utf-8")
    return result
}
read()
console.log('log meee')
read().then(f => console.log(f))
