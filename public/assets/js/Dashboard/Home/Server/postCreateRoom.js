/**
 * 
 * Nothing Need 
 * All will be created on server
 * 
 */

module.exports = async () => {
    const res = await fetch(`${window.location.origin}/room/create`, {
        method: 'POST'
    })

    return res.json();
}