const {
  CONTRACT_ADDR,
  CALLDATA,
  NODE_WS_URI,
  DATA_TYPE
} = require('./env.js')


const args = require('minimist')(process.argv.slice(2))
let contractAddr = args['contract'] || CONTRACT_ADDR
let calldata = args['calldata'] || CALLDATA
let dataType = args['type'] || DATA_TYPE
let delay = args['delay'] || 1000

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
  nodeUri,
  dataType,
  delay
}
