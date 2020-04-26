module.exports = async () => {
    const res = await fetch(`${window.location.origin}/room/getPeers?roomId=${roomId}`, {
        method: 'GET'
    });

    return res.json();
}