module.exports = async (peerId, roomId) => {
    const res = await fetch(`${window.location.origin}/room/closePeer?peerId=${peerId}&roomId=${roomId}`, {
        method: 'POST'
    });

    return res.json();
}