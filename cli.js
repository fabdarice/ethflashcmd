#!/usr/bin/env node
require('dotenv').config()

const { ethers } = require('ethers')
const {
  contractAddr,
  calldata,
  nodeUri
} = require('./config.js')

async function main() {
  preChecks()
  const provider = connectProvider()
  await call(provider)
}

function connectProvider() {
  console.log(`Connected to ${nodeUri}`)
  const provider = new ethers.providers.WebSocketProvider(nodeUri)
  return provider
}

async function call(provider) {
  const tx = await provider.call({
    to: contractAddr,
    data: calldata
  })
  console.log('tx', tx)
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
