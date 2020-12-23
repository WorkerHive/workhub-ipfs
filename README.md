# Workhub IPFS

IPFS/LibP2P bundle for setting up a node on a private IPFS network 


## Install

```
yarn add @workerhive/ipfs

```

## Usage

```
import IPFS from '@workerhive/ipfs';

let {ipfs, getFile, addFile} = await IPFS({
    Repo: [],
    Swarm: [],
    Bootstrap: []
}, swarmKey)

```