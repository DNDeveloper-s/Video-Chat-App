/**
 * 
 * Expecting Details Object
 * 
 * details = {
 *      actionType: String,
 *      ... Some Form Details
 * }
 * 
 */

module.exports = async (details) => {
    const res = await fetch(`${window.location.origin}/auth/${details.actionType}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(details)
    })

    return res.json();
}