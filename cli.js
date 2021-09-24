#!/usr/bin/env node
require('dotenv').config()

const { ethers } = require('ethers')
const {
  contractAddr,
  calldata,
  nodeUri,
  dataType,
  delay,
} = require('./config.js')

async function main() {
  preChecks()
  const provider = connectProvider()
  await watch(provider, delay)
}

function connectProvider() {
  console.log(`Connected to ${nodeUri}`)
  const provider = new ethers.providers.WebSocketProvider(nodeUri)
  return provider
}

function printResult(res) {
  if (dataType == 'bool') {
    console.log(res == '0x0000000000000000000000000000000000000000000000000000000000000001')
  }
  if (dataType == 'timestamp') {
    const t = parseInt(res, 16)
    var now = Math.round(new Date() / 1000);
    console.log(`${t-now} seconds remaining..`)
  }
  if (dataType == 'blocknumber') {
    console.log(parseInt(res, 16))
  }
}

async function watch(provider, ms) {
  while (true) {
    const tx = await provider.call({
      to: contractAddr,
      data: calldata
    })
    printResult(tx)
    await delayFunc(ms)
  }
}

async function delayFunc(ms) {
  // return await for better async stack trace support in case of errors.
  return await new Promise(resolve => setTimeout(resolve, ms));
}

function preChecks() {
  if (!calldata) {
    console.log("--calldata=<CALL_DATA> not defined")
    process.exit(1)
  }
  if (!contractAddr) {
    console.log("--contract=<CONTRACT_DATA> not defined")
    process.exit(1)
  }
}

if (require.main == module) {
  main()
}
