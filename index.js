global.ENVIRONMENT = (typeof process !== 'undefined') && (process.release.name === 'node') ? 'NODE' : 'BROWSER'

const fs = require('fs')
const { generate } = require('libp2p/src/pnet')
const { v4 } = require('uuid')
const IPFS = require('ipfs')
const P2PStack = require('./lib/p2p-stack')

const  WorkhubIPFS = async (config = {}, swarmKey) => {
    if(ENVIRONMENT == "NODE" && !swarmKey) {
        swarmKey = new Uint8Array(95);
        generate(swarmKey)
    }

    let node = await IPFS.create({
        repo: config.repo || 'workhub',
        libp2p: P2PStack(swarmKey),
        config: {
            Addresses: {
                Swarm: config.Swarm || [],
                Bootstrap: config.Bootstrap || []
            }
        },
        relay: {enabled: true, hop: {enabled: true}}
    })

    const getFile = async (cid, tmpPath) => {
        let content = Buffer.from('')
        for await (const chunk of node.cat(cid)){
          content = Buffer.concat([content, chunk])
        }
    
      fs.writeFileSync(tmpPath, content)
      console.log("Gotten file", cid)
    }
    
    const addFile = async (file) => {
      console.log("Adding file")
      const id = v4()
      const result = await node.add(file)
      return result.cid;
    }

    return {
        ipfs: node,
        getFile,
        addFile
    }
}

module.exports = WorkhubIPFS