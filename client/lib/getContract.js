
const getContractInstance = async (web3, contractDefinition) => {
  // get network ID and the deployed address
  const networkId = await web3.eth.net.getId()
 const deployedAddress = contractDefinition.networks[networkId].address

  console.log(deployedAddress);
//    const deployedAddress = '0x222bA0c2a491A55F5aAF5eAc58D1c98fb1236E21'

  // create the instance
  const instance = new web3.eth.Contract(
    contractDefinition.abi,
    deployedAddress
  )
  return instance
}

export default getContractInstance
