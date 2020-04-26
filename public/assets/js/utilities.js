function waitAMin(time = Number /** In milliseconds  */) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res();
        }, time);
    })
}

async function fetchPeersToSS() {
    const data = await require('./Room/Server/getPeers')();

    sessionStorage.setItem('current_peers', JSON.stringify(data.acknowledgement.peerObj));
}

function fetchPeersFromSS() {
    const jsonPeers = sessionStorage.getItem('current_peers');
    console.log(jsonPeers);
    const peerObj = JSON.parse(jsonPeers);
    return peerObj;
}

async function fetchCurrentUser() {
    const res = await fetch(`${window.location.origin}/room/fetch?details=curUser`, {
        method: 'GET'
    });

    return res.json();
}

module.exports = {
    waitAMin,
    fetchPeersToSS,
    fetchPeersFromSS,
    fetchCurrentUser
}