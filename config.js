const {
  CONTRACT_ADDR,
  CALLDATA,
  NODE_WS_URI
} = require('./env.js')


const args = require('minimist')(process.argv.slice(2))
let contractAddr = args['contract'] || CONTRACT_ADDR
let calldata = args['calldata'] || CALLDATA

calldata = addZeroX(calldata)
contractAddr = addZeroX(contractAddr)

const nodeUri = NODE_WS_URI

function addZeroX(str) {
  if (str.startsWith("0x")) {
    return str
  }
  return `0x${str}`
}

module.exports = {
  contractAddr,
  calldata,
  nodeUri
}
