function loadRoom(id) {
    window.location.replace(`${window.location.origin}/room/load?id=${id}`);
}


module.exports = {
    loadRoom
}