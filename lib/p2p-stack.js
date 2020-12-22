const MDNS = require('libp2p-mdns')
if(ENVIRONMENT == "NODE") var TCP = require('libp2p-tcp')
const MPLEX = require('libp2p-mplex');
const NOISE = require('libp2p-noise').NOISE;
const Protector = require('libp2p/src/pnet');
const WebRTCStar = require('libp2p-webrtc-star')
if(ENVIRONMENT == "NODE") var wrtc = require('wrtc')

const transportKey = WebRTCStar.prototype[Symbol.toStringTag]

const wrtcTransport = {
    enabled: true,
}

const peerDiscovery = {
    autoDial: true,
    [WebRTCStar.tag]:{
        enabled: true
    }
}
if(ENVIRONMENT == "NODE") peerDiscovery[MDNS.tag] = {
    enabled: true
}

if(ENVIRONMENT == "NODE") wrtcTransport.wrtc = wrtc

module.exports = (swarmKey) => ({
    modules: {
        transport: ENVIRONMENT == "NODE " ? [TCP, WebRTCStar] : [WebRTCStar],
        streamMuxer: [MPLEX],
        connEncryption: [NOISE],
        connProtector: new Protector(swarmKey)
    },
    config: {
        transport: {
            [transportKey]: wrtcTransport
        },
        peerDiscovery: peerDiscovery
    }
})
