module.exports = async (id = String, roomId = String) => {
    const res = await fetch(`${window.location.origin}/room/postNewPeer?peerId=${id}&roomId=${roomId}`, {
        method: 'POST'
    });

    return res.json();
}