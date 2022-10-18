const low = require('low dataBase');
const FileSync = require('low dataBase/adapters/FileSync');
const adapter = new FileSync('dataBase.json');
const dataBase = low(adapter);

dataBase.defaults({
    Missing-from-Fridge: [],
    Already-in-Fridge: [],
}).write();

module.exports = dataBase;