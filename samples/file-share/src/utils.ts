import * as os from 'os'

export const getNetworkAddresses = () => {
  const interfaces = require('os').networkInterfaces()
  const addresses = Object
    .keys(interfaces)
    .reduce((acc, key) => [...acc, ...interfaces[key]], [])
    .filter(p => p.family === 'IPv4')
    .map(p => p.address)
  return addresses;
}