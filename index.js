global.ENVIRONMENT = (typeof process !== 'undefined') && (process.release.name === 'node') ? 'NODE' : 'BROWSER'

const { generate } = require('libp2p/src/pnet')
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

    return node;
}

module.exports = WorkhubIPFS